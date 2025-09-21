package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.CourseCreationRequest;
import com.example.E_Learning.DTO.Response.CourseDetailResponse;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.Entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CourseMapper {
	Course toCourse(CourseCreationRequest courseCreationRequest);
	@Mapping(target = "averageRating", source = "averageRating")
	@Mapping(target = "totalRatings", source = "totalRatings")
	CourseResponse toCourseResponse(Course course);
	CourseDetailResponse toCourseDetailResponse(Course course);
}
