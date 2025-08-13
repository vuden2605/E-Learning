package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.LessonCreationRequest;
import com.example.E_Learning.DTO.Response.LessonResponse;
import com.example.E_Learning.Entity.Lesson;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.LessonRepository;
import com.example.E_Learning.mapper.LessonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LessonService {
	private final LessonRepository lessonRepository;
	private final LessonMapper lessonMapper;
	private final CourseRepository courseRepository;
	public LessonResponse createLesson (LessonCreationRequest lessonCreationRequest, Long courseId) {
		Lesson lesson = lessonMapper.toLesson(lessonCreationRequest);
		lesson.setCourse (courseRepository.getReferenceById(courseId));
		return lessonMapper.toLessonResponse(lessonRepository.save(lesson));
	}
	public List<LessonResponse> getAllLesson () {
		List<Lesson> lessons = lessonRepository.findAll();
		return lessons.stream()
				.map(lessonMapper::toLessonResponse)
				.toList();
	}
	public List<LessonResponse> getLessonByCourseId (Long courseId) {
		List<Lesson> lessons = lessonRepository.findByCourseId(courseId);
		return lessons.stream()
				.map(lessonMapper::toLessonResponse)
				.toList();
	}
}
