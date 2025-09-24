package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.RatingCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.RatingResponse;
import com.example.E_Learning.Service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rating")
public class RatingController {
	private final RatingService ratingService;
	@PostMapping("/course/{courseId}")
	public ApiResponse<RatingResponse> rateCourse (@PathVariable Long courseId, @RequestBody RatingCreationRequest ratingCreationRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<RatingResponse>builder()
				.result(ratingService.rateCourse(userId, courseId, ratingCreationRequest))
				.build();
	}
	@GetMapping("/exists/course/{courseId}")
	public ApiResponse<Boolean> existsByUserIdAndCourseId(@PathVariable Long courseId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<Boolean>builder()
				.result(ratingService.isExistByUserIdAndCourseId(userId, courseId))
				.build();
	}
}
