package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.CategoryCreationRequest;
import com.example.E_Learning.DTO.Response.CategoryResponse;
import com.example.E_Learning.Entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
	Category toCategory(CategoryCreationRequest categoryCreationRequest);
	CategoryResponse toCategoryResponse(Category category);
}
