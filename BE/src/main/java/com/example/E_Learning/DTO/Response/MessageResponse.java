package com.example.E_Learning.DTO.Response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
	private String content;
	private UserResponse userResponse;
	private Long lessonId;
}
