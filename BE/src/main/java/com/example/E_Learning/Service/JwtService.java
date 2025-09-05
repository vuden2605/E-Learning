package com.example.E_Learning.Service;


import com.example.E_Learning.Entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
	@Value("${jwt.secret-key}")
	public String SECRET_KEY;
	@Value("${jwt.access-time}")
	private long ACCESS_TIME;
	@Value("${jwt.refresh-time}")
	private long REFRESH_TIME;
	public SecretKey getSecretKey() {
		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}
	public String generateAccessToken(User user) {
		return io.jsonwebtoken.Jwts.builder()
				.setSubject(user.getId().toString())
				.claim("scope", user.getRole())
				.claim("email", user.getEmail())
				.claim("type","access_token")
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + ACCESS_TIME))
				.signWith(getSecretKey())
				.compact();
	}
	public String generateRefreshToken(User user) {
		return io.jsonwebtoken.Jwts.builder()
				.setSubject(user.getId().toString())
				.claim("scope", user.getRole())
				.claim("email", user.getEmail())
				.claim("type","refresh_token")
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + REFRESH_TIME))
				.signWith(getSecretKey())
				.compact();
	}
	public Claims verifyToken(String token) {
		try {
			return Jwts.parserBuilder()
					.setSigningKey(getSecretKey())
					.build()
					.parseClaimsJws(token)
					.getBody();
		}
		catch (JwtException e) {
			throw new JwtException("Invalid JWT token", e);
		}
	}
}
