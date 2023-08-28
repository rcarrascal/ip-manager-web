package com.gpc.ipmanagerweb.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class IpManagerResponse<T> {
    private String message;
    private T response;
}
