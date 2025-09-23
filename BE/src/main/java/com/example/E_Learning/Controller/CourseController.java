package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Request.CourseFilterRequest;
import com.example.E_Learning.DTO.Request.PageCustomRequest;
import com.example.E_Learning.DTO.Response.*;
import com.example.E_Learning.Service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.E_Learning.DTO.Response.CourseContent;
@RestController
@RequiredArgsConstructor
@RequestMapping("/course")
@Slf4j
public class CourseController {
	private final CourseService courseService;
	@PostMapping
	@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
	public ApiResponse<CourseResponse> createCourse(@RequestBody @Valid CourseCreationRequest courseCreationRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long instructorId = Long.parseLong(authentication.getName());
		return ApiResponse.<CourseResponse>builder()
				.result(courseService.createCourse(courseCreationRequest, instructorId))
				.build();
	}
	@GetMapping
	public ApiResponse<List<CourseResponse>> getAllCourses() {
		return ApiResponse.<List<CourseResponse>>builder()
				.result(courseService.getAllCourses())
				.build();
	}
	@GetMapping("/detail/{id}")
	public ApiResponse<CourseDetailResponse> getCourseDetailById(@PathVariable Long id) {
		return ApiResponse.<CourseDetailResponse>builder()
				.result(courseService.getCourseDetailById(id))
				.build();
	}
//	@GetMapping("/category/{categoryId}")
//	public ApiResponse<List<Course>> getCourseByCategory(@PathVariable Long categoryId) {
//		return ApiResponse.<List<Course>>builder()
//				.result(courseService.getCourseByCategory(categoryId))
//				.build();
//	}
	@GetMapping("/filter")
	public ApiResponse<Page<CourseResponse>> getCourses (CourseFilterRequest courseFilterRequest, PageCustomRequest pageRequest) {
		return ApiResponse.<Page<CourseResponse>>builder()
						.result(courseService.findCoursesByFilter(courseFilterRequest,pageRequest))
						.build();
	}
	@GetMapping("/instructor/me")
	@PreAuthorize("hasRole('INSTRUCTOR')")
	public ApiResponse<List<CourseResponse>> getMyInstructorCourse () {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long instructorId = Long.parseLong(authentication.getName());
		return ApiResponse.<List<CourseResponse>>builder()
				.result(courseService.myInstructorCourse(instructorId))
				.build();
	}
	@GetMapping("/search")
	public ApiResponse<List<CourseResponse>> searchCourses (@RequestParam String name) {
		return ApiResponse.<List<CourseResponse>>builder()
				.result(courseService.searchByName(name))
				.build();
	}
	@GetMapping("/{courseId}/content")
	public ApiResponse<CourseContent> getContent (@PathVariable Long courseId) {
		return ApiResponse.<CourseContent>builder()
				.result(courseService.getCourseContent(courseId))
				.build();
	}

}
