package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
	Optional<Course> getDetailById(Long id);
	@Query("""
    SELECT c FROM Course c
    WHERE (:categoryId IS NULL OR c.category.id = :categoryId)
      AND (:minPrice IS NULL OR :maxPrice IS NULL OR (c.price BETWEEN :minPrice AND :maxPrice) )
    """)
	Page<Course> findCoursesByFilter(
			@Param("categoryId") Long categoryId,
			@Param("minPrice") Long minPrice,
			@Param("maxPrice") Long maxPrice,
			Pageable pageable
	);
	List<Course> findByInstructorId (Long instructorId);

}
