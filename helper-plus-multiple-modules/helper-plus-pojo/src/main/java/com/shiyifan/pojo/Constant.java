package com.shiyifan.pojo;

/**
 * @author zou_cha
 * @name Constant
 * @date 2021-01-20 10:59:54
 * 订单状态，0待审核，1待接单，2已接单，配送中，3已完成，4审核失败，5取消订单，6订单接取超时，7订单完成超时
 **/
public class Constant {
    /**
     * 0待审核
     */
    public static final int CHECK_PENDING = 0;
    /**
     * 1待接单
     */
    public static final int WAIT_RECEIVING = 1;
    /**
     * 2已接单，配送中
     */
    public static final int WAIT_FINISHING = 2;
    /**
     * 3已完成
     */
    public static final int FINISHED = 3;
    /**
     * 4审核失败
     */
    public static final int CHECK_PENDING_FAILED = 4;
    /**
     * 5取消订单
     */
    public static final int CANCELED = 5;
    /**
     * 6订单接取超时
     */
    public static final int RECEIVING_TIMEOUT = 6;
    /**
     * 7订单完成超时
     */
    public static final int FINISHING_TIMEOUT = 7;

    /**
     * 9全部订单
     */
    public static final int ORDER_STATUS_ALL = 9;

}
