package com.example.E_Learning.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "instructors")
@Getter
@Setter
public class Instructor {
	private String education;
	private String experience;
	private String specialization;
	private String cvUrl;
	private String schoolName;
	private Boolean isApproved;
}
