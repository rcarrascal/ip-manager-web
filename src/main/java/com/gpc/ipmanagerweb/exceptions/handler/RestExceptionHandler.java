package com.gpc.ipmanagerweb.exceptions.handler;


import com.gpc.ipmanagerweb.exceptions.IpMasterException;
import com.gpc.ipmanagerweb.models.ErrorResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(IpMasterException.class)
    public HttpEntity<ErrorResponse> ipMasterExceptionHandler(final IpMasterException exception) {
        final ErrorResponse response = new ErrorResponse(exception.getStatus().toString(), exception.getMessage());
        return new ResponseEntity(response, exception.getStatus());
    }
}