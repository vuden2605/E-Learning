package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.InstructorCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.DTO.Response.InstructorResponse;
import com.example.E_Learning.Service.InstructorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/instructor")
@RequiredArgsConstructor
public class InstructorController {
	private final InstructorService instructorService;
	@PostMapping
	public ApiResponse<InstructorResponse> createInstructor(@RequestBody InstructorCreationRequest instructorCreationRequest) {
		return ApiResponse.<InstructorResponse>builder()
				.result(instructorService.createInstructor(instructorCreationRequest))
				.build();
	}
}
