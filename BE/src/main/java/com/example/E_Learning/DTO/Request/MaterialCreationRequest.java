package com.example.E_Learning.DTO.Request;

import com.example.E_Learning.Entity.Lesson;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
public class MaterialCreationRequest {
	private String title;
	private String description;
	private String type;
	private String url;
	private Integer orderIndex;
}
