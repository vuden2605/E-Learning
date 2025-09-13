package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Request.CourseFilterRequest;
import com.example.E_Learning.DTO.Response.CourseDetailResponse;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.DTO.Response.EnrollmentResponse;
import com.example.E_Learning.DTO.Response.PageResponse;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.Enrollment;
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
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.LongSummaryStatistics;
import java.util.Set;
import java.util.stream.Collectors;

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
	private final EnrollmentService enrollmentService;
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
	public PageResponse<CourseResponse> findCoursesByFilter (CourseFilterRequest courseFilterRequest, Long userId, Pageable pageable) {
		Page<Course> coursePage = courseRepository.findCoursesByFilter(courseFilterRequest.getCategoryId(),
				                                               courseFilterRequest.getMinPrice(),
				                                               courseFilterRequest.getMaxPrice(),
				                                               courseFilterRequest.getDiscountPercent(),
				                                               courseFilterRequest.getTitle(),
				                                               pageable);
		List<CourseResponse> result = coursePage.getContent().stream().map(courseMapper::toCourseResponse).toList();

		if (userId != null) {
			List<CourseResponse> userCourses = enrollmentService.getEnrollmentByUserId(userId).stream()
					.map(EnrollmentResponse::getCourseResponse)
					.toList();
			Set<Long> userCourseIds = userCourses.stream()
					.map(CourseResponse::getId)
					.collect(Collectors.toSet());
			result= result.stream()
					.filter(courseResponse -> !userCourseIds.contains(courseResponse.getId()))
					.toList();
		}
		return PageResponse.<CourseResponse>builder()
				.content(result)
				.pageNumber(coursePage.getNumber())
				.pageSize(coursePage.getSize())
				.totalElements(coursePage.getTotalElements())
				.totalPages(coursePage.getTotalPages())
				.last(coursePage.isLast())
				.build();
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

}
