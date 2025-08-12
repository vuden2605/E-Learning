package com.example.E_Learning.DTO.Request;

import com.example.E_Learning.Entity.Category;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class CourseCreationRequest {
	@NotBlank(message = "REQUIRED_COURSE_TITLE")
	private String title;
	@NotBlank (message = "REQUIRED_COURSE_DESCRIPTION")
	private String description;
	@NotNull (message = "REQUIRED_COURSE_CATEGORY")
	private Long categoryId;
	@NotBlank  (message = "REQUIRED_COURSE_THUMBNAIL_URL")
	private String thumbnailUrl;
	@NotNull (message = "REQUIRED_COURSE_PRICE")
	private BigDecimal price;
}
