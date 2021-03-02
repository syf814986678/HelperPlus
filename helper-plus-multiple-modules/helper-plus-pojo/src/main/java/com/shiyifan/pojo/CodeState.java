package com.shiyifan.pojo;


/**
 * @author ZouCha
 * @name CodeState
 * @date 2020-12-01 15:25:46
 **/
public class CodeState {

    /**
     * 操作成功
     */
    public static final int SUCCESS_CODE = 200;
    public static final String SUCCESS_STR = "SUCCESS";

    /**
     * 操作失败
     */
    public static final int OPERATION_ERROR_CODE = 201;
    public static final String OPERATION_ERROR_STR = "OPERATION_ERROR";

    /**
     * 警告
     */
    public static final int SUCCESS_WARNING_CODE = 202;
    public static final String SUCCESS_WARNING_STR = "SUCCESS_WARNING";

    /**
     * 登录失败
     */
    public static final int LOGIN_ERROR_CODE = 301;
    public static final String LOGIN_ERROR_STR = "LOGIN_ERROR";
    /**
     * 登录用户不存在
     */
    public static final int LOGIN_NULL_CODE = 302;
    public static final String LOGIN_NULL_STR = "LOGIN_NULL";
    /**
     * token错误
     */
    public static final int TOKEN_ERROR_CODE = 701;
    public static final String TOKEN_ERROR_STR = "TOKEN_ERROR";

    /**
     * token过期
     */
    public static final int TOKEN_TIME_LIMIT_CODE = 702;
    public static final String TOKEN_TIME_LIMIT_STR = "TOKEN_TIME_LIMIT";

    /**
     * 出现异常
     */
    public static final int EXCEPTION_CODE = 999;
    public static final String EXCEPTION_STR = "EXCEPTION";

    /**
     * oss回调异常
     */
    public static final int OSS_EXCEPTION_CODE = 998;
    public static final String OSS_EXCEPTION_STR = "OSS_EXCEPTION";

    /**
     * USER_CLAIMS
     */
    public static final String USER_CLAIMS_STR = "USER_CLAIMS";
}
