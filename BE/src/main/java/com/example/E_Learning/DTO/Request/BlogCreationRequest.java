package com.example.E_Learning.DTO.Request;

import com.example.E_Learning.Entity.Category;
import com.example.E_Learning.Entity.Instructor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogCreationRequest {
	@NotBlank(message = "REQUIRED_BLOG_TITLE")
	private String title;
	@NotBlank(message = "REQUIRED_BLOG_CONTENT")
	private String content;
	@NotBlank(message = "REQUIRED_BLOG_IMAGE_URL")
	private String imageUrl;
	@NotNull(message = "REQUIRED_BLOG_CATEGORY")
	private Long categoryId;
}
