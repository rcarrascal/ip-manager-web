/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.service.impl;

import com.gpc.ipmanagerweb.dto.CaptchaResponse;
import com.gpc.ipmanagerweb.dto.LoginRequest;
import com.gpc.ipmanagerweb.service.CaptchaValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Slf4j
@Service
public class CaptchaValidatorImpl implements CaptchaValidator {

    @Value("${google.recaptcha.endpoint}")
    private String recaptchaEndpoint;

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;
    
    @Value("${google.recaptcha.score}")
    private float score;

    @Override
    public boolean validateCaptcha(String captcha) {
        RestTemplate restTemplate = new RestTemplate();
        log.info("Secret="+recaptchaSecret+" Response="+captcha);
        MultiValueMap<String, String> requestMap = new LinkedMultiValueMap<>();
        requestMap.add("secret", recaptchaSecret);
        requestMap.add("response", captcha);

        Optional<CaptchaResponse> apiResponse = Optional.ofNullable(restTemplate.postForObject(recaptchaEndpoint, requestMap, CaptchaResponse.class));
        if (!apiResponse.isPresent()) {
            return false;
        }
        CaptchaResponse captchaResponse = apiResponse.get();
        LoginRequest loginRequest = LoginRequest.builder().build();
        log.info("Capcha response: "+captchaResponse);

        return ((captchaResponse.getSuccess()) && (captchaResponse.getScore() > score));
    }

}
