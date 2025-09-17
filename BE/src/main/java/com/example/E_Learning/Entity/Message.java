package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "lesson_id")
	private Lesson lesson;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@Column(columnDefinition = "NVARCHAR(MAX)")
	private String content;
	@CreationTimestamp
	private LocalDateTime created_at;
}
