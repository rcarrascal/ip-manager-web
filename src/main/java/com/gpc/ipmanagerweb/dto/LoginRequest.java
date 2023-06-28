/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gpc.ipmanagerweb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 *
 * @author haneira
 */
@Data
@AllArgsConstructor
public class LoginRequest {

    private String user;
    private String password;

}
