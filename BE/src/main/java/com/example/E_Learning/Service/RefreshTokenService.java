package com.example.E_Learning.Service;

import com.example.E_Learning.Entity.RefreshToken;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Repository.RefreshTokenRepository;
import com.example.E_Learning.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
	private final RefreshTokenRepository refreshTokenRepository;
	public void createRefreshToken(RefreshToken refreshToken) {
		refreshTokenRepository.save(refreshToken);
	}
	@Transactional
	public void createOrUpdateToken(String refreshToken, User user) {
		int updated = refreshTokenRepository.updateTokenByUserId(refreshToken, user.getId());
		if (updated == 0) {
			RefreshToken insertRefreshToken = RefreshToken.builder()
					.user(user)
					.token(refreshToken)
					.build();
			refreshTokenRepository.save(insertRefreshToken);
		}
	}
	@Transactional
	public int deleteTokenByUserId(Long userId) {
		return refreshTokenRepository.deleteByUserId(userId);
	}
}
