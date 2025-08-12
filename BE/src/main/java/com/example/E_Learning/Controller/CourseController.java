package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.Service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/course")
public class CourseController {
	private final CourseService courseService;
	@PostMapping("/create")
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
	public ApiResponse<CourseResponse> createCourse(@RequestBody @Valid CourseCreationRequest courseCreationRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long instructorId = Long.parseLong(authentication.getName());
		return ApiResponse.<CourseResponse>builder()
				.result(courseService.createCourse(courseCreationRequest, instructorId))
				.build();
	}
}
