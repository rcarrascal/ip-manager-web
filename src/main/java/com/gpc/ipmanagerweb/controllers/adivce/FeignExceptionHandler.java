package com.gpc.ipmanagerweb.controllers.adivce;
import com.gpc.ipmanagerweb.dto.ErrorResponse;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class FeignExceptionHandler {

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<ErrorResponse> handleFeignException(FeignException ex) {
        log.error("Error en la solicitud a otro servicio: {}" , ex.getMessage());
        final ErrorResponse errorResponse = new ErrorResponse(String.valueOf(ex.status()), ex.getMessage());
        return ResponseEntity.status(ex.status()).body(errorResponse);
    }
}
