package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.InstructorCreationRequest;
import com.example.E_Learning.DTO.Response.InstructorResponse;
import com.example.E_Learning.Entity.Instructor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstructorMapper {
	Instructor toInstructor(InstructorCreationRequest instructorCreationRequest);
	InstructorResponse toInstructorResponse(Instructor instructor);
}
