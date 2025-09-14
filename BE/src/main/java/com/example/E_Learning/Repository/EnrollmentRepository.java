package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
	Page<Enrollment> findByUserId (Long userId, Pageable pageable);
	boolean existsByUserIdAndCourseId (Long userId, Long courseId);
}
