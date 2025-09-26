package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.MessageRequest;
import com.example.E_Learning.DTO.Response.MessageResponse;
import com.example.E_Learning.Entity.Lesson;
import com.example.E_Learning.Entity.Material;
import com.example.E_Learning.Entity.Message;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.LessonRepository;
import com.example.E_Learning.Repository.MaterialRepository;
import com.example.E_Learning.Repository.MessageRepository;
import com.example.E_Learning.Repository.UserRepository;
import com.example.E_Learning.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
	private final MessageRepository messageRepository;
	private final UserRepository userRepository;
	private final MaterialRepository materialRepository;
	private final UserMapper userMapper;
	public MessageResponse createMessage(MessageRequest messageRequest, Long materialId, Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
		Material material = materialRepository.findById(materialId)
				.orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));

		Message message = Message.builder()
				.user(user)
				.material(material)
				.content(messageRequest.getContent())
				.build();
		if (messageRequest.getParentId() != null) {
			Message parentMessage = messageRepository.findById(messageRequest.getParentId())
					.orElseThrow(() -> new AppException(ErrorCode.MESSAGE_NOT_FOUND));
			message.setParent(parentMessage);
		}
		Message savedMessage = messageRepository.save(message);

		return MessageResponse.builder()
				.id(message.getId())
				.content(savedMessage.getContent())
				.userResponse(userMapper.toUserResponse(savedMessage.getUser()))
				.materialId(materialId)
				.sentAt(message.getCreatedAt())
				.parentId(message.getParent() != null ? message.getParent().getId() : null)
				.build();
	}
}
