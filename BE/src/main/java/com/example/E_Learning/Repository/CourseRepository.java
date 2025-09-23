package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
	Optional<Course> getDetailById(Long id);
	@Query("""
    SELECT c FROM Course c
    WHERE (:categoryId IS NULL OR c.category.id = :categoryId)
      AND (:minPrice IS NULL OR (c.price * (1 - c.discountPercent/100.0)) >= :minPrice)
      AND (:maxPrice IS NULL OR (c.price * (1 - c.discountPercent/100.0)) <= :maxPrice)
      AND (:discountPercent IS NULL OR c.discountPercent >= :discountPercent)
      AND (:title IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :title, '%')))
    """)
	Page<Course> findCoursesByFilter(
			@Param("categoryId") Long categoryId,
			@Param("minPrice") Long minPrice,
			@Param("maxPrice") Long maxPrice,
			@Param("discountPercent") Integer discountPercent,
			@Param("title") String title,
			Pageable pageable
	);
	List<Course> findByInstructorId (Long instructorId);
	List<Course> findByTitleContainingIgnoreCase (String title);
	@Modifying
	@Query("""
	UPDATE Course c
	SET c.averageRating = :averageRating, c.totalRatings = :totalRatings
	WHERE c.id = :courseId
	""")
	void updateAverageAndTotalRating(
		@Param("courseId") Long courseId,
		@Param("averageRating") Double averageRating,
		@Param("totalRatings") Long totalRatings
	);
	@Query("""
		SELECT c FROM Course c
		LEFT JOIN FETCH c.lessons l
		LEFT JOIN FETCH l.materials t
		WHERE c.id =:courseId
	""")
	Optional<Course> getCourseContentById(@Param("courseId") Long courseId);

}
