package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.Entity.Order;
import com.example.E_Learning.Entity.OrderDetail;
import com.example.E_Learning.Service.OrderDetailService;
import com.example.E_Learning.Service.OrderService;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
	private final OrderService orderService;
	private final OrderDetailService orderDetailService;
	@PostMapping
	public ApiResponse<Order> createOrder (@RequestBody Order order) {
		return ApiResponse.<Order>builder()
				.result(orderService.createOrder(order))
				.build();
	}
	@GetMapping("/my")
	public ApiResponse<List<Order>> getUserOrder () {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long userId = Long.parseLong(authentication.getName());
		return ApiResponse.<List<Order>>builder()
				.result(orderService.getOrderByUserId(userId))
				.build();
	}
	@GetMapping("/{orderId}/details")
	public ApiResponse<List<OrderDetail>> getOrderDetail (@PathVariable Long orderId) {
		return ApiResponse.<List<OrderDetail>>builder()
				.result(orderDetailService.getByOrderId(orderId))
				.build();
	}
}
