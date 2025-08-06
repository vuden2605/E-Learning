package com.example.E_Learning.Service;

import com.example.E_Learning.Entity.InstructorInfo;
import com.example.E_Learning.Repository.InstructorInfoRepository;
import org.springframework.stereotype.Service;

@Service
public class InstructorInfoService {
	private final InstructorInfoRepository instructorInfoRepository;
	public InstructorInfoService(InstructorInfoRepository instructorInfoRepository) {
		this.instructorInfoRepository = instructorInfoRepository;
	}
	public void createInstructorInfo(InstructorInfo instructorInfo) {
		instructorInfoRepository.save(instructorInfo);
	}
}
