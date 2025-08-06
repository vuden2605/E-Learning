package com.example.E_Learning.DTO.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstructorCreationRequest {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private final String role ="INSTRUCTOR";
	private String education;
	private String experience;
	private String specialization;
	private String cvUrl;
	private String schoolName;
}
