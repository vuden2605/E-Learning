package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.BlogCreationRequest;
import com.example.E_Learning.DTO.Response.BlogResponse;
import com.example.E_Learning.Entity.Blog;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BlogMapper {
	Blog toBlog(BlogCreationRequest blogCreationRequest);
	BlogResponse toBlogResponse(Blog blog);
}
