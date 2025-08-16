package com.example.E_Learning.Service;

import com.example.E_Learning.Entity.Enrollment;
import com.example.E_Learning.Repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
	private final EnrollmentRepository enrollmentRepository;

}
