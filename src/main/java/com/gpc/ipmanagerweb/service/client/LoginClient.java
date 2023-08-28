package com.gpc.ipmanagerweb.service.client;

import com.gpc.ipmanagerweb.dto.Answer;
import com.gpc.ipmanagerweb.dto.AuthenticationRequest;
import com.gpc.ipmanagerweb.dto.IpManagerResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.concurrent.CompletableFuture;

@FeignClient(value = "ipManagerLoginService", url = "https://ip-manager-service-test.puertocartagena.com:3706/auth")
public interface LoginClient {

    @PostMapping(path = "/login")
    IpManagerResponse<Answer> doLogin(@RequestBody AuthenticationRequest user);

    @GetMapping("/logout/{username}")
    CompletableFuture<String> logout(@PathVariable("username") String username);


}
