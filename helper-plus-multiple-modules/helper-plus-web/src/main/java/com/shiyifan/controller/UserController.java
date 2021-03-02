package com.shiyifan.controller;

import com.google.gson.Gson;
import com.shiyifan.JwtUtil;
import com.shiyifan.ResultUtil;
import com.shiyifan.UserService;
import com.shiyifan.pojo.Constant;
import com.shiyifan.pojo.Result;
import com.shiyifan.pojo.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * @author zou_cha
 * @name UserController
 * @date 2021-01-18 13:18:19
 **/
@RestController
@Log4j2
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RestTemplate httpUtil;

    @PostMapping("/register")
    public Result register(@RequestParam("userId") String userId) throws Exception {
        try {
            if (userService.registerByUserId(userId)) {
                return ResultUtil.success(null);
            }
        } catch (Exception e) {
            log.error("UserController.register失败，" + e);
            throw new Exception("注册用户发生异常！");
        }
        return ResultUtil.operationError("注册用户失败!请联系管理员", null);

    }

    @PostMapping("/login")
    public Result login(@RequestParam("wxCode") String wxCode) throws Exception {
        try {
            if (wxCode == null || "".equals(wxCode)) {
                return ResultUtil.loginError("wxCode为空",null);
            }
            Map codeSession = new Gson().fromJson(httpUtil.getForObject("https://api.weixin.qq.com/sns/jscode2session?appid=" + Constant.APP_ID + "&secret=" + Constant.APP_SECRET + "&js_code=" + wxCode + "&grant_type=authorization_code", String.class), Map.class);
            System.out.println(codeSession);
            if (codeSession == null) {
                return ResultUtil.loginError("请求微信服务code2Session出错",null);
            }
            User user = userService.loginByUserId(codeSession.get("openid").toString());
            if(user == null){
                if (!userService.registerByUserId(codeSession.get("openid").toString())) {
                    return ResultUtil.loginError("注册新用户出错",null);
                }
            }
            Map accessToken = new Gson().fromJson(httpUtil.getForObject("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + Constant.APP_ID + "&secret=" + Constant.APP_SECRET, String.class), Map.class);
            System.out.println(accessToken);
            if (accessToken == null) {
                return ResultUtil.loginError("请求微信服务getAccessToken出错",null);
            }
            else {
                user = userService.loginByUserId(codeSession.get("openid").toString());
                HashMap<String, String> map = new HashMap<>(8);
//                map.put("userName",user.getUserName());
//                map.put("userPhone",user.getUserPhone());
//                map.put("userAddress",user.getUserAddress());
//                map.put("userAvatar",user.getUserAvatar());
                map.put("userRole",user.getUserRole());
                map.put("token",jwtUtil.createToken(user.getUserId(), user.getUserName(),accessToken.get("access_token").toString()));
                return ResultUtil.success("登录成功", map);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("UserController.login失败，" + e);
            throw new Exception("登录发生异常！");
        }
    }
}
