package com.example.E_Learning.Service;

import com.example.E_Learning.Entity.Cart;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CartRepository;
import com.example.E_Learning.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
	private final CartRepository cartRepository;
	private final UserRepository userRepository;
	public String createCart (Long userId) {
		Cart cart = new Cart();
		cart.setUser(userRepository.getReferenceById(userId));
		if (cartRepository.existsByUserId(cart.getUser().getId())) {
			throw new AppException(ErrorCode.CART_ALREADY_EXISTS);
		}
		cartRepository.save(cart);
		return "Cart created";
	}


}
