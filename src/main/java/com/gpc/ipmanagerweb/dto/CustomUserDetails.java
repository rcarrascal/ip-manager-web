package com.gpc.ipmanagerweb.dto;

import lombok.Data;

@Data
public class CustomUserDetails {

    //givenName: Primer y segundo nombre
    private String firstName;
    //sn: Apellidos
    private String lastName;
    //cpmpany
    private String company;
    //employeeID: Cedula
    private long identifcationNumber;
    //mail: Correo
    private String mail;
    //sAMAcccountname: Login de usuario
    private String user;
    //Dn
    private String dn;

}
