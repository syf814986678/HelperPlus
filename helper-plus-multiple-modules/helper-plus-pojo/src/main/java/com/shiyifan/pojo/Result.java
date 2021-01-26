package com.shiyifan.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author ZouCha
 * @name Result
 * @date 2020-11-30 15:43
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result implements Serializable {
    private int codeState;
    private String msg;
    private Object data;
}
