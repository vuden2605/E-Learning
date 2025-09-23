package com.example.E_Learning.DTO.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude (JsonInclude.Include.NON_NULL)
public class CourseResponse {
	private Long id;
	private String title;
	private String description;
	private String thumbnailUrl;
	private Long discountPercent;
	private BigDecimal price;
	private Double averageRating;
	private Long totalRatings;
	private LocalDateTime createdAt;
	private Integer studentCount;
	@Builder.Default
	private Boolean isPurchased = false;
}
