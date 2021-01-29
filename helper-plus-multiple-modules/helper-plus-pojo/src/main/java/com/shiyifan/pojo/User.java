package com.shiyifan.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author ZouCha
 * @name User
 * @date 2020-11-20 15:23:04
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    private String userId;
    @NotEmpty(message = "用户名不能为空！")
    private String userName;
    @NotEmpty(message = "用户密码不能为空！")
    private String userPassword;
    private String userPhone;
    private String userAddress;
    private String userAvatar;
    private String userRole;
    private int isDeleted;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createGmt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateGmt;
}
