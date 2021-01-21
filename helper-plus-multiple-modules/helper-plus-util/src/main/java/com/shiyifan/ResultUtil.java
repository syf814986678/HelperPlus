package com.shiyifan;

import com.shiyifan.pojo.CodeState;
import com.shiyifan.pojo.Result;

/**
 * @author ZouCha
 * @name ResultUtil
 * @date 2020-12-05 12:10
 **/
public class ResultUtil {
    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:20:49
     * @method ossException
     * @params [data]
     **/
    public static Result ossException(Object data) {
        return baseResult(CodeState.OSS_EXCEPTION_CODE, CodeState.OSS_EXCEPTION_STR, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-07 16:44:05
     * @method ossException
     * @params [msg, data]
     **/
    public static Result ossException(String msg, Object data) {
        return baseResult(CodeState.OSS_EXCEPTION_CODE, msg, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:20:10
     * @method exception
     * @params [data]
     **/
    public static Result exception(Object data) {
        return baseResult(CodeState.EXCEPTION_CODE, CodeState.EXCEPTION_STR, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 15:33:11
     * @method exception
     * @params [msg, data]
     **/
    public static Result exception(String msg, Object data) {
        return baseResult(CodeState.EXCEPTION_CODE, msg, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:19:28
     * @method tokenTimeLimit
     * @params [data]
     **/
    public static Result tokenTimeLimit(Object data) {
        return baseResult(CodeState.TOKEN_TIME_LIMIT_CODE, CodeState.TOKEN_TIME_LIMIT_STR, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-07 16:44:44
     * @method tokenTimeLimit
     * @params [msg, data]
     **/
    public static Result tokenTimeLimit(String msg, Object data) {
        return baseResult(CodeState.TOKEN_TIME_LIMIT_CODE, msg, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:18:36
     * @method tokenError
     * @params [data]
     **/
    public static Result tokenError(Object data) {
        return baseResult(CodeState.TOKEN_ERROR_CODE, CodeState.TOKEN_ERROR_STR, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-07 16:44:48
     * @method tokenError
     * @params [msg, data]
     **/
    public static Result tokenError(String msg, Object data) {
        return baseResult(CodeState.TOKEN_ERROR_CODE, msg, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:18:04
     * @method loginError
     * @params [data]
     **/
    public static Result loginError(Object data) {
        return baseResult(CodeState.LOGIN_ERROR_CODE, CodeState.LOGIN_ERROR_STR, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-07 16:45:52
     * @method loginError
     * @params [msg, data]
     **/
    public static Result loginError(String msg, Object data) {
        return baseResult(CodeState.LOGIN_ERROR_CODE, msg, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:17:18
     * @method operationError
     * @params [data]
     **/
    public static Result operationError(Object data) {
        return baseResult(CodeState.OPERATION_ERROR_CODE, CodeState.OPERATION_ERROR_STR, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-07 16:46:10
     * @method operationError
     * @params [msg, data]
     **/
    public static Result operationError(String msg, Object data) {
        return baseResult(CodeState.OPERATION_ERROR_CODE, msg, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:16:03
     * @method success
     * @params [data]
     **/
    public static Result success(Object data) {
        return baseResult(CodeState.SUCCESS_CODE, CodeState.SUCCESS_STR, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-07 16:46:29
     * @method success
     * @params [msg, data]
     **/
    public static Result success(String msg, Object data) {
        return baseResult(CodeState.SUCCESS_CODE, msg, data);
    }

    /**
     * @return com.shiyifan.pojo.Result
     * @author ZouCha
     * @date 2020-12-05 12:15:19
     * @method baseResult
     * @params [codeState, msg, data]
     **/
    private static Result baseResult(int codeState, String msg, Object data) {
        Result result = new Result();
        result.setCodeState(codeState);
        result.setMsg(msg);
        result.setData(data);
        return result;
    }
}
