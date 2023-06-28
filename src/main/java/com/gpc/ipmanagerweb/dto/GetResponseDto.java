/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gpc.ipmanagerweb.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.Map;


/**
 * @author dacardenas
 */
@Data
@Builder(toBuilder = true)
public class GetResponseDto {
    private HttpStatus status;

    private Map<String, Object> message;
}
