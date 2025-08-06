package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Request.InstructorCreationRequest;
import com.example.E_Learning.DTO.Request.StudentCreationRequest;
import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
	private final UserService userService;
	public UserController(UserService userService) {
		this.userService = userService;
	}
	@PostMapping("/createStudent")
	public ApiResponse<User> createStudent (@RequestBody @Valid StudentCreationRequest student) {
		return ApiResponse.<User>builder()
				.result(userService.createStudent(student))
				.build();
	}
	public ApiResponse<User> getUserById(Long id) {
		return ApiResponse.<User>builder()
				.result(userService.getUserById(id))
				.build();
	}
	public ApiResponse<List<User>> getAllUsers() {
		return ApiResponse.<List<User>>builder()
				.result(userService.getAllUsers())
				.build();
	}
	public ApiResponse<User> createInstructor(InstructorCreationRequest instructor) {
		return ApiResponse.<User>builder()
				.result(userService.createInstructor(instructor))
				.build();
	}

}
