package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.InstructorCreationRequest;
import com.example.E_Learning.DTO.Request.StudentCreationRequest;
import com.example.E_Learning.Entity.InstructorInfo;
import com.example.E_Learning.Entity.User;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.InstructorInfoRepository;
import com.example.E_Learning.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final InstructorInfoService instructorInfoService;
	public UserService(UserRepository userRepository, InstructorInfoService instructorInfoService) {
		this.instructorInfoService = instructorInfoService;
		this.userRepository = userRepository;
	}
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	public User getUserById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + id));
	}
	public User createStudent(StudentCreationRequest student) {
		// Check if the user already exists
		if (userRepository.existsByEmail(student.getEmail())) {
			throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
		}
		User user = User.builder()
				.firstName(student.getFirstName())
				.lastName(student.getLastName())
				.email(student.getEmail())
				.password(student.getPassword())
				.role("STUDENT")
				.build();
		return userRepository.save(user);
	}
	@Transactional
	public User createInstructor(InstructorCreationRequest instructor) {
		User user = User.builder()
				.firstName(instructor.getFirstName())
				.lastName(instructor.getLastName())
				.email(instructor.getEmail())
				.password(instructor.getPassword())
				.role("INSTRUCTOR")
				.build();
		User savedUser = userRepository.save(user);
		InstructorInfo instructorInfo = InstructorInfo.builder()
				.userId(savedUser)
				.education(instructor.getEducation())
				.experience(instructor.getExperience())
				.specialization(instructor.getSpecialization())
				.cvUrl(instructor.getCvUrl())
				.schoolName(instructor.getSchoolName())
				.build();
		instructorInfoService.createInstructorInfo(instructorInfo);
		return savedUser;
	}


}
