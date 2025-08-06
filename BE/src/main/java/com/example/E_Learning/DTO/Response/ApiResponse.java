package com.example.E_Learning.DTO.Response;

import com.example.E_Learning.Exception.ErrorCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
	@Builder.Default
	private int code = ErrorCode.SUCCESS.getCode();
	@Builder.Default
	private String message = ErrorCode.SUCCESS.getMessage();
	private T result;
}
