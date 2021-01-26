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
            order.setOrderId(UUID.randomUUID().toString().replaceAll("-", ""));
            order.setLocationId(UUID.randomUUID().toString().replaceAll("-", ""));
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
            Map<String, Object> orderInfo = this.selectOrderInfo(orderId, orderInitiatorId, null);
            Integer orderStatus = (Integer) orderInfo.get("orderStatus");
            if (orderStatus == Constant.WAIT_FINISHING || orderStatus == Constant.RECEIVING_TIMEOUT || orderStatus == Constant.FINISHING_TIMEOUT) {
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
            Map<String, Object> orderInfo = this.selectOrderInfo(orderId, orderInitiatorId, null);
            Integer orderStatus = (Integer) orderInfo.get("orderStatus");
            if (orderStatus == Constant.WAIT_FINISHING || orderStatus == Constant.FINISHED || orderStatus == Constant.FINISHING_TIMEOUT) {
                return false;
            }
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
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int receiveOrder(String orderId, String orderReceiverId) throws Exception {
        try {
            Map<String, Object> statusAndUserMargin = userService.selectUserAuthenticationInfo(orderReceiverId);
            if (!((Boolean) statusAndUserMargin.get("userAuthenticationStatus"))) {
                return 0;
            }
            Map<String, Object> orderInfo = this.selectOrderInfo(orderId,null,null);
            if ((Integer) orderInfo.get("orderStatus") != 1) {
                return 3;
            }
            if (Optional.ofNullable((BigDecimal) statusAndUserMargin.get("userMargin")).orElse(new BigDecimal(0)).compareTo((BigDecimal) orderInfo.get("orderValue")) < 0) {
                return 1;
            }
            if (orderMapper.receiveOrder(orderId, orderReceiverId, statusAndUserMargin.get("userRealName").toString(), statusAndUserMargin.get("userPhone").toString()) == 1) {
                return 2;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.receiveOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.receiveOrder失败，" + e);
        }
        return 3;
    }

    @Override
    public Map<String, Object> selectOrderInfo(String orderId,String orderInitiatorId,String orderReceiverId) throws Exception {
        try {
            return orderMapper.selectOrderInfo(orderId,orderInitiatorId,orderReceiverId);
        } catch (Exception e) {
            log.error("OrderServiceImpl.selectOrderInfo失败，" + e);
            throw new Exception("OrderServiceImpl.selectOrderInfo失败，" + e);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean finishOrder(String orderId, String orderReceiverId) throws Exception {
        try {
            if (orderMapper.finishOrder(orderId, orderReceiverId) == 1) {
                return true;
            }
        } catch (Exception e) {
            log.error("OrderServiceImpl.finishOrder失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("OrderServiceImpl.finishOrder失败，" + e);
        }
        return false;
    }

    @Override
    public ArrayList<Order> selectOrders(Map<String, Object> param) throws Exception {
        try {
//            if((Integer)param.get("orderStatus") == Constant.ORDER_STATUS_ALL){
//                param.remove("orderStatus");
//            }
            return orderMapper.selectOrders(param);
        } catch (Exception e) {
            log.error("OrderServiceImpl.selectOrders失败，" + e);
            throw new Exception("OrderServiceImpl.sselectOrders失败，" + e);
        }
    }
}
