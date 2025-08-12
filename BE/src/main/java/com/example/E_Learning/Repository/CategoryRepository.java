package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	boolean existsByName(String name);
	Optional<Category> findByName (String name);
}
