package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.BlogCreationRequest;
import com.example.E_Learning.DTO.Request.BlogFilterRequest;
import com.example.E_Learning.DTO.Request.PageCustomRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.BlogResponse;
import com.example.E_Learning.Service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/blog")
public class BlogController {
	private final BlogService blogService;
	@PostMapping
	@PreAuthorize("hasRole('INSTRUCTOR')")
	public ApiResponse<BlogResponse> createBlog(@RequestBody @Valid BlogCreationRequest blogCreationRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long instructorId = Long.parseLong(authentication.getName());
		return ApiResponse.<BlogResponse>builder()
				.result(blogService.createBlog(blogCreationRequest, instructorId))
				.build();
	}
	@GetMapping
	public ApiResponse<Page<BlogResponse>> getAllBlogs(PageCustomRequest pageRequest, BlogFilterRequest blogFilterRequest) {
		return ApiResponse.<Page<BlogResponse>>builder()
				.result(blogService.getAllBlogs(pageRequest, blogFilterRequest))
				.build();
	}
	@GetMapping("/{blogId}")
	public ApiResponse<BlogResponse> getBlogById(@PathVariable Long blogId) {
		return ApiResponse.<BlogResponse>builder()
				.result(blogService.getBlogById(blogId))
				.build();
	}
}
