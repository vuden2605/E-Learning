package com.example.E_Learning.DTO.Response;

import com.example.E_Learning.Entity.Category;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
//@JsonInclude (JsonInclude.Include.NON_NULL)
public class CourseResponse {
	private Long id;
	private String title;
	private String description;
	private String thumbnailUrl;
	private Long discountPercent;
	private BigDecimal price;
	private LocalDateTime createdAt;
	private Integer studentCount;
	private Double averageRating;
	private Long totalRatings;
}
