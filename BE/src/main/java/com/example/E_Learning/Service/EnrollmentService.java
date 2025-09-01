package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.EnrollmentCreationRequest;
import com.example.E_Learning.DTO.Response.EnrollmentResponse;
import com.example.E_Learning.Entity.Enrollment;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.EnrollmentRepository;
import com.example.E_Learning.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
	private final EnrollmentRepository enrollmentRepository;
	private final CourseRepository courseRepository;
	private final UserRepository userRepository;
	public EnrollmentResponse createEnrollment (EnrollmentCreationRequest enrollmentCreationRequest, Long userId) {
		Enrollment enrollment = Enrollment.builder()
				.course(courseRepository.getReferenceById(enrollmentCreationRequest.getCourseId()))
				.user(userRepository.getReferenceById(userId))
				.build();

		Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
		return EnrollmentResponse.builder()
				.id(savedEnrollment.getId())
				.courseId(savedEnrollment.getCourse().getId())
				.userId(savedEnrollment.getUser().getId())
				.enrolledAt(savedEnrollment.getEnrolledAt())
				.build();
	}
	public List<EnrollmentResponse> getEnrollmentByUserId (Long userId) {
		List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
		return enrollments.stream().map(enrollment -> EnrollmentResponse.builder()
						.id(enrollment.getId())
						.courseId(enrollment.getCourse().getId())
						.userId(enrollment.getUser().getId())
						.enrolledAt(enrollment.getEnrolledAt())
						.build())
				.toList();
	}
	public boolean existsByUserIdAndCourseId (Long userId, Long courseId) {
		return enrollmentRepository.existsByUserIdAndCourseId(userId,courseId);
	}
}
