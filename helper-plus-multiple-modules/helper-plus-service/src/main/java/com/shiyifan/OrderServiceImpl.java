package com.shiyifan;

import com.shiyifan.mapper.OrderMapper;
import com.shiyifan.pojo.Constant;
import com.shiyifan.pojo.Order;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * @author zou_cha
 * @name OrderServiceImpl
 * @date 2021-01-18 13:01:37
 **/
@Service
@Log4j2
@Validated
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private UserService userService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean createOrder(Order order) throws Exception {
        try {
            //设置任务信息唯一id
            order.setOrderId(UUID.randomUUID().toString().replaceAll("-", ""));
            //设置任务位置信息唯一id
            order.setLocationId(UUID.randomUUID().toString().replaceAll("-", ""));
            //对于任务信息和任务位置信息表进行插入
            if (orderMapper.createOrder(order) == 1 && orderMapper.createOrderLocation(order) == 1) {
                return true;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.createOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.createOrder失败，" + e);
        }
        return false;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean deleteOrder(String orderId, String orderInitiatorId) throws Exception {
        try {
            Order orderInfo = this.selectOrderInfo(orderId, orderInitiatorId, null);
            Integer orderStatus = orderInfo.getOrderStatus();
            if (orderStatus != Constant.FINISHED) {
                return false;
            }
            if (orderMapper.deleteOrder(orderId, orderInitiatorId) == 1) {
                return true;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.deleteOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.deleteOrder失败，" + e);
        }
        return false;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean cancelOrder(String orderId, String orderInitiatorId) throws Exception {
        try {
            //从数据库中获取由任务发布者发布的任务信息
            Order orderInfo = this.selectOrderInfo(orderId, orderInitiatorId, null);
            //获取当前任务的状态
            Integer orderStatus = orderInfo.getOrderStatus();
            //判断任务状态是否为等待完成，已完成和完成超时
            if (orderStatus == Constant.WAIT_FINISHING || orderStatus == Constant.FINISHED || orderStatus == Constant.FINISHING_TIMEOUT) {
                return false;
            }
            //对于任务信息表进行取消
            if (orderMapper.cancelOrder(orderId, orderInitiatorId) == 1) {
                return true;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.cancelOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.cancelOrder失败，" + e);
        }
        return false;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean checkOrder(String orderId) throws Exception {
        try {
            if (orderMapper.checkOrder(orderId) == 1) {
                return true;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.checkOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.checkOrder失败，" + e);
        }
        return false;
    }

    /**
     * 0:未实名认证
     * 1：保证金不够
     * 2: 成功
     * 3: 订单不是等待接取中
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int receiveOrder(String orderId, String orderReceiverId) throws Exception {
        try {
            //获取任务接取者的信息
            Map<String, Object> statusAndUserMargin = userService.selectUserAuthenticationInfo(orderReceiverId);
            //判断任务接取者实名认证状态
            if (!((Boolean) statusAndUserMargin.get("userAuthenticationStatus"))) {
                return 0;
            }
            //获取当前任务信息
            Order orderInfo = this.selectOrderInfo(orderId, null, null);
            //判断任务状态是否为待接取，
            if (orderInfo.getOrderStatus() == Constant.WAIT_RECEIVING) {
                //判断任务接取者的保证金金额是否大于任务预估金额
                if (Optional.ofNullable((BigDecimal) statusAndUserMargin.get("userMargin")).orElse(new BigDecimal(0)).compareTo(orderInfo.getOrderValue()) < 0) {
                    return 1;
                }
                //对于任务信息表进行接取
                if (orderMapper.receiveOrder(orderId, orderReceiverId, statusAndUserMargin.get("userRealName").toString(), statusAndUserMargin.get("userPhone").toString()) == 1) {
                    return 2;
                }
            } else {
                //其他情况
                return 3;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.receiveOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.receiveOrder失败，" + e);
        }
        return 3;
    }

    @Override
    public Order selectOrderInfo(String orderId, String orderInitiatorId, String orderReceiverId) throws Exception {
        try {
            //获取任务的信息
            return orderMapper.selectOrderInfo(orderId, orderInitiatorId, orderReceiverId);
        } catch (Exception e) {
            log.error("OrderServiceImpl.selectOrderInfo失败，" + e);
            throw new Exception("OrderServiceImpl.selectOrderInfo失败，" + e);
        }
    }

    /**
     * 0:完成任务未超时
     * 1:完成任务超时
     * -1:其他情况
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Integer finishOrder(String orderId, String orderReceiverId) throws Exception {
        try {
            //获取当前任务信息
            Order orderInfo = this.selectOrderInfo(orderId, null, orderReceiverId);
            Integer overTime = null;
            BigDecimal changeMargin = null;
            //判断任务有没有超时
            if (LocalDateTime.now().isBefore(orderInfo.getOrderUntilFinishTime())) {
                //未超时
                overTime = 0;
                changeMargin = orderInfo.getOrderPay();
            } else {
                //超时
                overTime = 1;
                changeMargin = orderInfo.getOrderPay().subtract(new BigDecimal(10));
            }
            //对于任务信息表进行完成
            if (orderMapper.finishOrder(orderId, orderReceiverId, overTime) == 1 && userService.changeMargin(orderReceiverId,changeMargin )) {
                return overTime;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.finishOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.finishOrder失败，" + e);
        }
        return -1;
    }

    @Override
    public ArrayList<Order> selectOrders(Map<String, Object> param) throws Exception {
        try {
            //判断是否有传入的分页参数，对分页参数进行处理
            if(param.get("pageNow") == null || param.get("pageSize") == null){
                param.put("pageNow",0);
                param.put("pageSize",1);
            }
            else {
                int i = (Integer.parseInt(param.get("pageNow").toString()) - 1) * Integer.parseInt(param.get("pageSize").toString());
                param.put("pageNow",i);
            }
            return orderMapper.selectOrders(param);
        } catch (Exception e) {
            log.error("OrderServiceImpl.selectOrders失败，" + e);
            throw new Exception("OrderServiceImpl.selectOrders失败，" + e);
        }
    }

    @Override
    public Integer getTotalOrders(Map<String, Object> param) throws Exception {
        try {
            return orderMapper.getTotalOrders(param);
        } catch (Exception e) {
            log.error("OrderServiceImpl.getTotalOrders失败，" + e);
            throw new Exception("OrderServiceImpl.getTotalOrders失败，" + e);
        }
    }
}
