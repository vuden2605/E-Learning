package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.CategoryCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.CategoryResponse;
import com.example.E_Learning.Service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
	private final CategoryService categoryService;
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ApiResponse<CategoryResponse> createCategory(@RequestBody @Valid CategoryCreationRequest categoryCreationRequest) {
		return ApiResponse.<CategoryResponse>builder()
				.result(categoryService.createCategory(categoryCreationRequest))
				.build();
	}
	@GetMapping
	public ApiResponse<List<CategoryResponse>> getAllCategories() {
		return ApiResponse.<List<CategoryResponse>>builder()
				.result(categoryService.getAllCategories())
				.build();
	}
}
