package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
	List<Message> findByLessonId(Long lessonId);
}
