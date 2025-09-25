package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Message;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
	@EntityGraph(attributePaths = {
			"replies",
			"replies.replies",
			"replies.replies.replies"
	})
	List<Message> findByMaterialIdAndParentIsNullOrderByCreatedAtAsc(Long materialId);
}
