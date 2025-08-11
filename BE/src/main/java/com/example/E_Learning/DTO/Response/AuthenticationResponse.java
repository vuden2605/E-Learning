package com.example.E_Learning.DTO.Response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponse {
	private String accessToken;
	private String refreshToken;
	boolean isAuthenticated;
}
