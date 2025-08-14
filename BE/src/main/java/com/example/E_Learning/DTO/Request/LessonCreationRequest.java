package com.example.E_Learning.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LessonCreationRequest {
	@NotBlank (message = "REQUIRED_LESSON_TITLE")
	private String title;
	@NotNull ( message = "REQUIRED_LESSON_NUMBER")
	private Integer lessonNumber;
}
