package com.shiyifan;

import com.shiyifan.pojo.Order;

import java.util.ArrayList;
import java.util.Map;

/**
 * @author zou_cha
 * @name OrderService
 * @date 2021-01-18 13:01:37
 **/
public interface OrderService {
    /**
     * @return java.lang.Boolean
     * @author zou_cha
     * @date 2021-01-19 10:49:11
     * @method createOrder
     * @params [order]
     **/
    Boolean createOrder(Order order) throws Exception;

    /**
     * @return java.lang.Boolean
     * @author zou_cha
     * @date 2021-01-20 10:01:08
     * @method deleteOrder
     * @params [orderId, orderInitiatorId]
     **/
    Boolean deleteOrder(String orderId, String orderInitiatorId) throws Exception;

    /**
     * @return java.lang.Boolean
     * @author zou_cha
     * @date 2021-01-20 11:12:41
     * @method cancelOrder
     * @params [orderId, orderInitiatorId]
     **/
    Boolean cancelOrder(String orderId, String orderInitiatorId) throws Exception;

    /**
     * @return java.lang.Boolean
     * @author zou_cha
     * @date 2021-01-20 13:23:58
     * @method checkOrder
     * @params [orderId]
     **/
    Boolean checkOrder(ArrayList<String> orderIdString) throws Exception;

    /**
     * @return java.lang.int
     * @author zou_cha
     * @date 2021-01-20 14:41:26
     * @method receiveOrder
     * @params [orderId, orderReceiverId]
     **/
    int receiveOrder(String orderId, String orderReceiverId) throws Exception;

    /**
     * @return com.shiyifan.pojo.Order
     * @author zoucha
     * @date 2021-01-29 09:32:45
     * @method selectOrderInfo
     * @params [orderId, orderInitiatorId, orderReceiverId]
     **/
    Order selectOrderInfo(String orderId, String orderInitiatorId, String orderReceiverId) throws Exception;

    /**
     * @return java.lang.Integer
     * @author zoucha
     * @date 2021-01-29 09:54:08
     * @method finishOrder
     * @params [orderId, orderReceiverId]
     **/
    Integer finishOrder(String orderId, String orderReceiverId) throws Exception;

    /**
     * @return java.util.ArrayList<com.shiyifan.pojo.Order>
     * @author user
     * @date 2021-01-26 11:16:40
     * @method selectOrders
     * @params [param]
     **/
    ArrayList<Order> selectOrders(Map<String, Object> param) throws Exception;

    /**
     * @return java.lang.Integer
     * @author user
     * @date 2021-04-02 09:47:29
     * @method getTotalOrders
     * @params [param]
     **/
    Integer getTotalOrders(Map<String, Object> param) throws Exception;

    ArrayList<String> selectUnCheckOrders();


}
