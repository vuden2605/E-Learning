package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.MoMoPaymentRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.AuthenticationResponse;
import com.example.E_Learning.Service.MomoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/momo")
@Slf4j
public class MomoController {
	private final MomoService momoService;
	@PostMapping("/checkout")
	public ApiResponse<String> checkout(@RequestBody(required = false) MoMoPaymentRequest moMoPaymentRequest) throws Exception {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			long userId = Long.parseLong(authentication.getName());
			return ApiResponse.<String>builder()
					.result(momoService.createPayment(moMoPaymentRequest,userId))
					.build();
		}
		catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
	@PostMapping("/notify")
	public ApiResponse<String> handleMomoNotify(@RequestBody Map<String,Object> payload) {
		log.info("payload");
		payload.forEach((key,value)-> log.info("{}:{}",key,value));
		return ApiResponse.<String>builder()
				.result(momoService.handleMomoNotify(payload))
				.build();
	}
}
