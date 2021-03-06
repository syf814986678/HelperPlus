package com.shiyifan.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * @author ZouCha
 * @name Order
 * @date 2020-11-20 15:23:04
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Order {
    private String orderId;
    @NotNull(message = "订单名称不能为空！")
    private String orderName;
    @NotNull(message = "订单内容不能为空！")
    private String orderContent;
    @NotNull(message = "订单预估金额不能为空！")
    private BigDecimal orderValue;
    @NotNull(message = "订单取货地址不能为空！")
    private String orderPickupAddress;
    @NotNull(message = "订单取货码不能为空！")
    private String orderPickupCode;
    private String orderInitiatorId;
    @NotNull(message = "订单发起人姓名不能为空！")
    private String orderInitiatorName;
    @NotNull(message = "订单发起人地址不能为空！")
    private String orderInitiatorAddress;
    @NotNull(message = "订单发起人电话不能为空！")
    private String orderInitiatorPhone;
    private String orderReceiverId;
    private String orderReceiverName;
    private String orderReceiverPhone;
    @NotNull(message = "订单酬劳不能为空！")
    private BigDecimal orderPay;
    @NotNull(message = "订单取货截止时间不能为空！")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime orderUntilPickTime;
    @NotNull(message = "订单送货截止时间不能为空！")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime orderUntilFinishTime;
    private int orderStatus;


    private String locationId;
    @NotNull(message = "订单发起者位置不能为空！")
    private String orderInitiatorLocation;
    @NotNull(message = "订单发起者城市不能为空！")
    private String orderInitiatorCity;
    @NotNull(message = "订单接取限制范围不能为空！")
    private String orderLimitLocation;

    private int isDeleted;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createGmt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateGmt;
}
