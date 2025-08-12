package com.example.E_Learning.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageCustomRequest {
	private Integer page = 0;
	private Integer pageSize = 2;
	private String sortBy = "id";
	private String direction = "asc";
}
