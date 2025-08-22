package com.example.E_Learning.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	@NotBlank(message = "REQUIRED_EMAIL")
	private String email;
	@NotBlank(message = "REQUIRED_PASSWORD")
	private String password;
}

