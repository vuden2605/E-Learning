package com.example.E_Learning.DTO.Request;

import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingCreationRequest {
	private Long userId;
	private Long courseId;
	private int rating;
	private String comment;
}
