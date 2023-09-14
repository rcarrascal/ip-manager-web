package com.gpc.ipmanagerweb.config;

import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Bean
    public ErrorViewResolver supportPathBasedLocationStrategyWithoutHashes() {
        return (HttpServletRequest request, HttpStatus status, Map<String, Object> model) -> status == HttpStatus.NOT_FOUND
                ? new ModelAndView("index.html", Collections.<String, Object>emptyMap(), HttpStatus.OK)
                : null;
    }

}