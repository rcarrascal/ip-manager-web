/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.controllers;

import com.gpc.ipmanagerweb.dto.Answer;
import com.gpc.ipmanagerweb.dto.AuthenticationRequest;
import com.gpc.ipmanagerweb.dto.IpManagerResponse;
import com.gpc.ipmanagerweb.mappers.IpMasterMapper;
import com.gpc.ipmanagerweb.service.CaptchaValidator;
import com.gpc.ipmanagerweb.service.client.LoginClient;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;


/**
 * @author dacaradenas
 */
@Slf4j
@RestController
@RequestMapping("/config")
public class LoadConfigController {
    @Value("${google.recaptcha.siteKey}")
    private String siteKey;

    @GetMapping("/external_siteKey")
    public String getSiteKey() {
        return siteKey;
    }
}
