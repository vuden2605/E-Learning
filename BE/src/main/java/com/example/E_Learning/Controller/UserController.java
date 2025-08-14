package com.example.E_Learning.Controller;


import com.example.E_Learning.DTO.Request.UserCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.UserResponse;
import com.example.E_Learning.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	@PostMapping
	public ApiResponse<UserResponse> createUser (@RequestBody @Valid UserCreationRequest user) {
		return ApiResponse.<UserResponse>builder()
				.result(userService.createUser(user))
				.build();
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{id}")
	public ApiResponse<UserResponse> getUserById(@PathVariable Long id) {
		return ApiResponse.<UserResponse>builder()
				.result(userService.getUserById(id))
				.build();
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAll")
	public ApiResponse<List<UserResponse>> getAllUsers() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("Principal: {}", authentication.getDetails());

		return ApiResponse.<List<UserResponse>>builder()
				.result(userService.getAllUsers())
				.build();
	}
	@GetMapping("/profile")
	public ApiResponse<UserResponse> getProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		long userId = Long.parseLong(authentication.getName());
		log.info("User ID: {}", userId);
		return ApiResponse.<UserResponse>builder()
				.result(userService.getUserById(userId))
				.build();
	}
}
