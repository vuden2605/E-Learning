package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
public class Lesson {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String videoUrl;
	private Integer lessonNumber;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Boolean isActive;
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	@OneToMany (mappedBy = "lesson", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Document> documents;
}
