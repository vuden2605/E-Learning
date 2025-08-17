package com.example.E_Learning.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.io.IOException;
import java.rmi.RemoteException;
import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {
	private final S3Client s3Client;
	private final S3Presigner s3Presigner;
	@Value("${aws.region}")
	private String region;

	@Value("${aws.s3.bucketName}")
	private String bucketName;

	public String uploadFile(MultipartFile file, String folder) {
		try {
			String key = folder + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
			String contentType = file.getContentType() != null ? file.getContentType() : "application/octet-stream";
			PutObjectRequest.Builder builder = PutObjectRequest.builder()
					.bucket(bucketName)
					.key(key)
					.contentType(contentType);

			if ("images".equals(folder)) {
				builder.acl(ObjectCannedACL.PUBLIC_READ);
			}
			PutObjectRequest putObjectRequest = builder.build();
			s3Client.putObject(putObjectRequest,
					RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
			if ("images".equals(folder)) {
				return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;
			} else {
				return key;
			}
		} catch (S3Exception e) {
			throw new RuntimeException("S3 upload failed: " + e.awsErrorDetails().errorMessage(), e);
		} catch (IOException e) {
			throw new RuntimeException("IOException: " + e.getMessage(), e);
		}
	}

//	public ResponseInputStream<GetObjectResponse> downloadFile(String key) {
//		try {
//			GetObjectRequest getObjectRequest = GetObjectRequest.builder()
//					.bucket(bucketName)
//					.key(key)
//					.build();
//			return s3Client.getObject(getObjectRequest);
//
//		} catch (S3Exception e) {
//			throw new RuntimeException("S3 download failed: " + e.awsErrorDetails().errorMessage());
//		}
//	}
	public String generatePresignedUrl(String key) {
		GetObjectRequest getObjectRequest = GetObjectRequest.builder()
				.bucket(bucketName)
				.key(key)
				.build();

		GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
				.signatureDuration(Duration.ofHours(2))
				.getObjectRequest(getObjectRequest)
				.build();
		PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(presignRequest);

		return presignedRequest.url().toString();
	}
}