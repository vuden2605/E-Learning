package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3Controller {
	private final S3Service s3Service;
	@PostMapping("/upload")
	public ApiResponse<String> uploadFile(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return ApiResponse.<String>builder()
					.code(ErrorCode.FILE_REQUIRED.getCode())
					.message(ErrorCode.FILE_REQUIRED.getMessage())
					.build();
		}
		String folder = file.getContentType() == null ? "others"
						: file.getContentType().startsWith("image/") ? "images"
						: file.getContentType().startsWith("video/") ? "videos"
						: "others";
		String key = s3Service.uploadFile(file, folder);
		return ApiResponse.<String>builder()
				.code(ErrorCode.SUCCESS.getCode())
				.message(ErrorCode.SUCCESS.getMessage())
				.result(key)
				.build();
	}
//	@GetMapping("/download")
//	public ResponseEntity<?> download(@RequestParam String key) {
//		try {
//			ResponseInputStream<GetObjectResponse> s3is = s3Service.downloadFile(key);
//
//			String contentType = s3is.response().contentType() != null
//					? s3is.response().contentType()
//					: "application/octet-stream";
//
//			return ResponseEntity.ok()
//					.header(HttpHeaders.CONTENT_DISPOSITION,
//							"inline; filename=\"" + Paths.get(key).getFileName() + "\"")
//					.contentType(MediaType.parseMediaType(contentType))
//					.body(new InputStreamResource(s3is));
//
//		} catch (NoSuchKeyException e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND)
//					.body("File not found in S3 with key: " + key);
//
//		} catch (S3Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//					.body("S3 error: " + e.awsErrorDetails().errorMessage());
//
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//					.body("Unexpected error: " + e.getMessage());
//		}
//	}
	@GetMapping("/download")
	public ApiResponse<String> getPresignedUrl(@RequestParam String key) {
		try {
			return ApiResponse.<String>builder()
					.result(s3Service.generatePresignedUrl(key))
					.build();
		} catch (Exception e) {
			throw new AppException(ErrorCode.GENERATE_URL_FAIL);
		}
	}

}
