package com.example.E_Learning.Repository;

import com.example.E_Learning.DTO.Request.BlogFilterRequest;
import com.example.E_Learning.Entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {
	@Query
	("""
		SELECT b FROM Blog b
		WHERE (:#{#blogFilterRequest.categoryId} IS NULL OR b.category.id = :#{#blogFilterRequest.categoryId})
	""")
	Page<Blog> findBlogByFilter (
			Pageable pageable,
			@Param("blogFilterRequest") BlogFilterRequest blogFilterRequest
	);
}
