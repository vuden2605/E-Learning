package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "enrollments")
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
