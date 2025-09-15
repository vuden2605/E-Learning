package com.example.E_Learning.DTO.Request;
import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
	private String fullName;
	private String avatarUrl;
}
