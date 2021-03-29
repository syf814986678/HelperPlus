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
     * @author ZouCha
     * @date 2021-03-05 13:37:22
     * @method certificate
     * @params [userAuthenticationId, userId, userMargin, userRealName, userIdentification, userTelPhone]
     **/
    int certificate(@Param("userAuthenticationId") String userAuthenticationId, @Param("userId") String userId, @Param("userMargin") BigDecimal userMargin, @Param("userRealName") String userRealName, @Param("userIdentification") String userIdentification, @Param("userTelPhone") String userTelPhone);

    /**
     * @return int
     * @author ZouCha
     * @date 2021-03-07 17:41:31
     * @method changeMargin
     * @params [userId, changeMargin]
     **/
    int changeMargin(@Param("userId") String userId, @Param("changeMargin") BigDecimal changeMargin);

    /**
     * @return java.util.Map<java.lang.String, java.lang.Object>
     * @author zoucha
     * @date 2021-01-20 15:14:33
     * @method selectUserAuthenticationInfo
     * @params [userId]
     **/
    Map<String, Object> selectUserAuthenticationInfo(@Param("userId") String userId);

    /**
     * @return int
     * @author user
     * @date 2021-03-23 14:53:00
     * @method updateLoginTime
     * @params [userId]
     **/
    int updateLoginTime(@Param("userId") String userId);
}
