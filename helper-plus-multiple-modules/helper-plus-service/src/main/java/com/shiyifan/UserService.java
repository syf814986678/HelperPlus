package com.shiyifan;

import com.shiyifan.pojo.User;

import java.util.Map;

/**
 * @author zou_cha
 * @name UserService
 * @date 2021-01-18 13:01:37
 **/
public interface UserService {

    /**
     * @return java.lang.Boolean
     * @author zou_cha
     * @date 2021-01-18 13:02:10
     * @method register
     * @params [user]
     **/
    Boolean register(User user) throws Exception;

    /**
     * @return com.shiyifan.pojo.User
     * @author zoucha
     * @date 2021-01-21 11:06:34
     * @method login
     * @params [username, password]
     **/
    User login(String username, String password) throws Exception;

    /**
     * @return java.util.Map<java.lang.String, java.lang.Object>
     * @author zoucha
     * @date 2021-01-20 15:16:34
     * @method selectUserAuthenticationInfo
     * @params [userId]
     **/
    Map<String, Object> selectUserAuthenticationInfo(String userId) throws Exception;

    /**
     * @return java.lang.Boolean
     * @author zoucha
     * @date 2021-01-21 11:51:38
     * @method certificate
     * @params [userId, userMargin, useRealName, userIdentification]
     **/
    Boolean certificate(String userId, String userMargin, String useRealName, String userIdentification) throws Exception;

}
