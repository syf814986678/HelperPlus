package com.shiyifan.mapper;

import com.shiyifan.pojo.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

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
     * @return java.lang.Integer
     * @author zou_cha
     * @date 2021-01-20 10:18:26
     * @method selectOrderStatus
     * @params [orderId, orderInitiatorId]
     **/
    Integer selectOrderStatus(@Param("orderId") String orderId, @Param("orderInitiatorId") String orderInitiatorId);

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
     * @return java.util.Map<java.lang.String, java.lang.Object>
     * @author user
     * @date 2021-01-21 16:11:27
     * @method selectOrderInfo
     * @params [orderId]
     **/
    Map<String, Object> selectOrderInfo(@Param("orderId") String orderId);

    int receiveOrder(@Param("orderId") String orderId, @Param("orderReceiverId") String orderReceiverId, @Param("orderReceiverName") String orderReceiverName, @Param("orderReceiverPhone") String orderReceiverPhone);
}
