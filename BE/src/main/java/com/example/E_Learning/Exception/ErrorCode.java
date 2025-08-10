package com.example.E_Learning.Exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
	//Success
	SUCCESS(9999, "Success", HttpStatus.OK),
	// General Errors
	INTERNAL_SERVER_ERROR(1000, "An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR),
	// User
	USER_NOT_FOUND(1001, "User not found", HttpStatus.NOT_FOUND),
	USER_ALREADY_EXISTS(1002, "User already exists", HttpStatus.CONFLICT),
	INVALID_CREDENTIALS(1003, "Invalid credentials", HttpStatus.UNAUTHORIZED),
	UNAUTHENTICATED(1004, "User is not authenticated", HttpStatus.UNAUTHORIZED),
	ACCESS_DENIED(1005, "Access denied", HttpStatus.FORBIDDEN),
	//Validation
	MISSING_REQUIRED_FIELD(1201, "Missing required field", HttpStatus.BAD_REQUEST),
	INVALID_EMAIL(1202, "Invalid email format", HttpStatus.BAD_REQUEST),
	INVALID_PASSWORD(1203, "Invalid password format", HttpStatus.BAD_REQUEST),
	REQUIRED_FIRST_NAME(1204, "First name is required", HttpStatus.BAD_REQUEST),
	REQUIRED_LAST_NAME(1205, "Last name is required", HttpStatus.BAD_REQUEST);
	private final int code;
	private final String message;
	private final HttpStatus httpStatusCode;
	ErrorCode(int code, String message, HttpStatus httpStatusCode) {
		this.code = code;
		this.message = message;
		this.httpStatusCode = httpStatusCode;
	}
}
