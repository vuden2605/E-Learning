package com.example.E_Learning.DTO.Response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnrollmentResponse {
	private Long id;
	private LocalDateTime enrolledAt;
	private Long userId;
	private CourseResponse courseResponse;
}