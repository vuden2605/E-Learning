package com.example.E_Learning.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InstructorCreationRequest {
	private String fullName;
	private String avatarUrl;
	private String email;
	private String password;
	private String education;
	private String experience;
	private String specialization;
	private String cvUrl;
	private String schoolName;
}
