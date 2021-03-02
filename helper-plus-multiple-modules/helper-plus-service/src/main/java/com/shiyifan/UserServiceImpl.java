package com.shiyifan;

import com.shiyifan.mapper.UserMapper;
import com.shiyifan.pojo.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * @author zou_cha
 * @name UserServiceImpl
 * @date 2021-01-18 13:02:42
 **/
@Service
@Log4j2
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean register(User user) throws Exception {
        try {
            String userId = UUID.randomUUID().toString().replaceAll("-", "");
            user.setUserId(userId);
            user.setUserPassword(Md5Util.getMd5Str(user.getUserPassword()));
            user.setUserRole("ROLE_normal");
            if (userMapper.register(user) == 1 && userMapper.registerAuthentication(UUID.randomUUID().toString().replaceAll("-", ""), userId) == 1) {
                return true;
            }
        } catch (Exception e) {
            log.error("UserServiceImpl.register失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("UserServiceImpl.register失败，" + e);
        }
        return false;
    }

    @Override
    public Boolean registerByUserId(String userId) throws Exception {
        try {
            User user = new User();
            user.setUserId(userId);
            user.setUserRole("ROLE_normal");
            if (userMapper.register(user) == 1 && userMapper.registerAuthentication(UUID.randomUUID().toString().replaceAll("-", ""), userId) == 1) {
                return true;
            }
        } catch (Exception e) {
            log.error("UserServiceImpl.register失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("UserServiceImpl.register失败，" + e);
        }
        return false;
    }

    @Override
    public User login(String username, String password) throws Exception {
        User user = null;
        try {
            user = userMapper.login(username, Md5Util.getMd5Str(password));
            return user;
        } catch (Exception e) {
            log.error("UserServiceImpl.login失败，" + e);
            throw new Exception("UserServiceImpl.login失败，" + e);
        }
    }

    @Override
    public User loginByUserId(String userId) throws Exception {
        User user = null;
        try {
            user = userMapper.loginByUserId(userId);
            return user;
        } catch (Exception e) {
            log.error("UserServiceImpl.login失败，" + e);
            throw new Exception("UserServiceImpl.login失败，" + e);
        }
    }

    @Override
    public Map<String, Object> selectUserAuthenticationInfo(String userId) throws Exception {
        try {
            return userMapper.selectUserAuthenticationInfo(userId);
        } catch (Exception e) {
            log.error("UserServiceImpl.selectUserAuthenticationInfo失败，" + e);
            throw new Exception("UserServiceImpl.selectUserAuthenticationInfo失败，" + e);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean certificate(String userId, String userMargin, String useRealName, String userIdentification) throws Exception {
        try {
            Map<String, Object> authenticationInfo = userMapper.selectUserAuthenticationInfo(userId);
            return userMapper.certificate(authenticationInfo.get("userAuthenticationId").toString(), userId,new BigDecimal(Integer.parseInt(Optional.ofNullable(userMargin).orElse("0"))) , useRealName, userIdentification) == 1;
        } catch (Exception e) {
            log.error("UserServiceImpl.certificate失败，" + e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new Exception("UserServiceImpl.certificate失败，" + e);
        }
    }
}
