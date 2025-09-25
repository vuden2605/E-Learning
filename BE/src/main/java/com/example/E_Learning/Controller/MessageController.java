package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.MessageRequest;
import com.example.E_Learning.DTO.Response.MessageResponse;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Objects;

@Controller
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {
	private final MessageService messageService;
	@MessageMapping("/material/{materialId}/send")
	@SendTo("/topic/material/{materialId}")
	public MessageResponse sendMessage(@DestinationVariable Long materialId,
	                                   @Payload MessageRequest messageRequest,
	                                   SimpMessageHeaderAccessor headerAccessor) {
		Long userId = (Long) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("userId");
		if (userId == null) {
			throw new AppException(ErrorCode.UNAUTHENTICATED);
		}
		return messageService.createMessage(messageRequest,materialId,userId);
	}
}
