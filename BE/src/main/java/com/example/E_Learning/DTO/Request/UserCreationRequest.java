package com.example.E_Learning.DTO.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreationRequest {
	@NotBlank(message = "REQUIRED_FIRST_NAME")
	private String firstName;
	@NotBlank(message = "REQUIRED_LAST_NAME")
	private String lastName;
	@Email (message = "INVALID_EMAIL")
	private String email;
	@Size (min = 6, message = "INVALID_PASSWORD")
	private String password;

}
