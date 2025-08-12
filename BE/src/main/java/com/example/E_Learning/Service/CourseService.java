package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Response.CourseDetailResponse;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.DTO.Response.PageResponse;
import com.example.E_Learning.Entity.Category;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.Instructor;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CategoryRepository;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.InstructorRepository;
import com.example.E_Learning.mapper.CategoryMapper;
import com.example.E_Learning.mapper.CourseMapper;
import com.example.E_Learning.mapper.InstructorMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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
				.thumbnailUrl(course.getThumbnailUrl())
				.price(course.getPrice())
				.instructor(instructorMapper.toInstructorResponse(course.getInstructor()))
				.category(categoryMapper.toCategoryResponse(course.getCategory()))
				.build();
	}
//	public List<Course> getCourseByCategory(Long categoryId) {
//		return courseRepository.findByCategoryId(categoryId)
//				.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
//	}
	public PageResponse<CourseResponse> findCoursesByFilter (Long categoryId, Long minPrice, Long maxPrice, Pageable pageable) {
		Page<Course> coursePage = courseRepository.findCoursesByFilter(categoryId, minPrice, maxPrice, pageable);
		List<CourseResponse> courseResponses = coursePage.getContent().stream().map(courseMapper::toCourseResponse).toList();
		return PageResponse.<CourseResponse>builder()
				.content(courseResponses)
				.pageNumber(coursePage.getNumber())
				.pageSize(coursePage.getSize())
				.totalElements(coursePage.getTotalElements())
				.totalPages(coursePage.getTotalPages())
				.last(coursePage.isLast())
				.build();
	}

}
