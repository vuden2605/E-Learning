package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
	private String email;
	private String password;
	private String role;
	@Builder.Default
	private boolean isActive = true;
	@Builder.Default
	private LocalTime createdAt = LocalTime.now();
	@OneToOne (mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private InstructorInfo instructor;
}
