package com.example.E_Learning.Exception;

import com.example.E_Learning.DTO.Response.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.security.access.AccessDeniedException;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {
//	@ExceptionHandler(Exception.class)
//	public ResponseEntity<ApiResponse<?>> handleException(Exception ex) {
//		ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
//		ApiResponse<?> response = ApiResponse.builder()
//				.code(errorCode.getCode())
//				.message(errorCode.getMessage())
//				.build();
//		return ResponseEntity.status(errorCode.getHttpStatusCode()).body(response);
//	}
	@ExceptionHandler (AppException.class)
	public ResponseEntity<ApiResponse<?>> handleAppException(AppException ex) {
		ErrorCode errorCode = ex.getErrorCode();
		ApiResponse<?> response = ApiResponse.builder()
				.code (errorCode.getCode())
				.message (errorCode.getMessage())
				.build();
		return ResponseEntity.status(errorCode.getHttpStatusCode()).body(response);
	}
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<?>> handleValidationException(MethodArgumentNotValidException ex) {
		String enumKey = Objects.requireNonNull(ex.getFieldError()).getDefaultMessage();
		ErrorCode errorCode = ErrorCode.valueOf(enumKey);
		ApiResponse<?> response = ApiResponse.builder()
				.code(errorCode.getCode())
				.message(errorCode.getMessage())
				.build();
		return ResponseEntity.status(errorCode.getHttpStatusCode()).body(response);
	}
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ApiResponse<?>> handleAccessDeniedException(AccessDeniedException ex) {
		ErrorCode errorCode = ErrorCode.ACCESS_DENIED;
		return ResponseEntity.status(errorCode.getHttpStatusCode())
				.body(ApiResponse.builder()
						.code(errorCode.getCode())
						.message(errorCode.getMessage())
						.build());
	}



}
