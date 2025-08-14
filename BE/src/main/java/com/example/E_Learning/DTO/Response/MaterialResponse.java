package com.example.E_Learning.DTO.Response;

import com.example.E_Learning.Entity.Lesson;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class MaterialResponse {
	private Long id;
	private String title;
	private String description;
	private String type;
	private String url;
	private Integer orderIndex;
	private Integer durationInSeconds;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
