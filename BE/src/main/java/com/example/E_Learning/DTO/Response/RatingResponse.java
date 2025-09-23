package com.example.E_Learning.DTO.Response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingResponse {
	private UserResponse user;
	private Integer rate;
	private String comment;
	private LocalDateTime createdAt;
}
