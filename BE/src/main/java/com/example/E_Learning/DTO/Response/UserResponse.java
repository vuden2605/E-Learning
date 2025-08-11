package com.example.E_Learning.DTO.Response;

import com.example.E_Learning.Entity.Instructor;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String role;
	private Boolean active;
	private LocalDateTime createdAt;
}
