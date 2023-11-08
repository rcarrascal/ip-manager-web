package com.gpc.ipmanagerweb.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ErrorResponse {

    private String status;
    private String message;

    public ErrorResponse(final String status, final String message) {
        super();
        this.message = message;
        this.status = status;
    }
}