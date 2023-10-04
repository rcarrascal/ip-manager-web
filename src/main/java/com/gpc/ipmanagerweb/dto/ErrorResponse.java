package com.gpc.ipmanagerweb.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ErrorResponse{

    private String status;
    private String message;

    public ErrorResponse(String status, String message) {
        super();
        this.message = message;
        this.status = status;
    }
}