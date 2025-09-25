package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.MaterialCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.MaterialResponse;
import com.example.E_Learning.DTO.Response.MessageResponse;
import com.example.E_Learning.Service.MaterialService;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MaterialController {
	private final MaterialService materialService;
	@PostMapping("/lesson/{lessonId}/material")
	@PreAuthorize("hasRole('INSTRUCTOR')")
	public ApiResponse<MaterialResponse> createMaterial (@RequestBody MaterialCreationRequest materialCreationRequest, @PathVariable Long lessonId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long instructorId = Long.parseLong(authentication.getName());
		return ApiResponse.<MaterialResponse>builder()
				.result(materialService.createMaterial(materialCreationRequest, lessonId, instructorId))
				.build();
	}
	@GetMapping("/lesson/{lessonId}/material")
	public ApiResponse<List<MaterialResponse>> getMaterialByLessonId (@PathVariable Long lessonId) {
		return ApiResponse.<List<MaterialResponse>>builder()
				.result(materialService.getMaterialByLessonId(lessonId))
				.build();
	}
	@GetMapping("/material/{materialId}/messages")
	public ApiResponse<List<MessageResponse>> getMessagesByMaterialId (@PathVariable Long materialId) {
		return ApiResponse.<List<MessageResponse>>builder()
				.result(materialService.getMessagesByMaterialId(materialId))
				.build();
	}

}
