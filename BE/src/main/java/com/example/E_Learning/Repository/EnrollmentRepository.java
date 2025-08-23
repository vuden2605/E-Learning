package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
	List<Enrollment> findByUserId (Long userId);
	boolean existsByUserIdAndCourseId (Long userId, Long courseId);
}
