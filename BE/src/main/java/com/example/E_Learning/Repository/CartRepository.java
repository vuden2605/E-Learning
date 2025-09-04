package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
	boolean existsByUserId(Long userId);
	Optional<Cart> findByUserId(Long userId);
}
