package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.MessageRequest;
import com.example.E_Learning.DTO.Response.MessageResponse;
import com.example.E_Learning.Entity.Lesson;
import com.example.E_Learning.Entity.Message;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.LessonRepository;
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
	private final LessonRepository lessonRepository;
	private final UserMapper userMapper;
	public MessageResponse createMessage(MessageRequest messageRequest, Long lessonId, Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
		Lesson lesson = lessonRepository.findById(lessonId)
				.orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

		Message message = Message.builder()
				.user(user)
				.lesson(lesson)
				.content(messageRequest.getContent())
				.build();

		Message savedMessage = messageRepository.save(message);

		return MessageResponse.builder()
				.id(message.getId())
				.content(savedMessage.getContent())
				.userResponse(userMapper.toUserResponse(savedMessage.getUser()))
				.lessonId(savedMessage.getLesson().getId())
				.build();
	}
}
