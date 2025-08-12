package com.example.E_Learning.DTO.Response;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CategoryResponse {
	@NotBlank (message = "REQUIRED_NAME")
	private String name;
	@NotBlank (message = "REQUIRED_DESCRIPTION")
	private String description;
}
