package com.shiyifan.controller;

import com.shiyifan.JwtUtil;
import com.shiyifan.ResultUtil;
import com.shiyifan.UserService;
import com.shiyifan.pojo.Result;
import com.shiyifan.pojo.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashMap;

/**
 *
 * @author zou_cha
 * @name UserController
 * @date 2021-01-18 13:18:19
 *
 **/
@RestController
@Log4j2
@Validated
public class UserController {

    @Autowired
    private UserService userService;


    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping ("/register")
    public Result register(@Valid @RequestBody User user) throws Exception {
        try {
            if(userService.register(user)){
                return ResultUtil.success(null);
            }
        }
        catch (Exception e){
            log.error("UserController.register失败，"+e);
            throw new Exception("注册用户发生异常！");
        }
        return ResultUtil.operationError("注册用户失败!请联系管理员",null);

    }

    @PostMapping ("/login")
    public Result login(@NotNull(message = "用户名不能为空")String username,@NotEmpty(message = "密码不能为空")String password) throws Exception {
        try {
            User user = userService.login(username, password);
            if (user != null) {
                HashMap<String, String> map = new HashMap<>();
                map.put("userName",user.getUserName());
                map.put("userPhone",user.getUserPhone());
                map.put("userAddress",user.getUserAddress());
                map.put("userAvatar",user.getUserAvatar());
                map.put("userRole",user.getUserRole());
                map.put("token",jwtUtil.createToken(user.getUserId(), user.getUserName()));
                return ResultUtil.success("登录成功", map);
            } else {
                return ResultUtil.loginError("账号不存在或密码错误", null);
            }
        } catch (Exception e) {
            log.error("UserController.login失败，"+e);
            throw new Exception("登录发生异常！");
        }

    }





}
