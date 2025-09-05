package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.GoogleLoginRequest;
import com.example.E_Learning.DTO.Request.LoginRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.AuthenticationResponse;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {
	private final AuthenticationService authenticationService;

	@PostMapping("/login")
	public ApiResponse<String> login(@RequestBody @Valid LoginRequest loginRequest,
			HttpServletResponse response) {
		AuthenticationResponse authResponse = authenticationService.login(loginRequest);
		String refreshToken = authResponse.getRefreshToken();
		ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
				.httpOnly(true)
				.secure(false)
				.path("/")
				.sameSite("Strict")
				.maxAge(60 * 60 * 24 * 7) // 7 days
				.build();
		response.setHeader("Set-Cookie", refreshTokenCookie.toString());
		return ApiResponse.<String>builder()
						.result(authResponse.getAccessToken())
						.build();
	}

	@PostMapping("/google")
	public ApiResponse<String> googleLogin(@RequestBody GoogleLoginRequest googleLoginRequest,
			HttpServletResponse response) {
		AuthenticationResponse authResponse = authenticationService.loginWithGoogle(googleLoginRequest);
		String refreshToken = authResponse.getRefreshToken();
		ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
				.httpOnly(true)
				.secure(false) // Set to true if using HTTPS
				.path("/auth/refresh-token")
				.sameSite("Strict")
				.maxAge(60 * 60 * 24 * 7) // 7 days
				.build();
		response.setHeader("Set-Cookie", refreshTokenCookie.toString());
		return ApiResponse.<String>builder()
						.result(authResponse.getAccessToken())
						.build();
	}
	@PostMapping("/refresh-token")
	public ApiResponse<String> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
		log.info("Received refresh token: {}", refreshToken);
		try {
			AuthenticationResponse authResponse = authenticationService.refreshAccessToken(refreshToken);
			return ApiResponse.<String>builder()
							.result(authResponse.getAccessToken())
							.build();
		} catch (Exception e) {
			return ApiResponse.<String>builder()
							.code( 500)
							.message(e.getMessage())
							.build();
		}
	}

	@PostMapping("/logout")
	public ApiResponse<String> logout(HttpServletResponse response) {
		ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
				.httpOnly(true)
				.secure(false)
				.path("/auth/refresh-token")
				.sameSite("Strict")
				.maxAge(0)
				.build();
		response.setHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<String>builder()
				.result(authenticationService.logout(userId))
				.build();
	}
}