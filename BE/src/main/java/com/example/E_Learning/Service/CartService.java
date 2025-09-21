package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Response.CourseDetailResponse;
import com.example.E_Learning.DTO.Response.CourseResponse;
import com.example.E_Learning.Entity.Cart;
import com.example.E_Learning.Entity.CartDetail;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CartDetailRepository;
import com.example.E_Learning.Repository.CartRepository;
import com.example.E_Learning.Repository.UserRepository;
import com.example.E_Learning.mapper.CourseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
	private final CartRepository cartRepository;
	private final CartDetailRepository cartDetailRepository;
	private final UserRepository userRepository;
	private final CourseMapper courseMapper;
	public String createCart (Long userId) {
		Cart cart = new Cart();
		cart.setUser(userRepository.getReferenceById(userId));
		if (cartRepository.existsByUserId(cart.getUser().getId())) {
			throw new AppException(ErrorCode.CART_ALREADY_EXISTS);
		}
		cartRepository.save(cart);
		return "Cart created";
	}
	public String deleteCart(Long cartId) {
		cartRepository.deleteById(cartId);
		return "Delete cart success";
	}
	public List<CourseDetailResponse> myCart(Long userId) {
		Cart cart = cartRepository.findByUserId(userId)
				.orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
		List<Course> courses = cartRepository.findCoursesInCart(cart.getId());
		return courses.stream()
				.map(courseMapper::toCourseDetailResponse)
				.toList();
	}
	public String removeCourseFromCart(Long userId,Long courseId) {
		Cart cart = cartRepository.findByUserId(userId)
				.orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
		CartDetail cartDetail = cartDetailRepository.findByCartIdAndCourseId(cart.getId(),courseId)
				.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND_IN_CART));
		cartDetailRepository.delete(cartDetail);
		return "remove course item success";
	}
}
