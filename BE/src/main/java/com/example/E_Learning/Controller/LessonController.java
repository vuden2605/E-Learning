package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.LessonCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.LessonResponse;
import com.example.E_Learning.Entity.Lesson;
import com.example.E_Learning.Service.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/course/{courseId}/lesson")
public class LessonController {
	private final LessonService lessonService;
	@PostMapping
	@PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
	public ApiResponse<LessonResponse> createLesson(@RequestBody @Valid LessonCreationRequest lessonCreationRequest,
													@PathVariable Long courseId) {
		return ApiResponse.<LessonResponse>builder()
				.result(lessonService.createLesson(lessonCreationRequest, courseId))
				.build();
	}
	@GetMapping
	public ApiResponse<List<LessonResponse>> getLessonsByCourseId (@PathVariable Long courseId) {
		return ApiResponse.<List<LessonResponse>>builder()
				.result(lessonService.getLessonByCourseId(courseId))
				.build();
	}

}
