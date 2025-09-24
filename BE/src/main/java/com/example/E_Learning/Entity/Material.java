package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table (name = "materials")
public class Material {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(columnDefinition = "NVARCHAR(200)")
	private String title;
	@Column(columnDefinition = "NVARCHAR(MAX)")
	private String description;
	@Column(columnDefinition = "NVARCHAR(100)")
	private String type;
	private String url;
	private Integer orderIndex;
	private Integer durationInSeconds;
	@ManyToOne
	@JoinColumn(name = "lesson_id", nullable = false)
	private Lesson lesson;
	@CreationTimestamp
	private LocalDateTime createdAt;
	@UpdateTimestamp
	private LocalDateTime updatedAt;
}
