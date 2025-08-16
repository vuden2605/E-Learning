package com.example.E_Learning.Controller;

import com.example.E_Learning.DTO.Response.ApiResponse;
import com.example.E_Learning.Service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.IOException;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3Controller {
	private final S3Service s3Service;
	@PostMapping("/upload")
	public ApiResponse<String> uploadFile(@RequestParam("file") MultipartFile file) {
		try {
			if (file.isEmpty()) {
				return ApiResponse.<String>builder()
						.message("File must required")
						.build();
			}
			String folder = file.getContentType() == null ? "others"
							: file.getContentType().startsWith("image/") ? "images"
							: file.getContentType().startsWith("video/") ? "videos"
							: "others";
			String fileUrl = s3Service.uploadFile(file, folder);
			return ApiResponse.<String>builder()
					.message("Upload success")
					.result(fileUrl)
					.build();

		} catch (software.amazon.awssdk.services.s3.model.S3Exception e) {
			return ApiResponse.<String>builder()
					.message("S3 fail: " + e.awsErrorDetails().errorMessage())
					.build();

		} catch (IOException e) {

			return ApiResponse.<String>builder()
					.message("Read file fail: " + e.getMessage())
					.build();

		} catch (Exception e) {

			return ApiResponse.<String>builder()
					.message("Upload fail: " + e.getMessage())
					.build();
		}
	}
	@GetMapping("/download")
	public ResponseEntity<InputStreamResource> download(@RequestParam String key) {
		ResponseInputStream<GetObjectResponse> s3is = s3Service.downloadFile(key);

		String contentType = s3is.response().contentType() != null
				? s3is.response().contentType()
				: "application/octet-stream";

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION,
						"inline; filename=\"" + Paths.get(key).getFileName() + "\"")
				.contentType(MediaType.parseMediaType(contentType))
				.body(new InputStreamResource(s3is));
	}


}
