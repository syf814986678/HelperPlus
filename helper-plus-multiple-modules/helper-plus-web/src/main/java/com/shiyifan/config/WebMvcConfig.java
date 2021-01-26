package com.shiyifan.config;


import com.shiyifan.interceptor.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author ZouCha
 * @name MyWebMvcConfig
 * @date 2020-11-20 14:56:38
 **/
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private JwtInterceptor jwtInterceptor;



    /**
     * @return void
     * @author ZouCha
     * @date 2020-11-20 15:04:13
     * @method addInterceptors
     * @params [registry]
     **/
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/admin/**");
//                .addPathPatterns("/blog/admin/**")
//                .addPathPatterns("/category/admin/**")
//                .addPathPatterns("/upload/admin/**");
//        registry.addInterceptor(testInterceptor).addPathPatterns("/admin/**");
    }
}
