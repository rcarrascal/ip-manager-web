package com.gpc.ipmanagerweb.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
public class IpMasterException extends RuntimeException  implements Serializable {
    private static final long serialVersionUID = 1L;

    HttpStatus status;

    public IpMasterException(final String message, final HttpStatus status) {
        super(message);
        this.status = status;
    }
}
