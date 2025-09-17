package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.LessonCreationRequest;
import com.example.E_Learning.DTO.Response.LessonResponse;
import com.example.E_Learning.DTO.Response.MessageResponse;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.Lesson;
import com.example.E_Learning.Entity.Message;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.LessonRepository;
import com.example.E_Learning.Repository.MessageRepository;
import com.example.E_Learning.mapper.LessonMapper;
import com.example.E_Learning.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class LessonService {
	private final LessonRepository lessonRepository;
	private final LessonMapper lessonMapper;
	private final CourseRepository courseRepository;
	private final MessageRepository messageRepository;
	private final UserMapper userMapper;
	public LessonResponse createLesson (LessonCreationRequest lessonCreationRequest, Long courseId,Long userId) {
		Course course = courseRepository.findById(courseId)
				.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
		if (!course.getInstructor().getId().equals(userId)) {
			throw new AppException(ErrorCode.ACCESS_DENIED);
		}
		Lesson lesson = lessonMapper.toLesson(lessonCreationRequest);
		lesson.setCourse (course);
		return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
	}
	public List<LessonResponse> getLessonByCourseId (Long courseId) {
		List<Lesson> lessons = lessonRepository.findByCourseId(courseId);
		return lessons.stream()
				.map(lessonMapper::toLessonResponse)
				.toList();
	}
	public List<MessageResponse> getMessageByLesson(Long lessonId) {
		List<Message> messages = messageRepository.findByLessonId(lessonId);
		return messages.stream()
				.map(message -> MessageResponse.builder()
						.content(message.getContent())
						.userResponse(userMapper.toUserResponse(message.getUser()))
						.lessonId(lessonId)
						.build())
				.toList();
	}
}
