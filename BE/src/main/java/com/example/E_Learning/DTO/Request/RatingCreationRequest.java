package com.example.E_Learning.DTO.Request;

import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingCreationRequest {
	private Long userId;
	private Integer rate;
	private String comment;
}
