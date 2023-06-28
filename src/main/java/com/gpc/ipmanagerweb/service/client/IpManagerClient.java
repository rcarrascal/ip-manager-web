package com.gpc.ipmanagerweb.service.client;

import com.gpc.ipmanagerweb.dto.AuthenticationRequest;
import com.gpc.ipmanagerweb.dto.IpMasterRequest;
import feign.Headers;
import feign.Param;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.concurrent.CompletableFuture;

@FeignClient(value = "ipManagerService", url = "https://200.9.72.58:3706/ipMaster")
@Headers("Authorization: {token}")
public interface IpManagerClient {

    @PostMapping
    ResponseEntity save(@Param("token") String token, @RequestBody IpMasterRequest ipMasterRequest);

    @PutMapping
    ResponseEntity update(@Param("token") String token,@RequestBody IpMasterRequest ipMasterRequest);


    @GetMapping
    ResponseEntity getAllIpsByUser(@Param("token") String token);

    @DeleteMapping("/{id}")
    ResponseEntity deleteAllIpsByUser(@Param("token") String token,@PathVariable(name = "id") Long id);

}
