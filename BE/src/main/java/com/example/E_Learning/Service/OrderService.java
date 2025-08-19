package com.example.E_Learning.Service;

import com.example.E_Learning.Entity.Order;
import com.example.E_Learning.Repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	public Order createOrder (Order oder) {
		return orderRepository.save(oder);
	}
	public List<Order> getOrderByUserId (Long userId) {
		return orderRepository.findByUserId(userId);
	}
}
