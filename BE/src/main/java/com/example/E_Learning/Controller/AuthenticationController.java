package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.LoginRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.AuthenticationResponse;
import com.example.E_Learning.Service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {
	private final AuthenticationService authenticationService;
	@PostMapping("/login")
	public ApiResponse<AuthenticationResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
		return ApiResponse.<AuthenticationResponse>builder()
				.result(authenticationService.login(loginRequest))
				.build();

	}
}
