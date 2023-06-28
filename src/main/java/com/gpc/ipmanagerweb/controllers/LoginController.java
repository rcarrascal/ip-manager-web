/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.controllers;

import com.gpc.ipmanagerweb.dto.AuthenticationRequest;
import com.gpc.ipmanagerweb.service.client.LoginClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping(path = "/login")
    public ResponseEntity doLogin(@RequestBody AuthenticationRequest user) {
        log.info("Iniciando sesión. usuario={}", user.getUsername());
        return loginClient.doLogin(user);
    }

    @GetMapping("/logout/{username}")
    public String logout(@PathVariable("username") String username) {
        loginClient.logout(username);
        return "0";
    }
}
