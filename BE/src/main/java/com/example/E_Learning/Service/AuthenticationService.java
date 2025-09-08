package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.GoogleLoginRequest;
import com.example.E_Learning.DTO.Request.LoginRequest;
import com.example.E_Learning.DTO.Response.AuthenticationResponse;
import com.example.E_Learning.Entity.RefreshToken;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final RefreshTokenService refreshTokenService;
	@Value("${google.clientId}")
	private String googleClientId;
	@Transactional
	public AuthenticationResponse login (LoginRequest loginRequest) {
		User user = userRepository.findByEmail(loginRequest.getEmail())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
		if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			throw new AppException(ErrorCode.INVALID_CREDENTIALS);
		}
		String accessToken = jwtService.generateAccessToken(user);
		String refreshToken = jwtService.generateRefreshToken(user);
		refreshTokenService.createOrUpdateToken(refreshToken, user);
		return AuthenticationResponse.builder()
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.isAuthenticated(true)
				.build();
	}
	@Transactional
	public AuthenticationResponse loginWithGoogle(GoogleLoginRequest googleLoginRequest) {
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
				.setAudience(Collections.singletonList(googleClientId))
				.build();
		try {
			GoogleIdToken googleIdToken = verifier.verify(googleLoginRequest.getToken());
			if (googleIdToken == null) {
				throw new AppException(ErrorCode.INVALID_GOOGLE_TOKEN);
			}
			String email = googleIdToken.getPayload().getEmail();
			User user = userRepository.findByEmail(email)
					.orElseGet(() ->
					createUserFromGoogle(googleIdToken)
					);
			String accessToken = jwtService.generateAccessToken(user);
			String refreshToken = jwtService.generateRefreshToken(user);
			refreshTokenService.createOrUpdateToken(refreshToken, user);
			return AuthenticationResponse.builder()
					.accessToken(accessToken)
					.refreshToken(refreshToken)
					.isAuthenticated(true)
					.build();
		} catch (Exception e) {
			throw new AppException(ErrorCode.GOOGLE_LOGIN_FAILED);
		}
	}
	public User createUserFromGoogle(GoogleIdToken googleIdToken) {
		GoogleIdToken.Payload payload = googleIdToken.getPayload();
		User user = User.builder()
				.email(payload.getEmail())
				.fullName(payload.get("name").toString())
				.password(passwordEncoder.encode(googleIdToken.getPayload().get("sub").toString()))
				.avatarUrl(payload.get("picture").toString())
				.build();
		return userRepository.save(user);
	}
	public AuthenticationResponse refreshAccessToken(String refreshToken) {
		if (refreshToken == null || refreshToken.isEmpty()) {
			throw new AppException(ErrorCode.MISSING_REFRESH_TOKEN);
		}
		Claims claims = jwtService.verifyToken(refreshToken);
		User user = User.builder()
				.id(Long.parseLong(claims.getSubject()))
				.email(claims.get("email", String.class))
				.role(claims.get("scope", String.class))
				.build();
		return AuthenticationResponse.builder()
				.accessToken(jwtService.generateAccessToken(user))
				.refreshToken(refreshToken)
				.isAuthenticated(true)
				.build();
	}
	public String logout(Long userId) {
		int deleted = refreshTokenService.deleteTokenByUserId(userId);
		if (deleted == 0) {
			throw new AppException(ErrorCode.USER_NOT_FOUND);
		}
		return "Logged out successfully";
	}
}
