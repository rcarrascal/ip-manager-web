package com.gpc.ipmanagerweb.dto;

import lombok.Data;

@Data
public class MessageDto {

    private int sequence;
    private String message;
    private String level;
    private String url;
}
