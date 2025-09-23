package com.example.E_Learning.DTO.Response;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CategoryResponse {
	private Long id;
	private String name;
	private String description;
	private String thumbnailUrl;
}
