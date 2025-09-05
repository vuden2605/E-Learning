package com.example.E_Learning.DTO.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseDetailResponse {
	private Long id;
	private String title;
	private String description;
	private String thumbnailUrl;
	private Long price;
	private Integer discountPercent;
	private Integer studentCount;
	private LocalDateTime createdAt;
	private CategoryResponse category;
	private InstructorResponse instructor;
}
