package com.shiyifan;

import com.shiyifan.mapper.OrderMapper;
import com.shiyifan.mapper.UserMapper;
import com.shiyifan.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.Map;

@SpringBootTest
public class test {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Test
    public void test() throws Exception {
        User user = new User();
        user.setUserName("test");
        user.setUserPassword("123456");
        user.setUserPhone("13512165779");
        user.setUserAddress("上海市黄浦区");
        user.setUserAvatar("www.bilibili.com");
        System.out.println(userService.register(user));
    }

    @Test
    public void testcertificate() throws Exception {
//        System.out.println(userMapper.registerAuthentication(UUID.randomUUID().toString().replaceAll("-", ""), "15d358a1d863429b9a2ff03eba9391cb"));
        Map<String, Object> authenticationInfo = userMapper.selectUserAuthenticationInfo("725c95dabda64ff6972a347361ab116f");
        System.out.println(userMapper.certificate(authenticationInfo.get("userAuthenticationId").toString(), "15d358a1d863429b9a2ff03eba9391cb", new BigDecimal(1), null, null));
    }

    @Test
    public void testmargin() throws Exception {
        System.out.println(userMapper.selectUserAuthenticationInfo("15d358a1d863429b9a2ff03eba9391cb"));
    }


    @Test
    public void testorder() throws Exception {
        System.out.println(orderService.selectOrderInfo("ac93cca54d4648e69321ce9e14a930ac"));

    }

}
