package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "courses")
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String description;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	private String thumbnailUrl;
	private Integer studentCount;
	private Long price;
	@Builder.Default
	private LocalDateTime createdAt = LocalDateTime.now();
	private LocalDateTime updatedAt;
	@Builder.Default
	private Boolean isActive = true;
	@Builder.Default
	private Boolean isApproved = false;
	@ManyToOne
	@JoinColumn(name = "instructor_id")
	private Instructor instructor;
}
