package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
	private String email;
	private String password;
	@Builder.Default
	private String role = "USER";
	@Builder.Default
	private Boolean active = true;
	@Builder.Default
	private LocalDateTime createdAt = LocalDateTime.now();
}
