/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.dto;

import lombok.Data;

/**
 * @author wspereira
 */
@Data
public class AuthenticationRequest {

    private String username;
    private String password;

    private String captchaResponse;
}
