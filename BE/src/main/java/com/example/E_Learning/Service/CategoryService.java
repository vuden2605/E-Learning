package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.CategoryCreationRequest;
import com.example.E_Learning.DTO.Response.CategoryResponse;
import com.example.E_Learning.Entity.Category;
import com.example.E_Learning.Repository.CategoryRepository;
import com.example.E_Learning.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
	private final CategoryRepository categoryRepository;
	private final CategoryMapper categoryMapper;
	public CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest) {
		Category category = categoryMapper.toCategory(categoryCreationRequest);
		Category savedCategory = categoryRepository.save(category);
		return categoryMapper.toCategoryResponse(savedCategory);
	}
	public List<CategoryResponse> getAllCategories() {
		List<Category> categories = categoryRepository.findAll();
		return categories.stream()
				.map(categoryMapper::toCategoryResponse)
				.toList();
	}

}
