/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.controllers;

import com.gpc.ipmanagerweb.dto.Answer;
import com.gpc.ipmanagerweb.dto.AuthenticationRequest;
import com.gpc.ipmanagerweb.dto.IpManagerResponse;
import com.gpc.ipmanagerweb.exceptions.IpMasterException;
import com.gpc.ipmanagerweb.mappers.IpMasterMapper;
import com.gpc.ipmanagerweb.service.CaptchaValidator;
import com.gpc.ipmanagerweb.service.client.LoginClient;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



/**
 * @author wspereira
 */
@Slf4j
@RestController
@RequestMapping(value = "auth")
public class LoginController {

    @Autowired
    private LoginClient loginClient;

    @Autowired
    private CaptchaValidator capchaValidator;

    private final IpMasterMapper mapper = Mappers.getMapper(IpMasterMapper.class);

    @Value("${google.recaptcha.enabled}")
    private boolean recaptchaEnabled;

    @PostMapping(path = "/login")
    public IpManagerResponse<Answer> doLogin(final @RequestBody AuthenticationRequest user) {
        log.info("Iniciando sesión. usuario={}", user.getUsername());
        if (recaptchaEnabled) {
            Boolean capcha = capchaValidator.validateCaptcha(user.getCaptchaResponse());
            if (!capcha) {
                throw new IpMasterException("Comportamiento sospechoso detectado. Por favor, inténtelo de nuevo más tarde",
                        HttpStatus.NOT_ACCEPTABLE);
            }
        }
        IpManagerResponse<Answer> response=loginClient.doLogin(mapper.toLoginRequest(user));
        log.info("Respuesta " + response.getResponse());
        return response;
    }

    @GetMapping("/logout/{username}")
    public String logout(final @PathVariable("username") String username) {
        loginClient.logout(username);
        return "0";
    }
}
