package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length=100, nullable = false)
	private String name;
	@Column(length=255)
	private String description;
	private String thumbnailUrl;
}
