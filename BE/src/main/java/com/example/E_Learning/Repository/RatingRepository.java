package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Long> {
	boolean existsByUserIdAndCourseId(Long userId, Long courseId);
	@Query("SELECT AVG(r.rate), count(r) FROM Rating r WHERE r.course.id = :courseId")
	Object findAverageAndTotalRatingByCourseId(@Param("courseId") Long courseId);
}
