package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.LessonCreationRequest;
import com.example.E_Learning.DTO.Response.LessonResponse;
import com.example.E_Learning.Entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LessonMapper {
	Lesson toLesson (LessonCreationRequest lessonCreationRequest);
	LessonResponse toLessonResponse (Lesson lesson);
}
