package com.shiyifan.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * @author ZouCha
 * @name HttpConfig
 * @date 2021-03-02 20:04
 **/
@Configuration
@Log4j2
public class HttpConfig {
    @Bean
    public RestTemplate httpUtil() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        // 设置连接超时，单位毫秒
        requestFactory.setConnectTimeout(30000);
        //设置读取超时
        requestFactory.setReadTimeout(30000);
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(requestFactory);
        log.info("RestTemplate初始化完成");
        return restTemplate;
    }
}
