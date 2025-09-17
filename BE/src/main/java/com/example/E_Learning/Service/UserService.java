package com.example.E_Learning.Service;
import com.example.E_Learning.DTO.Request.UpdateProfileRequest;
import com.example.E_Learning.DTO.Request.UserCreationRequest;
import com.example.E_Learning.DTO.Response.UserResponse;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.UserRepository;
import com.example.E_Learning.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;
	public List<UserResponse> getAllUsers() {
		List<User> user = userRepository.findAll();
		return user.stream().map(userMapper::toUserResponse)
				.toList();
	}
	public UserResponse getUserById(Long id) {
		return userMapper.toUserResponse(userRepository.findById(id)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
	}
	public UserResponse createUser(UserCreationRequest userCreationRequest) {
		// Check if the user already exists
		if (userRepository.existsByEmail(userCreationRequest.getEmail())) {
			throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
		}
		User user = userMapper.toUser(userCreationRequest);
		user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));
		return userMapper.toUserResponse(userRepository.save(user));
	}
	public UserResponse updateProfile(Long userId, UpdateProfileRequest updateProfileRequest){
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
		if (updateProfileRequest.getFullName() != null) {
			user.setFullName(updateProfileRequest.getFullName());
		}

		if (updateProfileRequest.getAvatarUrl() != null) {
			user.setAvatarUrl(updateProfileRequest.getAvatarUrl());
		}
		return userMapper.toUserResponse(userRepository.save(user));
	}
}
