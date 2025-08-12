package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table (name = "instructors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instructor {
	@Id
	private Long id;
	@OneToOne
	@MapsId
	@JoinColumn(name = "user_id")
	private User user;
	private String education;
	private String experience;
	private String specialization;
	private String cvUrl;
	private String schoolName;
	@Builder.Default
	private Boolean isApproved = false;
}
