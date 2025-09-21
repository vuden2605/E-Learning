package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.CartDetailCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.CourseDetailResponse;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.Entity.Cart;
import com.example.E_Learning.Entity.CartDetail;
import com.example.E_Learning.Service.CartDetailService;
import com.example.E_Learning.Service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
	private final CartService cartService;
	private final CartDetailService cartDetailService;
	@PostMapping
	public ApiResponse<String> createCart () {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<String>builder()
				.result(cartService.createCart(userId))
				.build();
	}
	@PostMapping("/item")
	public ApiResponse<String> addItemToCart (@RequestBody CartDetailCreationRequest cartDetailCreationRequest) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<String>builder()
				.result(cartDetailService.addToCart(userId, cartDetailCreationRequest))
				.build();
	}
	@GetMapping("/myCart")
	public ApiResponse<List<CourseDetailResponse>> myCart() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<List<CourseDetailResponse>>builder()
				.result(cartService.myCart(userId))
				.build();
	}
	@DeleteMapping("/{courseId}")
	public ApiResponse<String> removeCourseFromCart(@PathVariable Long courseId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<String>builder()
				.result(cartService.removeCourseFromCart(userId,courseId))
				.build();
	}
}
