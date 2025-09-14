package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.EnrollmentCreationRequest;
import com.example.E_Learning.DTO.Request.PageCustomRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.EnrollmentResponse;
import com.example.E_Learning.DTO.Response.PageResponse;
import com.example.E_Learning.Entity.Enrollment;
import com.example.E_Learning.Service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/enrollment")
public class EnrollmentController {
	private final EnrollmentService enrollmentService;
//	@PostMapping
//	public ApiResponse<EnrollmentResponse> createEnrollment (@RequestBody EnrollmentCreationRequest enrollmentCreationRequest) {
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		Long userId = Long.parseLong(authentication.getName());
//		return ApiResponse.<EnrollmentResponse>builder()
//				.result(enrollmentService.createEnrollment(enrollmentCreationRequest, userId))
//				.build();
//	}
	@GetMapping("/me")
	public ApiResponse<Page<EnrollmentResponse>> myEnrollmentCourse (PageCustomRequest pageCustomRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<Page<EnrollmentResponse>>builder()
				.result(enrollmentService.getEnrollmentByUserId(userId,pageCustomRequest))
				.build();
	}
	@GetMapping("/course/{courseId}/material/{materialId}")
	public ApiResponse<String> getCourseMaterial (@PathVariable Long courseId, @PathVariable Long materialId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<String>builder()
				.result(enrollmentService.getCourseMaterial(materialId,userId,courseId))
				.build();
	}
}
