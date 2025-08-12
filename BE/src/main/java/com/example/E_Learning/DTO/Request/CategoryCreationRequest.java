package com.example.E_Learning.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryCreationRequest {
    @NotBlank(message = "REQUIRED_CATEGORY_NAME")
	private String name;
	@NotBlank(message = "REQUIRED_CATEGORY_DESCRIPTION")
	private String description;
}
