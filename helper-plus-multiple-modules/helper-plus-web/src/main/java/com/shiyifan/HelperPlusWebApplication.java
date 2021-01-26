package com.shiyifan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

/**
 * @author ZouCha
 * @name HelperPlusWebApplication
 * @date 2021-01-07 14:04
 **/
@SpringBootApplication
@EnableRetry
public class HelperPlusWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelperPlusWebApplication.class, args);
    }
}
