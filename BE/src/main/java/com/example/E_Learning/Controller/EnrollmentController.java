package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.EnrollmentCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.EnrollmentResponse;
import com.example.E_Learning.Entity.Enrollment;
import com.example.E_Learning.Service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/enrollment")
public class EnrollmentController {
	private final EnrollmentService enrollmentService;
	@PostMapping
	public ApiResponse<EnrollmentResponse> createEnrollment (@RequestBody EnrollmentCreationRequest enrollmentCreationRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<EnrollmentResponse>builder()
				.result(enrollmentService.createEnrollment(enrollmentCreationRequest, userId))
				.build();
	}
	@GetMapping("/me")
	public ApiResponse<List<EnrollmentResponse>> myEnrollmentCourse () {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<List<EnrollmentResponse>>builder()
				.result(enrollmentService.getEnrollmentByUserId(userId))
				.build();
	}
}
