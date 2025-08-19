package com.example.E_Learning.Service;

import com.example.E_Learning.Entity.Enrollment;
import com.example.E_Learning.Repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
	private final EnrollmentRepository enrollmentRepository;
	public Enrollment createEnrollment (Enrollment enrollment) {
		return enrollmentRepository.save(enrollment);
	}
	public List<Enrollment> getEnrollmentByUserId (Long userId) {
		return enrollmentRepository.findByUserId(userId);
	}
	public boolean existsByUserIdAndCourseId (Long userId, Long courseId) {
		return enrollmentRepository.existsByUserIdAndCourseId(userId,courseId);
	}
}
