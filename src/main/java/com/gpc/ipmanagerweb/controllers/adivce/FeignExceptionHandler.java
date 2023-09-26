package com.gpc.ipmanagerweb.controllers.adivce;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gpc.ipmanagerweb.dto.ErrorResponse;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@ControllerAdvice
public class FeignExceptionHandler {

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<ErrorResponse> handleFeignException(FeignException ex) {

        log.error("Error en la solicitud a otro servicio: {}" , ex.getLocalizedMessage());
        final ErrorResponse errorResponse = new ErrorResponse(String.valueOf(ex.status()), extractCustomErrorMessage(ex.getLocalizedMessage()));
        return ResponseEntity.status(ex.status()).body(errorResponse);
    }

    private String extractCustomErrorMessage(String errorMessage) {
        Pattern pattern = Pattern.compile("\"message\":\"([^\"]+)\"");
        Matcher matcher = pattern.matcher(errorMessage);
        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return "Error: Comunícate con soporte";
        }
    }
}
