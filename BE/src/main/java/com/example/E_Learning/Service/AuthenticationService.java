package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.GoogleLoginRequest;
import com.example.E_Learning.DTO.Request.LoginRequest;
import com.example.E_Learning.DTO.Response.AuthenticationResponse;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
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
	@Value("${google.clientId}")
	private String googleClientId;
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
					.orElseGet(() -> createUserFromGoogle(googleIdToken));
			return AuthenticationResponse.builder()
					.accessToken(jwtService.generateAccessToken(user))
					.refreshToken(jwtService.generateRefreshToken(user))
					.isAuthenticated(true)
					.build();
		} catch (Exception e) {
			throw new AppException(ErrorCode.GOOGLE_LOGIN_FAILED);
		}
	}
	private User createUserFromGoogle(GoogleIdToken googleIdToken) {
		GoogleIdToken.Payload payload = googleIdToken.getPayload();
		User user = User.builder()
				.email(payload.getEmail())
				.fullName(payload.get("name").toString())
				.password(passwordEncoder.encode(googleIdToken.getPayload().get("sub").toString()))
				.build();
		return userRepository.save(user);
	}
}
