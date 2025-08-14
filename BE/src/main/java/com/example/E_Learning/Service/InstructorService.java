package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.InstructorCreationRequest;
import com.example.E_Learning.DTO.Response.InstructorResponse;
import com.example.E_Learning.DTO.Response.UserResponse;
import com.example.E_Learning.Entity.Instructor;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.InstructorRepository;
import com.example.E_Learning.Repository.UserRepository;
import com.example.E_Learning.mapper.InstructorMapper;
import com.example.E_Learning.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InstructorService {
	private final InstructorRepository instructorRepository;
	private final UserMapper userMapper;
	private final InstructorMapper instructorMapper;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	public Instructor getInstructorById(Long id) {
		return instructorRepository.findById(id).orElse(null);
	}
	public InstructorResponse createInstructor(InstructorCreationRequest instructorCreationRequest) {
		if (userRepository.existsByEmail(instructorCreationRequest.getEmail())) {
			throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
		}
		User user = userMapper.toUser(instructorCreationRequest);
		user.setRole("INSTRUCTOR");
		user.setPassword(passwordEncoder.encode(instructorCreationRequest.getPassword()));
		Instructor instructor = instructorMapper.toInstructor(instructorCreationRequest);
		instructor.setUser(user);
		userRepository.save(user);
		instructorRepository.save(instructor);
		UserResponse userResponse = userMapper.toUserResponse(user);
		InstructorResponse instructorResponse = instructorMapper.toInstructorResponse(instructor);
		instructorResponse.setUser(userResponse);
		return instructorResponse;

	}
}
