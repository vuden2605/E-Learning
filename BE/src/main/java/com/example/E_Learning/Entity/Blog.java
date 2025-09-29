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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "blogs")
@ToString
public class Blog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, length = 150)
	private String title;
	@Lob
	private String content;
	@ManyToOne
	@JoinColumn(name = "instructor_id")
	private Instructor instructor;
	@Column(nullable = false)
	@CreationTimestamp
	private LocalDateTime createdAt;
	@UpdateTimestamp
	private LocalDateTime updatedAt;
	@Column(nullable = false)
	@Builder.Default
	private boolean published = false;
	@Column (nullable = false)
	private String imageUrl;
	@ManyToOne
	@JoinColumn (name = "category_id")
	private Category category;
}
