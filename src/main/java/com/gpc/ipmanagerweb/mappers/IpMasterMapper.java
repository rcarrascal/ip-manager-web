package com.gpc.ipmanagerweb.mappers;

import com.gpc.ipmanagerweb.dto.AuthenticationRequest;
import com.gpc.ipmanagerweb.dto.LoginRequest;
import org.mapstruct.Mapper;

@Mapper
@SuppressWarnings("all")
public interface IpMasterMapper {

    LoginRequest toLoginRequest(final AuthenticationRequest ipMaster);
}
