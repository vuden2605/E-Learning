package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.InstructorCreationRequest;
import com.example.E_Learning.DTO.Request.UserCreationRequest;
import com.example.E_Learning.DTO.Response.UserResponse;
import com.example.E_Learning.Entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
	UserResponse toUserResponse(User user);
	User toUser(UserCreationRequest userCreationRequest);
	User toUser (InstructorCreationRequest instructorCreationRequest);

}
