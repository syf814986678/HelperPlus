package com.shiyifan.controller;

import com.google.gson.Gson;
import com.shiyifan.AesCbcUtil;
import com.shiyifan.ResultUtil;
import com.shiyifan.UserService;
import com.shiyifan.pojo.CodeState;
import com.shiyifan.pojo.Result;
import io.jsonwebtoken.Claims;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


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
    public Result certificate(HttpServletRequest request, @RequestBody Map<String,Object> json) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            if (userService.certificate(userId,json.get("userMargin").toString(),json.get("userRealName").toString(),json.get("userIdentification").toString(),json.get("userTelPhone").toString())) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("UserController.certificate失败，" + e);
            throw new Exception("实名认证发生异常！");
        }
        return ResultUtil.operationError("实名认证失败!", null);
    }

    @PostMapping("/getPhone")
    public Result getPhone(HttpServletRequest request,@RequestBody Map<String,String> json) throws Exception {
        Claims claims = null;
        Gson gson = new Gson();
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String sessionKey = (String) claims.get("sessionKey");
            String result = AesCbcUtil.decrypt(json.get("encryptedData"), sessionKey, json.get("iv"), "UTF-8");
            if (null != result && result.length() > 0) {
                Map json2 = gson.fromJson(result, Map.class);
                return ResultUtil.success( json2.get("countryCode").toString() + "-" + json2.get("purePhoneNumber").toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("UserController.getPhone失败，" + e);
            throw new Exception("获取电话发生异常！");
        }
        return ResultUtil.operationError("获取电话失败!", null);
    }

    @PostMapping("/getAuthentication")
    public Result getAuthentication(HttpServletRequest request,@RequestBody Map<String,String> json) throws Exception {
        Claims claims = null;
        try {
            claims = (Claims) request.getAttribute(CodeState.USER_CLAIMS_STR);
            String userId = (String) claims.get("userId");
            return ResultUtil.success(userService.selectUserAuthenticationInfo(userId));
        } catch (Exception e) {
            e.printStackTrace();
            log.error("UserController.getAuthentication失败，" + e);
            throw new Exception("获取用户实名信息发生异常！");
        }
    }
}
