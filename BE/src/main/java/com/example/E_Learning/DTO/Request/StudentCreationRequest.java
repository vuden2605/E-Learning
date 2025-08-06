package com.example.E_Learning.DTO.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentCreationRequest {
	@NotBlank(message = "REQUIRED_FIRST_NAME")
	private String firstName;
	@NotBlank(message = "REQUIRED_LAST_NAME")
	private String lastName;
	@Email (message = "INVALID_EMAIL")
	private String email;
	@Size (min = 6, message = "INVALID_PASSWORD")
	private String password;
	private final String role ="STUDENT";
}
