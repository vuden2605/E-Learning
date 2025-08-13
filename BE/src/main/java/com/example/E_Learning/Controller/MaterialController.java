package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.MaterialCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.MaterialResponse;
import com.example.E_Learning.Service.MaterialService;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/material")
public class MaterialController {
	private final MaterialService materialService;
	@PostMapping("/lesson/{lessonId}")
	@PreAuthorize("hasRole('INSTRUCTOR")
	public ApiResponse<MaterialResponse> createMaterial (MaterialCreationRequest materialCreationRequest, Long lessonId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long instructorId = Long.parseLong(authentication.getName());
		return ApiResponse.<MaterialResponse>builder()
				.result(materialService.createMaterial(materialCreationRequest, lessonId, instructorId))
				.build();
	}
}
