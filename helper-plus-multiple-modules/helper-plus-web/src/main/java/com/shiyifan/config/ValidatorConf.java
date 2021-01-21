package com.shiyifan.config;

import org.hibernate.validator.HibernateValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 *
 * @author zou_cha
 * @name ValidatorConf
 * @date 2021-01-18 14:59:04
 *
 **/
@Configuration
public class ValidatorConf {
    @Bean
    public Validator validator() {
        ValidatorFactory validatorFactory = Validation.byProvider( HibernateValidator.class )
                .configure()
                .failFast( true )
                .buildValidatorFactory();
        return validatorFactory.getValidator();
    }
}
