package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Response.CourseDetailResponse;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.Entity.Category;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.Instructor;
import com.example.E_Learning.Repository.CategoryRepository;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.InstructorRepository;
import com.example.E_Learning.mapper.CourseMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {
	private final CourseRepository courseRepository;
	private final CourseMapper courseMapper;
	private final CategoryRepository categoryRepository;
	private final InstructorRepository instructorRepository;
	public CourseResponse createCourse(CourseCreationRequest courseCreationRequest, Long instructorId ) {
		Course course = courseMapper.toCourse(courseCreationRequest);

		course.setCategory(categoryRepository.getReferenceById(courseCreationRequest.getCategoryId()));

		course.setInstructor(instructorRepository.getReferenceById(instructorId));
		Course savedCourse = courseRepository.save(course);
		return courseMapper.toCourseResponse(savedCourse);
	}
//	public CourseResponse getCourseById(Long courseId) {
//		return courseRepository.findById(courseId)
//				.map(course -> new CourseResponse(course.getId(), course.getName(), course.getDescription()))
//				.orElseThrow(() -> new RuntimeException("Course not found"));
//	}
//	public void deleteCourse(Long courseId) {
//		courseRepository.deleteById(courseId);
//	}
//	public CourseDetailResponse getCourseDetailById(Long courseId) {
//		return courseRepository.findById(courseId)
//				.map(course -> new CourseDetailResponse(course.getId(), course.getName(), course.getDescription(), course.getInstructor()))
//				.orElseThrow(() -> new RuntimeException("Course not found"));
//	}
//	public CourseResponse getCourseByCategory(Long categoryId) {
//		return courseRepository.findByCategoryId(categoryId)
//				.stream()
//				.map(course -> new CourseResponse(course.getId(), course.getName(), course.getDescription()))
//				.toList();
//	}

}
