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
	@Column(columnDefinition = "NVARCHAR(100)")
	private String name;
	@Column(columnDefinition = "NVARCHAR(1000)")
	private String description;
	private String thumbnailUrl;
}
