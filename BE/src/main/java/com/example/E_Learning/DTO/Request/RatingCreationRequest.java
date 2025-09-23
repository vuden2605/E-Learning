package com.example.E_Learning.DTO.Request;

import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingCreationRequest {
	private Long userId;
	private int rate;
	private String comment;
}
