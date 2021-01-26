package com.shiyifan.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.HashMap;

/**
 * @author ZouCha
 * @name DruidConfig
 * @date 2020-12-01 15:10:54
 **/
@Configuration
public class DruidConfig {
    /**
     * @return javax.sql.DataSource
     * @author ZouCha
     * @date 2020-12-01 15:11:07
     * @method druidDatasource
     * @params []
     **/
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druidDatasource() {
        return new DruidDataSource();
    }

    /**
     * @return org.springframework.boot.web.servlet.ServletRegistrationBean
     * @author ZouCha
     * @date 2020-11-20 15:02:11
     * @method statViewServlet
     * @params []
     **/
    @Bean
    public ServletRegistrationBean statViewServlet() {
        ServletRegistrationBean<StatViewServlet> bean = new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");
        //登录后台账号密码
        HashMap<String, String> initParameters = new HashMap<>();
        //固定格式
        initParameters.put("loginUsername", "admin");
        initParameters.put("loginPassword", "Syf1998.");
        //允许谁可以访问
        initParameters.put("allow", "");
        bean.setInitParameters(initParameters);
        return bean;
    }
}
