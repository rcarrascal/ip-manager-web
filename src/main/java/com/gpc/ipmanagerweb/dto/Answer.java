/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.dto;

import lombok.Data;


/**
 * @author haneira
 */
@Data
public class Answer {
    private String message;
    private boolean success;
    private String token;
    private String user;
}
