package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Request.CourseFilterRequest;
import com.example.E_Learning.DTO.Request.PageCustomRequest;
import com.example.E_Learning.DTO.Response.*;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CategoryRepository;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.InstructorRepository;
import com.example.E_Learning.mapper.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.E_Learning.DTO.Response.CourseContent;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {
	private final CourseRepository courseRepository;
	private final CourseMapper courseMapper;
	private final CategoryRepository categoryRepository;
	private final CategoryMapper categoryMapper;
	private final InstructorRepository instructorRepository;
	private final InstructorMapper instructorMapper;
	private final MaterialMapper materialMapper;
	private final LessonMapper lessonMapper;
	public CourseResponse createCourse(CourseCreationRequest courseCreationRequest, Long instructorId ) {
		Course course = courseMapper.toCourse(courseCreationRequest);

		course.setCategory(categoryRepository.getReferenceById(courseCreationRequest.getCategoryId()));

		course.setInstructor(instructorRepository.getReferenceById(instructorId));
		Course savedCourse = courseRepository.save(course);
		return courseMapper.toCourseResponse(savedCourse);
	}
	public List<CourseResponse> getAllCourses() {
		List<Course> courses = courseRepository.findAll();
		return courses.stream().map(courseMapper::toCourseResponse)
				.toList();
	}
	public CourseResponse getCourseById(Long courseId) {
		return courseMapper.toCourseResponse(courseRepository.findById(courseId)
				.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND)));
	}
	public void deleteCourse(Long courseId) {
		courseRepository.deleteById(courseId);
	}
	public CourseDetailResponse getCourseDetailById(Long courseId) {
		Course course = courseRepository.getDetailById(courseId)
				.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
		return CourseDetailResponse.builder()
				.id(course.getId())
				.title(course.getTitle())
				.description(course.getDescription())
				.studentCount(course.getStudentCount())
				.discountPercent(course.getDiscountPercent())
				.thumbnailUrl(course.getThumbnailUrl())
				.price(course.getPrice())
				.instructor(instructorMapper.toInstructorResponse(course.getInstructor()))
				.category(categoryMapper.toCategoryResponse(course.getCategory()))
				.build();
	}
	public Page<CourseResponse> findCoursesByFilter (CourseFilterRequest courseFilterRequest, PageCustomRequest pageRequest) {
		Pageable pageable = PageRequest.of(pageRequest.getPage(),
				pageRequest.getPageSize(),
				Sort.by(Sort.Direction.fromString(pageRequest.getDirection()),pageRequest.getSortBy())
		);
		Page<Course> coursePage = courseRepository.findCoursesByFilter(courseFilterRequest.getCategoryId(),
				                                               courseFilterRequest.getMinPrice(),
				                                               courseFilterRequest.getMaxPrice(),
				                                               courseFilterRequest.getDiscountPercent(),
				                                               courseFilterRequest.getTitle(),
				                                               pageable);
		return coursePage.map(courseMapper::toCourseResponse);
	}
	public List<CourseResponse> myInstructorCourse (Long instructorId) {
		List<Course> courses = courseRepository.findByInstructorId(instructorId);
		return courses.stream()
				.map(courseMapper::toCourseResponse)
				.toList();
	}
	public List<CourseResponse> searchByName (String title) {
		List<Course> courses = courseRepository.findByTitleContainingIgnoreCase(title);
		return courses.stream()
				.map(courseMapper::toCourseResponse)
				.toList();
	}
	public CourseContent getCourseContent (Long courseId) {
		Course course = courseRepository.getCourseContentById(courseId)
				.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
		List<LessonResponse> lessonResponses = course.getLessons().stream()
				.map(lessonMapper::toLessonResponse)
				.toList();
		return CourseContent.builder()
				.lessons(lessonResponses)
				.title(course.getTitle())
				.build();
	}

}
