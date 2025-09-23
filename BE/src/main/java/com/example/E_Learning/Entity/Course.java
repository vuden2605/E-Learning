package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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
	@Column(columnDefinition = "NVARCHAR(MAX)")
	private String title;
	@Column(columnDefinition = "NVARCHAR(MAX)")
	private String description;
	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;
	private String thumbnailUrl;
	@Builder.Default
	private Integer studentCount = 0;
	private Long discountPercent;
	private Long price;
	@Builder.Default
	private Double averageRating = 0.0;
	@Builder.Default
	private Long totalRatings = 0L;
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
	@OneToMany(mappedBy = "course")
	private Set<Lesson> lessons;
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Rating> ratings;
}
