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
	@Query("SELECT cd.course FROM CartDetail cd WHERE cd.cart.id = :cartId")
	List<Course> findCoursesInCart(Long cartId);
}
