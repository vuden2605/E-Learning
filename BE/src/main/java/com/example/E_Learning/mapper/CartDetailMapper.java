package com.example.E_Learning.mapper;

import com.example.E_Learning.DTO.Request.CartDetailCreationRequest;
import com.example.E_Learning.Entity.CartDetail;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface CartDetailMapper {
	CartDetail toCartDetail(CartDetailCreationRequest cartDetailCreationRequest);
}
