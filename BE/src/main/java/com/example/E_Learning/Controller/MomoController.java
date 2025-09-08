package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.MoMoPaymentRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.AuthenticationResponse;
import com.example.E_Learning.Service.MomoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/momo")
public class MomoController {
	private final MomoService momoService;
	@PostMapping("/checkout")
	public ApiResponse<String> checkout(@RequestBody MoMoPaymentRequest moMoPaymentRequest) throws Exception {
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
}
