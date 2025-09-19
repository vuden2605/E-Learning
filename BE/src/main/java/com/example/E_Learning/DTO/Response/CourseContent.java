package com.example.E_Learning.DTO.Response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CourseContent {
	private String title;
	private List<LessonResponse> lessons;
}
