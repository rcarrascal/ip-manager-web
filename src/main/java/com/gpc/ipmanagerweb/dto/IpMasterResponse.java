package com.gpc.ipmanagerweb.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class IpMasterResponse {

    private Long id;

    private String ipAddress;

    private String message;

    private String color;

    private String group;

    private String user;

    private String state;

}
