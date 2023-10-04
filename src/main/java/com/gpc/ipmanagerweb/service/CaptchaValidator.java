/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.service;

/**
 *
 * @author dacardenas
 */
public interface CaptchaValidator {

    /**
     * Metodo encargado de validar capcha
     * @param capcha
     * @return
     */
    boolean validateCaptcha(String capcha);

}
