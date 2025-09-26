package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.MaterialCreationRequest;
import com.example.E_Learning.DTO.Response.MaterialResponse;
import com.example.E_Learning.DTO.Response.MessageResponse;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.Lesson;
import com.example.E_Learning.Entity.Material;
import com.example.E_Learning.Entity.Message;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.LessonRepository;
import com.example.E_Learning.Repository.MaterialRepository;
import com.example.E_Learning.Repository.MessageRepository;
import com.example.E_Learning.mapper.MaterialMapper;
import com.example.E_Learning.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MaterialService {
	private final MaterialRepository materialRepository;
	private final MaterialMapper materialMapper;
	private final UserMapper userMapper;
	private final LessonRepository lessonRepository;
	private final MessageRepository messageRepository;
	public MaterialResponse createMaterial (MaterialCreationRequest materialCreationRequest, Long lessonId, Long instructorId) {
		Material material = materialMapper.toMaterial(materialCreationRequest);
		Lesson lesson = lessonRepository.findById(lessonId)
				.orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
		Course course = lesson.getCourse();
		if (!course.getInstructor().getId().equals(instructorId)) {
			throw new AppException(ErrorCode.ACCESS_DENIED);
		}
		material.setLesson(lesson);
		return materialMapper.toMaterialResponse(materialRepository.save(material));
	}
	public List<MaterialResponse> getMaterialByLessonId (Long lessonId) {
		List<Material> materials = materialRepository.findByLessonId(lessonId);
		return materials.stream()
				.map(materialMapper::toMaterialResponse)
				.toList();
	}
	public List<MessageResponse> getMessagesByMaterialId(Long materialId) {
		Material material = materialRepository.findById(materialId)
				.orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));
		List<Message> messages = messageRepository.findByMaterialIdAndParentIsNullOrderByCreatedAtAsc(materialId);
		return messages.stream()
				.map(message -> MessageResponse.builder()
						.id(message.getId())
						.content(message.getContent())
						.userResponse(userMapper.toUserResponse(message.getUser()))
						.materialId(materialId)
						.parentId(message.getParent() != null ? message.getParent().getId() : null)
						.sentAt(message.getCreatedAt())
						.replies(message.getReplies().stream()
								.map(reply -> MessageResponse.builder()
										.id(reply.getId())
										.content(reply.getContent())
										.userResponse(userMapper.toUserResponse(reply.getUser()))
										.materialId(materialId)
										.sentAt(reply.getCreatedAt())
										.parentId(reply.getParent().getId())
										.build())
								.toList())
						.build())
				.toList();
	}
}
