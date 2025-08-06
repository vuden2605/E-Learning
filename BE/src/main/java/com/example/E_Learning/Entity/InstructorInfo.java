package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table (name = "instructor_infos")
@Getter
@Setter
@Builder
public class InstructorInfo {
	@Id
	private Long id;
	@OneToOne
	@MapsId
	@JoinColumn(name = "user_id")
	private User userId;
	private String education;
	private String experience;
	private String specialization;
	private String cvUrl;
	private String schoolName;
	@Builder.Default
	private Boolean isApproved = false;
	@OneToMany (mappedBy = "instructor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Course>  courses;

}
