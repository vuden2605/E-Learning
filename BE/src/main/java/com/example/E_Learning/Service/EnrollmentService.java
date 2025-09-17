package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.EnrollmentCreationRequest;
import com.example.E_Learning.DTO.Request.PageCustomRequest;
import com.example.E_Learning.DTO.Response.EnrollmentResponse;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.Enrollment;
import com.example.E_Learning.Entity.Material;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.EnrollmentRepository;
import com.example.E_Learning.Repository.MaterialRepository;
import com.example.E_Learning.Repository.UserRepository;
import com.example.E_Learning.mapper.CourseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
	private final EnrollmentRepository enrollmentRepository;
	private final CourseRepository courseRepository;
	private final UserRepository userRepository;
	private final CourseMapper courseMapper;
	private final S3Service s3Service;
	private final MaterialRepository materialRepository;
	public String createEnrollment (EnrollmentCreationRequest enrollmentCreationRequest, Long userId) {
		Enrollment enrollment = Enrollment.builder()
				.course(courseRepository.getReferenceById(enrollmentCreationRequest.getCourseId()))
				.user(userRepository.getReferenceById(userId))
				.build();

		enrollmentRepository.save(enrollment);
		return "create enrollment success";
	}
	public Page<EnrollmentResponse> getEnrollmentByUserId(Long userId, PageCustomRequest pageRequest) {
		Pageable pageable = PageRequest.of(
				pageRequest.getPage(),
				pageRequest.getPageSize(),
				Sort.by(Sort.Direction.fromString(pageRequest.getDirection()), pageRequest.getSortBy())
		);

		Page<Enrollment> enrollmentPage = enrollmentRepository.findByUserId(userId, pageable);

		return enrollmentPage.map(enrollment -> EnrollmentResponse.builder()
				.id(enrollment.getId())
				.courseResponse(courseMapper.toCourseResponse(enrollment.getCourse()))
				.userId(enrollment.getUser().getId())
				.enrolledAt(enrollment.getEnrolledAt())
				.build()
		);
	}
	public boolean existsByUserIdAndCourseId (Long userId, Long courseId) {
		return enrollmentRepository.existsByUserIdAndCourseId(userId,courseId);
	}
	public String getCourseMaterial (Long materialId, Long userId, Long courseId) {
		Material material = materialRepository.findById(materialId)
				.orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));
		Course course = courseRepository.findById(courseId)
				.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
		if (existsByUserIdAndCourseId(userId,courseId) || course.getInstructor().getId().equals(userId)) {
			String key = material.getUrl();
			return s3Service.generatePresignedUrl(key);
		}
		return "Access denied";
	}

}
