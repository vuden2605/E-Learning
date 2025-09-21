package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Cart;
import com.example.E_Learning.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
	boolean existsByUserId(Long userId);
	Optional<Cart> findByUserId(Long userId);
	@Query("""
		SELECT DISTINCT co FROM CartDetail cd
		JOIN cd.cart c
		JOIN cd.course co
		JOIN FETCH co.instructor i
		JOIN FETCH i.user u
		WHERE c.user.id = :userId
	"""
	)
	List<Course> findCoursesInCart(Long userId);
}
