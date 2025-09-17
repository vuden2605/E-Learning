package com.example.E_Learning.Configure;

import com.example.E_Learning.Service.JwtService;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements ChannelInterceptor {
	private final JwtService jwtService;
	@Override
	public Message<?> preSend(@NonNull Message<?> message,@NonNull MessageChannel channel) {
		StompHeaderAccessor accessor =
				MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

			if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
			String token = accessor.getFirstNativeHeader("Authorization");
			if (token != null && token.startsWith("Bearer ")) {
				try {
					Claims claims = jwtService.verifyToken(token.substring(7));
					long userId = Long.parseLong(claims.getSubject());
					if (accessor.getSessionAttributes() == null) {
						accessor.setSessionAttributes(new HashMap<>());
					}
					accessor.getSessionAttributes().put("userId", userId);
				} catch (Exception e) {
					throw new IllegalArgumentException("Invalid JWT token");
				}
			} else {
				throw new IllegalArgumentException("Missing Authorization header");
			}
		}

		return message;
	}
}
