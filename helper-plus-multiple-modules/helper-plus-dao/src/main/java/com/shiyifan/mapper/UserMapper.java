package com.shiyifan.mapper;

import com.shiyifan.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Map;

/**
 * @author ZouCha
 * @name UserMapper
 * @date 2020-12-07 16:05
 **/
@Mapper
@Repository
public interface UserMapper {

    /**
     * @return com.shiyifan.pojo.User
     * @author ZouCha
     * @date 2020-12-07 16:06:00
     * @method login
     * @params [username, password]
     **/
    User login(@Param("username") String username, @Param("password") String password);

    /**
     * @return com.shiyifan.pojo.User
     * @author ZouCha
     * @date 2021-03-02 20:32:29
     * @method loginByUserId
     * @params [userId]
     **/
    User loginByUserId(@Param("userId") String userId);

    /**
     * @return int
     * @author ZouCha
     * @date 2021-01-18 11:37:43
     * @method register
     * @params [user]
     **/
    int register(@Param("user") User user);

    /**
     * @return int
     * @author zoucha
     * @date 2021-01-21 09:53:04
     * @method registerAuthentication
     * @params [userAuthenticationId, userId]
     **/
    int registerAuthentication(@Param("userAuthenticationId") String userAuthenticationId, @Param("userId") String userId);

    /**
     * @return int
     * @author zoucha
     * @date 2021-01-21 09:58:52
     * @method certificate
     * @params [userAuthenticationId, userId, userMargin, useRealName, userIdentification]
     **/
    int certificate(@Param("userAuthenticationId") String userAuthenticationId, @Param("userId") String userId, @Param("userMargin") BigDecimal userMargin, @Param("useRealName") String useRealName, @Param("userIdentification") String userIdentification);

    /**
     * @return java.util.Map<java.lang.String, java.lang.Object>
     * @author zoucha
     * @date 2021-01-20 15:14:33
     * @method selectUserAuthenticationInfo
     * @params [userId]
     **/
    Map<String, Object> selectUserAuthenticationInfo(@Param("userId") String userId);
}
