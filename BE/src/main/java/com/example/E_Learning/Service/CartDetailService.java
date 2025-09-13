package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.CartDetailCreationRequest;
import com.example.E_Learning.Entity.Cart;
import com.example.E_Learning.Entity.CartDetail;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CartDetailRepository;
import com.example.E_Learning.Repository.CartRepository;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.mapper.CartDetailMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartDetailService {
	private final CartDetailRepository cartDetailRepository;
	private final CartRepository cartRepository;
	private final CartDetailMapper cartDetailMapper;
	private final CourseRepository courseRepository;
	public String addToCart(Long userId, CartDetailCreationRequest cartDetailCreationRequest) {
		CartDetail cartDetail = cartDetailMapper.toCartDetail(cartDetailCreationRequest);
		Cart cart = cartRepository.findByUserId(userId)
				.orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
		cartDetail.setCart(cart);
		cartDetail.setCourse(courseRepository.getReferenceById(cartDetailCreationRequest.getCourseId()));
		if (cartDetailRepository.existsByCartIdAndCourseId(cartDetail.getCart().getId(), cartDetail.getCourse().getId())) {
			throw new AppException(ErrorCode.COURSE_ALREADY_IN_CART);
		}
		cartDetailRepository.save(cartDetail);
		return "Add to cart successfully";
	}
	public String deleteCartDetails (List<Long> ids) {
		cartDetailRepository.deleteAllById(ids);
		return "Delete cart detail success";
	}
}
