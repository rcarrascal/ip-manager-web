package com.gpc.ipmanagerweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class IpManagerWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(IpManagerWebApplication.class, args);
	}

}
