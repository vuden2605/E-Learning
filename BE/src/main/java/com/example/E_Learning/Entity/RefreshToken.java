package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table (name = "refresh_tokens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "user_id")
	private User user;
	private String token;
}
