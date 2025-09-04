package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.RatingCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.Service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rating")
public class RatingController {
	private final RatingService ratingService;
	@PostMapping
	public ApiResponse<String> rateCourse (@RequestBody RatingCreationRequest ratingCreationRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<String>builder()
				.result(ratingService.rateCourse(userId, ratingCreationRequest))
				.build();
	}
}
