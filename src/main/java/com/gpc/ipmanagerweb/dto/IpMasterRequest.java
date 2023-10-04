package com.gpc.ipmanagerweb.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@ToString
public class IpMasterRequest {

    private Long id;

    private String ipAddress;

    private String name;

    private String color;

    private String user;

    private String group;

}
