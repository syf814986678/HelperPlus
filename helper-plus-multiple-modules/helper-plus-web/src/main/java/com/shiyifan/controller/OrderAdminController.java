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
import javax.validation.Valid;
import java.util.HashMap;

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
    public Result createOrder(HttpServletRequest request, @Valid @RequestBody Order order) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            order.setOrderInitiatorId(userId);
            if (orderService.createOrder(order)) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            log.error("OrderController.createOrder失败，" + e);
            throw new Exception("订单创建发生异常！请联系管理员");
        }
        return ResultUtil.operationError("订单创建失败!", null);
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
            throw new Exception("订单删除发生异常！请联系管理员");
        }
        return ResultUtil.operationError("订单删除失败!请检查订单状态", null);
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
            throw new Exception("订单取消发生异常！请联系管理员");
        }
        return ResultUtil.operationError("订单取消失败!请检查订单状态", null);
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
            throw new Exception("订单审核发生异常！请联系管理员");
        }
        return ResultUtil.operationError("订单审核失败!请检查订单状态", null);
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
                    return ResultUtil.operationError("保证金不足", null);
                case 2:
                    return ResultUtil.success(null);
                case 3:
                    return ResultUtil.operationError("订单状态异常", null);
                default:
                    return ResultUtil.operationError("订单接取失败!请检查个人状态", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("OrderController.receiveOrder失败，" + e);
            throw new Exception("订单接取发生异常！请联系管理员");
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
                    return ResultUtil.warn("订单超时完成", null);
                default:
                    return ResultUtil.operationError("订单完成失败!请检查订单状态", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("OrderController.finishOrder失败，" + e);
            throw new Exception("订单完成发生异常！请联系管理员");
        }
    }

    @PostMapping("/selectOrders")
    public Result selectOrders(HttpServletRequest request, @RequestBody HashMap<String,Object> map) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            log.info("成功");
            return ResultUtil.success(orderService.selectOrders(map));

        } catch (Exception e) {
            e.printStackTrace();
            log.error("OrderController.finishOrder失败，" + e);
            throw new Exception("订单完成发生异常！请联系管理员");
        }

    }
}
