package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String description;
	private String category;
	private String thumbnailUrl;
	private Integer studentCount;
	private BigDecimal price;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Boolean isActive;
	private Boolean isApproved;
	@OneToOne
	@JoinColumn(name = "instructor_id")
	private InstructorInfo instructor;
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Lesson> lessons;
}
