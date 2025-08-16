package com.example.E_Learning.Controller;

import com.example.E_Learning.Service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EnrollmentController {
	private final EnrollmentService enrollmentService;
}
