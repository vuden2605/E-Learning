package com.example.E_Learning.Service;

import com.example.E_Learning.Entity.OrderDetail;
import com.example.E_Learning.Repository.OrderDetailRepository;
import com.example.E_Learning.Repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailService {
	private final OrderDetailRepository orderDetailRepository;
	public OrderDetail createOrderDetail (OrderDetail orderDetail) {
		return orderDetailRepository.save(orderDetail);
	}
	public List<OrderDetail> getByOrderId (Long orderId) {
		return orderDetailRepository.findByOrderId(orderId);
	}
}
