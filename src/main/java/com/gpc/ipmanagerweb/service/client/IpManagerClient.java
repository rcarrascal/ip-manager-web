package com.gpc.ipmanagerweb.service.client;

import com.gpc.ipmanagerweb.dto.IpManagerResponse;
import com.gpc.ipmanagerweb.dto.IpMasterRequest;
import com.gpc.ipmanagerweb.dto.IpMasterResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(value = "ipManagerService", url = "${feign.client.url.ipManager}")
public interface IpManagerClient {
    @PostMapping
    IpManagerResponse<IpMasterResponse> save(@RequestHeader HttpHeaders headers, @RequestBody IpMasterRequest ipMasterRequest);

    @PutMapping
    IpManagerResponse<IpMasterResponse> update(@RequestHeader HttpHeaders headers,@RequestBody IpMasterRequest ipMasterRequest);


    @GetMapping
    IpManagerResponse<List<IpMasterResponse>> getAllIpsByUser(@RequestHeader HttpHeaders headers);

    @DeleteMapping("/{id}")
    IpManagerResponse<String> deleteAllIpsByUser(@RequestHeader HttpHeaders headers,@PathVariable(name = "id") Long id);

}
