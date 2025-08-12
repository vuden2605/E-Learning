package com.example.E_Learning.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class InstructorResponse {
	private UserResponse user;
	private String education;
	private String experience;
	private String specialization;
	private String cvUrl;
	private String schoolName;
}
