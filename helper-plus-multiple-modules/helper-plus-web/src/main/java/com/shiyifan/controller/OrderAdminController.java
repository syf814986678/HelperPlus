package com.shiyifan.controller;

import com.shiyifan.OrderService;
import com.shiyifan.ResultUtil;
import com.shiyifan.pojo.CodeState;
import com.shiyifan.pojo.Order;
import com.shiyifan.pojo.Result;
import io.jsonwebtoken.Claims;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author zou_cha
 * @name OrderAdminController
 * @date 2021-01-18 13:18:19
 **/
@RestController
@Log4j2
@RequestMapping("/admin")
public class OrderAdminController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    public Result createOrder(HttpServletRequest request,@RequestBody Order order) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            order.setOrderInitiatorId(userId);
            if (orderService.createOrder(order)) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("OrderController.createOrder失败，" + e);
            throw new Exception("任务创建发生异常！请联系管理员");
        }
        return ResultUtil.operationError("任务创建失败!", null);
    }

    @PostMapping("/deleteOrder/{orderId}")
    public Result deleteOrder(HttpServletRequest request, @PathVariable("orderId") String orderId) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            if (orderService.deleteOrder(orderId, userId)) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            log.error("OrderController.deleteOrder失败，" + e);
            throw new Exception("任务删除发生异常！请联系管理员");
        }
        return ResultUtil.operationError("任务删除失败!请检查任务状态", null);
    }

    @PostMapping("/cancelOrder/{orderId}")
    public Result cancelOrder(HttpServletRequest request, @PathVariable("orderId") String orderId) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            if (orderService.cancelOrder(orderId, userId)) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            log.error("OrderController.cancelOrder失败，" + e);
            throw new Exception("任务取消发生异常！请联系管理员");
        }
        return ResultUtil.operationError("任务取消失败!任务状态已改变", null);
    }

    /**
     * web审核 todo
     */
    @PostMapping("/checkOrder/{orderId}")
    public Result checkOrder(HttpServletRequest request, @PathVariable("orderId") String orderId) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            if (orderService.checkOrder(orderId)) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            log.error("OrderController.checkOrder失败，" + e);
            throw new Exception("任务审核发生异常！请联系管理员");
        }
        return ResultUtil.operationError("任务审核失败!请检查任务状态", null);
    }

    @PostMapping("/receiveOrder/{orderId}")
    public Result receiveOrder(HttpServletRequest request, @PathVariable("orderId") String orderId) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            switch (orderService.receiveOrder(orderId, userId)) {
                case 0:
                    return ResultUtil.operationError("未实名认证", null);
                case 1:
                    return ResultUtil.operationError("保证金金额不足", null);
                case 2:
                    return ResultUtil.success(null);
                case 3:
                    return ResultUtil.operationError("任务状态异常", null);
                default:
                    return ResultUtil.operationError("任务接取失败!请检查个人状态", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("OrderController.receiveOrder失败，" + e);
            throw new Exception("任务接取发生异常！请联系管理员");
        }
    }

    @PostMapping("/finishOrder/{orderId}")
    public Result finishOrder(HttpServletRequest request, @PathVariable("orderId") String orderId) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            switch (orderService.finishOrder(orderId, userId)){
                case 0:
                    return ResultUtil.success(null);
                case 1:
                    return ResultUtil.warn("任务超时完成", "overTime");
                default:
                    return ResultUtil.operationError("任务完成失败!请检查任务状态", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("OrderController.finishOrder失败，" + e);
            throw new Exception("任务完成发生异常！请联系管理员");
        }
    }

    @PostMapping("/selectOrders")
    public Result selectOrders(HttpServletRequest request, @RequestBody Map<String,Object> map) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");

            if(map.get("includeInitiator") != null){
                map.put("orderInitiatorId", userId);
            }
            if(map.get("includeReceiver") != null){
                map.put("orderReceiverId", userId);
            }
            //判断是否有传入的订单状态参数，对订单状态参数进行处理
            String[] orderStatuses = Optional.ofNullable((String) map.get("orderStatus")).orElse("").split(",");
            List<String> list = new ArrayList<>();
            Collections.addAll(list, orderStatuses);
            List<String> collect = list.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());
            map.put("orderStatus", collect);
            ArrayList<Object> objects = null;
            if(map.get("pageNow") != null && map.get("pageSize") != null){
                Integer totalOrders = orderService.getTotalOrders(map);
                objects = new ArrayList<>(2);
                objects.add(totalOrders);
            }
            ArrayList<Order> orders = orderService.selectOrders(map);
            if(objects != null){
                objects.add(orders);
                return ResultUtil.success(objects);
            }
            return ResultUtil.success(orders);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("OrderController.selectOrders失败，" + e);
            throw new Exception("任务查询发生异常！请联系管理员");
        }
    }
}
