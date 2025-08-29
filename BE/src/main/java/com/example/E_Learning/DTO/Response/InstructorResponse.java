package com.example.E_Learning.DTO.Response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InstructorResponse {
	private UserResponse user;
	private String education;
	private String experience;
	private String specialization;
	private String cvUrl;
	private String schoolName;
}
