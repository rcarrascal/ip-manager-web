/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gpc.ipmanagerweb.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 *
 * @author haneira
 */
@Data
@AllArgsConstructor
@Builder(toBuilder = true)
public class LoginRequest {

    private String username;
    private String password;

}
