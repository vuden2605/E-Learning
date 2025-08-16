package com.example.E_Learning.Configure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config {
	@Value("${aws.accessKey}")
	private String accessKey;
	@Value("${aws.secretKey}")
	private String secretKey;
	@Value("${aws.region}")
	private String region;
	@Bean
	public S3Client s3Client () {
		return S3Client.builder()
				.region(Region.of(region))
				.credentialsProvider(
						StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey))
				)
				.build();
	}
	@Bean
	public S3Presigner s3Presigner () {
		return S3Presigner.builder()
				.region(Region.of(region))
				.credentialsProvider(StaticCredentialsProvider.create(
						AwsBasicCredentials.create(accessKey, secretKey)))
				.build();
	}
}
