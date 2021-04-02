package com.shiyifan.mapper;

import com.shiyifan.pojo.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

/**
 * @author ZouCha
 * @name OrderMapper
 * @date 2020-12-07 16:05
 **/
@Mapper
@Repository
public interface OrderMapper {

    /**
     * @return int
     * @author zou_cha
     * @date 2021-01-19 10:05:20
     * @method createOrder
     * @params [order]
     **/
    int createOrder(@Param("order") Order order);

    /**
     * @return int
     * @author zoucha
     * @date 2021-01-25 13:20:48
     * @method createOrderLocation
     * @params [order]
     **/
    int createOrderLocation(@Param("order") Order order);

    /**
     * @return java.lang.Integer
     * @author zou_cha
     * @date 2021-01-20 10:18:26
     * @method selectOrderStatus
     * @params [orderId, orderInitiatorId]
     **/
//    Integer selectOrderStatus(@Param("orderId") String orderId, @Param("orderInitiatorId") String orderInitiatorId);

    /**
     * @return int
     * @author zou_cha
     * @date 2021-01-20 10:33:12
     * @method deleteOrder
     * @params [orderId, orderInitiatorId]
     **/
    int deleteOrder(@Param("orderId") String orderId, @Param("orderInitiatorId") String orderInitiatorId);

    /**
     * @return int
     * @author zou_cha
     * @date 2021-01-20 11:13:51
     * @method cancelOrder
     * @params [orderId, orderInitiatorId]
     **/
    int cancelOrder(@Param("orderId") String orderId, @Param("orderInitiatorId") String orderInitiatorId);

    /**
     * @return int
     * @author zou_cha
     * @date 2021-01-20 13:25:14
     * @method checkOrder
     * @params [orderId]
     **/
    int checkOrder(@Param("orderId") String orderId);

    /**
     * @return com.shiyifan.pojo.Order
     * @author zoucha
     * @date 2021-01-29 09:33:09
     * @method selectOrderInfo
     * @params [orderId, orderInitiatorId, orderReceiverId]
     **/
    Order selectOrderInfo(@Param("orderId") String orderId, @Param("orderInitiatorId") String orderInitiatorId, @Param("orderReceiverId") String orderReceiverId);

    /**
     * @return int
     * @author zou_cha
     * @date 2021-01-22 09:17:49
     * @method receiveOrder
     * @params [orderId, orderReceiverId, orderReceiverName, orderReceiverPhone]
     **/
    int receiveOrder(@Param("orderId") String orderId, @Param("orderReceiverId") String orderReceiverId, @Param("orderReceiverName") String orderReceiverName, @Param("orderReceiverPhone") String orderReceiverPhone);

    /**
     * @return int
     * @author zou_cha
     * @date 2021-01-22 09:18:56
     * @method finishOrder
     * @params [orderId, orderReceiverId, overTime]
     **/
    int finishOrder(@Param("orderId") String orderId, @Param("orderReceiverId") String orderReceiverId, @Param("overTime") Integer overTime);

    /**
     * @return java.util.ArrayList<com.shiyifan.pojo.Order>
     * @author user
     * @date 2021-01-26 11:15:56
     * @method selectOrders
     * @params [param]
     **/
    ArrayList<Order> selectOrders(Map<String, Object> param);

    /**
     * @return java.lang.Integer
     * @author user
     * @date 2021-04-02 09:49:03
     * @method getTotalOrders
     * @params [param]
     **/
    Integer getTotalOrders(Map<String, Object> param);
}
