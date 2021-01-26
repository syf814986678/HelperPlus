package com.shiyifan.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author ZouCha
 * @name MyElasticsearchConfig
 * @date 2020-11-20 14:52:11
 **/
@Configuration
public class ElasticsearchConfig {
    @Value("${elasticsearch.host}")
    private String host;

    @Value("${elasticsearch.port}")
    private int port;

    /**
     * @return org.elasticsearch.client.RestHighLevelClient
     * @author ZouCha
     * @date 2020-11-20 15:02:18
     * @method restHighLevelClient
     * @params []
     **/
    @Bean
    public RestHighLevelClient restHighLevelClient() {
        // 构建客户端对象
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(
                        new HttpHost(host, port, "http")));
        return client;
    }

}
