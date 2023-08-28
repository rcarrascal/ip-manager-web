package com.gpc.ipmanagerweb.controllers;


import com.gpc.ipmanagerweb.dto.IpMasterRequest;
import com.gpc.ipmanagerweb.service.client.IpManagerClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("ip_master")
public class IpMasterController {

    private final IpManagerClient ipManagerClient;

    public IpMasterController(IpManagerClient ipManagerClient) {
        this.ipManagerClient = ipManagerClient;
    }

    @PostMapping
    public ResponseEntity save(@RequestBody IpMasterRequest ipMasterRequest) {
        HttpServletRequest httpRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return ipManagerClient.save(getHeaders(httpRequest),ipMasterRequest);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody IpMasterRequest ipMasterRequest) {
        HttpServletRequest httpRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return ipManagerClient.update(getHeaders(httpRequest), ipMasterRequest);
    }

    @GetMapping
    public ResponseEntity getAllIpsByUser(){
        HttpServletRequest httpRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return ipManagerClient.getAllIpsByUser(getHeaders(httpRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAllIpsByUser(@PathVariable(name = "id") Long id) {
        HttpServletRequest httpRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return ipManagerClient.deleteAllIpsByUser(getHeaders(httpRequest),id);
    }

    private HttpHeaders getHeaders(final HttpServletRequest httpServletRequest) {
        final HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", httpServletRequest.getHeader("Authorization"));
        return headers;
    }
}