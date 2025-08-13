package com.example.E_Learning.DTO.Response;

import com.example.E_Learning.Entity.Course;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LessonResponse {
	private Long id;
	private String title;
	private Integer lessonNumber;
}
