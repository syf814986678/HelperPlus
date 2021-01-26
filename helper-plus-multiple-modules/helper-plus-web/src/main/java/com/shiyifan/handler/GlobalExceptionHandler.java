package com.shiyifan.handler;

import com.aliyun.oss.OSSException;
import com.shiyifan.ResultUtil;
import com.shiyifan.pojo.Result;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.Objects;

/**
 * @author ZouCha
 * @name GlobalExceptionHandler
 * @date 2020-12-05 13:17
 **/
@RestControllerAdvice
@Component
public class GlobalExceptionHandler {
    /**
     * 表示让Spring捕获到所有抛出的SignException异常，并交由这个被注解的方法处理
     */
    @ExceptionHandler(Exception.class)
    public Result handleException(Exception e) {
        return ResultUtil.exception(e.getMessage(), null);
    }

    @ExceptionHandler(OSSException.class)
    public Result handleOssException() {
        return ResultUtil.ossException("Oss回调异常！", null);
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    public Result handleConstraintViolationException(ConstraintViolationException e) {
        System.out.println(e);
        return ResultUtil.operationError(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return ResultUtil.operationError(Objects.requireNonNull(e.getFieldError()).getDefaultMessage());
    }

}
