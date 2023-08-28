package com.gpc.ipmanagerweb.service.client;

import com.gpc.ipmanagerweb.dto.AuthenticationRequest;
import com.gpc.ipmanagerweb.dto.IpMasterRequest;
import feign.Headers;
import feign.Param;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "ipManagerService", url = "https://200.9.72.58:3706/ipMaster")
public interface IpManagerClient {
    @PostMapping
    ResponseEntity save(@RequestHeader HttpHeaders headers, @RequestBody IpMasterRequest ipMasterRequest);

    @PutMapping
    ResponseEntity update(@RequestHeader HttpHeaders headers,@RequestBody IpMasterRequest ipMasterRequest);


    @GetMapping
    ResponseEntity getAllIpsByUser(@RequestHeader HttpHeaders headers);

    @DeleteMapping("/{id}")
    ResponseEntity deleteAllIpsByUser(@RequestHeader HttpHeaders headers,@PathVariable(name = "id") Long id);

}
