package com.example.E_Learning.Configure;

import com.example.E_Learning.Service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class CustomJwtDecoder implements JwtDecoder {
    private final JwtService jwtService;
	@Override
	public Jwt decode(String token) throws JwtException {
		Claims claims = jwtService.verifyToken(token);
		if( claims.get("type",String.class).equals("refresh_token") && !isRefreshEndpoint()) {
			throw new JwtException("Refresh token cannot be used at endpoint");
		}
		return new Jwt(
				token,
				claims.getIssuedAt().toInstant(),
				claims.getExpiration().toInstant(),
				Collections.singletonMap("alg", "HS256"),
				claims
		);
	}
	private boolean isRefreshEndpoint() {
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		if (attr != null) {
			HttpServletRequest request = attr.getRequest();
			return request.getRequestURI().equals("/auth/refresh-token");
		}
		return false;
	}
}
