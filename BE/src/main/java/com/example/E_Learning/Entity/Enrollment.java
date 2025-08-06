package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
public class Enrollment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDateTime enrolledAt;
	@ManyToOne
	@JoinColumn(name = "student_id")
	private User student;
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
}
