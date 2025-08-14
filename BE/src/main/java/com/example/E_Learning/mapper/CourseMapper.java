package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.Entity.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseMapper {
	Course toCourse(CourseCreationRequest courseCreationRequest);
	CourseResponse toCourseResponse(Course course);
}
