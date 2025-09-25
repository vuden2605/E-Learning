package com.example.E_Learning.DTO.Response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
	private Long id;
	private String content;
	private LocalDateTime sentAt;
	private UserResponse userResponse;
	private Long materialId;
	private List<MessageResponse> replies;
	private Long parentId;
}
