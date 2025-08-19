package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.Entity.Enrollment;
import com.example.E_Learning.Service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/enrollment")
public class EnrollmentController {
	private final EnrollmentService enrollmentService;
	@PostMapping
	public ApiResponse<Enrollment> createEnrollment (@RequestBody Enrollment enrollment) {
		return ApiResponse.<Enrollment>builder()
				.result(enrollmentService.createEnrollment(enrollment))
				.build();
	}
}
