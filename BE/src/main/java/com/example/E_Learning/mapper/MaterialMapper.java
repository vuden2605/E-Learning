package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.MaterialCreationRequest;
import com.example.E_Learning.DTO.Response.MaterialResponse;
import com.example.E_Learning.Entity.Material;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
	Material toMaterial (MaterialCreationRequest materialCreationRequest);
	MaterialResponse toMaterialResponse (Material material);
}
