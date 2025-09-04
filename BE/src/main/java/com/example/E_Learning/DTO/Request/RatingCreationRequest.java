package com.example.E_Learning.DTO.Request;

import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingCreationRequest {
	private Long userId;
	private Long courseId;
	private int rating;
	private String comment;
}
