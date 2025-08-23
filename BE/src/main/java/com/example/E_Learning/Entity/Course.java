package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;
	private String thumbnailUrl;
	private Integer studentCount;
	private Long price;
	private Integer rating;
	@CreationTimestamp
	private LocalDateTime createdAt;
	@UpdateTimestamp
	private LocalDateTime updatedAt;
	@Builder.Default
	private Boolean isActive = true;
	@Builder.Default
	private Boolean isApproved = false;
	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "instructor_id")
	private Instructor instructor;
}
