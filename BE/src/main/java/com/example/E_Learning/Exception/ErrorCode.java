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
	// User Validation
	MISSING_REQUIRED_FIELD(1201, "Missing required field", HttpStatus.BAD_REQUEST),
	INVALID_EMAIL(1202, "Invalid email format", HttpStatus.BAD_REQUEST),
	INVALID_PASSWORD(1203, "Invalid password format", HttpStatus.BAD_REQUEST),
	REQUIRED_FULL_NAME(1204, "Full name is required", HttpStatus.BAD_REQUEST),
	//----------------------------------------------------------------------------------------//
	// Course
	COURSE_NOT_FOUND(2001, "Course not found", HttpStatus.NOT_FOUND),
	COURSE_ALREADY_EXISTS(2002, "Course already exists", HttpStatus.CONFLICT),
	// Course Validation
	REQUIRED_COURSE_NAME(2003, "Course name is required", HttpStatus.BAD_REQUEST),
	REQUIRED_COURSE_DESCRIPTION(2004, "Course description is required", HttpStatus.BAD_REQUEST),
	REQUIRED_COURSE_PRICE(2005, "Course price is required", HttpStatus.BAD_REQUEST),
	REQUIRED_COURSE_TITLE(2006, "Course title is required", HttpStatus.BAD_REQUEST),
	REQUIRED_COURSE_THUMBNAIL_URL(2007, "Course thumbnail URL is required", HttpStatus.BAD_REQUEST),
	REQUIRED_COURSE_CATEGORY(2008, "Course category is required", HttpStatus.BAD_REQUEST),
	//----------------------------------------------------------------------------------------//
	//Category
	CATEGORY_NOT_FOUND(3001, "Category not found", HttpStatus.NOT_FOUND),
	CATEGORY_ALREADY_EXISTS(3002, "Category already exists", HttpStatus.CONFLICT),
	// Category Validation
	REQUIRED_CATEGORY_NAME(3003, "Category name is required", HttpStatus.BAD_REQUEST),
	REQUIRED_CATEGORY_DESCRIPTION(3004, "Category description is required", HttpStatus.BAD_REQUEST),
	//----------------------------------------------------------------------------------------//
	//Lesson
	// Lesson
	LESSON_NOT_FOUND(4001, "Lesson not found", HttpStatus.NOT_FOUND),
	LESSON_ALREADY_EXISTS(4002, "Lesson already exists", HttpStatus.CONFLICT),
	// Lesson Validation
	REQUIRED_LESSON_TITLE(4003, "Lesson title is required", HttpStatus.BAD_REQUEST),
	REQUIRED_LESSON_NUMBER(4004, "Lesson number is required", HttpStatus.BAD_REQUEST),
	//S3
	FILE_REQUIRED(5001,"File must required", HttpStatus.BAD_REQUEST),
	GENERATE_URL_FAIL(5002,"Generate url fail",HttpStatus.BAD_REQUEST),
	// Google Login
	INVALID_GOOGLE_TOKEN(6001, "Invalid Google token", HttpStatus.UNAUTHORIZED),
	GOOGLE_LOGIN_FAILED(6002, "Google login failed", HttpStatus.INTERNAL_SERVER_ERROR),
	// JWT
	MISSING_REFRESH_TOKEN(7001, "Missing refresh token", HttpStatus.BAD_REQUEST),
	//Blog
	BLOG_NOT_FOUND(8001, "Blog not found", HttpStatus.NOT_FOUND),
	BLOG_ALREADY_EXISTS(8002, "Blog already exists", HttpStatus.CONFLICT),
	// Blog Validation
	REQUIRED_BLOG_TITLE(8003, "Blog title is required", HttpStatus.BAD_REQUEST),
	REQUIRED_BLOG_CONTENT(8004, "Blog content is required", HttpStatus.BAD_REQUEST),
	REQUIRED_BLOG_IMAGE_URL(8005, "Blog image URL is required", HttpStatus.BAD_REQUEST),
	REQUIRED_BLOG_CATEGORY(8006, "Blog category is required", HttpStatus.BAD_REQUEST),
	//Cart
	CART_NOT_FOUND(9001, "Cart not found", HttpStatus.NOT_FOUND),
	CART_ALREADY_EXISTS(9002, "Cart already exists", HttpStatus.CONFLICT),
	COURSE_ALREADY_IN_CART(9003, "Course already in cart", HttpStatus.CONFLICT),
	//Rating
	RATING_NOT_FOUND(10001, "Rating not found", HttpStatus.NOT_FOUND),
	RATING_ALREADY_EXISTS(10002, "Rating already exists", HttpStatus.CONFLICT);
	private final int code;
	private final String message;
	private final HttpStatus httpStatusCode;
	ErrorCode(int code, String message, HttpStatus httpStatusCode) {
		this.code = code;
		this.message = message;
		this.httpStatusCode = httpStatusCode;
	}
}
