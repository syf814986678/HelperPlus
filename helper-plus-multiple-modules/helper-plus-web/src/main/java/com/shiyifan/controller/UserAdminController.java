package com.shiyifan.controller;

import com.shiyifan.ResultUtil;
import com.shiyifan.UserService;
import com.shiyifan.pojo.CodeState;
import com.shiyifan.pojo.Result;
import io.jsonwebtoken.Claims;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


/**
 * @author zoucha
 * @name UserAdminController
 * @date 2021-01-21 11:54:11
 **/

@RestController
@Log4j2
@RequestMapping("/admin")
public class UserAdminController {
    @Autowired
    private UserService userService;


    @PostMapping("/certificate")
    public Result certificate(HttpServletRequest request, @RequestParam(value = "userMargin",required = false) String userMargin,@RequestParam(value = "useRealName",required = false) String useRealName,@RequestParam(value = "userIdentification",required = false) String userIdentification,@RequestParam(value = "userAuthenticationStatus",required = false) Integer userAuthenticationStatus) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            if (userService.certificate(userId,userMargin, useRealName, userIdentification)) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("UserController.certificate失败，" + e);
            throw new Exception("实名认证发生异常！");
        }
        return ResultUtil.operationError("实名认证失败!", null);
    }
}
