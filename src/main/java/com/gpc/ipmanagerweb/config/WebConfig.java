package com.gpc.ipmanagerweb.config;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 *
 * @author racarrascal
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/acceso").setViewName("forward:/acceso/index.html");
        registry.addViewController("/estadosalud").setViewName("forward:/estadosalud/index.html");
        registry.addViewController("/acceso/").setViewName("forward:/acceso/index.html");
        registry.addViewController("/estadosalud/").setViewName("forward:/estadosalud/index.html");
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();

    }
}
