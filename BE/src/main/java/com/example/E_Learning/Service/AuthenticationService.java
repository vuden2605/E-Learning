package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.LoginRequest;
import com.example.E_Learning.DTO.Response.AuthenticationResponse;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	public AuthenticationResponse login (LoginRequest loginRequest) {
		User user = userRepository.findByEmail(loginRequest.getEmail())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
		if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			throw new AppException(ErrorCode.INVALID_CREDENTIALS);
		}
		return AuthenticationResponse.builder()
				.accessToken(jwtService.generateAccessToken(user))
				.refreshToken(jwtService.generateRefreshToken(user))
				.isAuthenticated(true)
				.build();
	}
}
