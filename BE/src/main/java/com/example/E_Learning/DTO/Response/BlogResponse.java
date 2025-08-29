package com.example.E_Learning.DTO.Response;
import lombok.*;
import java.time.LocalDateTime;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogResponse {
	private Long id;
	private String title;
	private String content;
	private InstructorResponse instructor;
	private CategoryResponse category;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private String imageUrl;
}
