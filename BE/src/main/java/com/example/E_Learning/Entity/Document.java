package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "documents")
public class Document {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String fileUrl;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Boolean isActive;
	@ManyToOne
	@JoinColumn(name = "lesson_id")
	private Lesson lesson;
}
