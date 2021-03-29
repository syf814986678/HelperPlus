package com.shiyifan;

import com.shiyifan.pojo.User;

import java.math.BigDecimal;
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
     * @return java.lang.Boolean
     * @author ZouCha
     * @date 2021-03-02 20:51:33
     * @method registerByUserId
     * @params [userId]
     **/
    Boolean registerByUserId(String userId) throws Exception;

    /**
     * @return com.shiyifan.pojo.User
     * @author zoucha
     * @date 2021-01-21 11:06:34
     * @method login
     * @params [username, password]
     **/
    User login(String username, String password) throws Exception;

    /**
     * @return com.shiyifan.pojo.User
     * @author ZouCha
     * @date 2021-03-02 20:32:16
     * @method loginByUserId
     * @params [userId]
     **/
    User loginByUserId(String userId) throws Exception;

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
     * @params [userId, userMargin, userRealName, userIdentification]
     **/
    Boolean certificate(String userId, String userMargin, String userRealName, String userIdentification, String userTelPhone) throws Exception;

    /**
     * @return java.lang.Boolean
     * @author ZouCha
     * @date 2021-03-07 17:42:08
     * @method changeMargin
     * @params [userId, changeMargin]
     **/
    Boolean changeMargin(String userId, BigDecimal changeMargin) throws Exception;

    /**
     * @return int
     * @author user
     * @date 2021-03-23 14:54:05
     * @method updateLoginTime
     * @params [userId]
     **/
    int updateLoginTime(String userId) throws Exception;
}
