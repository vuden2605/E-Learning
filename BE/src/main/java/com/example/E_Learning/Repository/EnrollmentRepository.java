package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
	Page<Enrollment> findByUserId (Long userId, Pageable pageable);
	boolean existsByUserIdAndCourseId (Long userId, Long courseId);
	@Query("SELECT e.course.id FROM Enrollment e WHERE e.user.id = :userId")
	Set<Long> findCourseIdByUserId(Long userId);
}
