package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.MoMoPaymentRequest;
import com.example.E_Learning.Entity.Course;
import com.example.E_Learning.Entity.Order;
import com.example.E_Learning.Entity.OrderDetail;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.OrderDetailRepository;
import com.example.E_Learning.Repository.OrderRepository;
import com.example.E_Learning.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MomoService {
	private static final String partnerCode = "MOMO";
	private static final String accessKey = "F8BBA842ECF85";
	private static final String secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
	private static final String returnUrl = "https://momo.vn/return";
	private static final String notifyUrl = "https://55de27a75079.ngrok-free.app/notify";
	private static final String endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
	private final OrderRepository orderRepository;
	private final OrderDetailRepository orderDetailRepository;
	private final CourseRepository courseRepository;
	private final UserRepository userRepository;
	@Transactional
	public String createPayment(MoMoPaymentRequest moMoPaymentRequest, Long userId) throws Exception {
		// Create order
		Order order = Order.builder()
				.user(userRepository.getReferenceById(userId))
				.paymentMethod("Momo")
				.build();
		long amount = 0;
		for (long courseId : moMoPaymentRequest.getCourseIds()) {
			Course course = courseRepository.findById(courseId)
					.orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));
			long price = course.getPrice();
			long discount = Math.round((double) (price * course.getDiscountPercent()) / 100);
			long finalPrice = price - discount;
			amount += finalPrice;
			OrderDetail orderDetail = OrderDetail.builder()
					.course(course)
					.price(price)
					.discount(discount)
					.finalPrice(finalPrice)
					.order(order)
					.build();
			order.getOrderDetails().add(orderDetail);
		}
		order.setTotalAmount(amount);
		Order saveOrder = orderRepository.save(order);
		String requestId = saveOrder.getId() + "-" + UUID.randomUUID().toString();
		String orderIdMomo = saveOrder.getId() + "-" + UUID.randomUUID().toString();
		String orderInfo = "Thanh toán đơn hàng " + orderIdMomo;
		String requestType = "payWithMethod";
		String extraData = "";
		// raw signature
		String rawHash = "accessKey=" + accessKey +
				"&amount=" + amount +
				"&extraData=" + extraData +
				"&ipnUrl=" + notifyUrl +
				"&orderId=" + orderIdMomo +
				"&orderInfo=" + orderInfo +
				"&partnerCode=" + partnerCode +
				"&redirectUrl=" + returnUrl +
				"&requestId=" + requestId +
				"&requestType=" + requestType;

		String signature = hmacSHA256(rawHash);

		Map<String, Object> body = new HashMap<>();
		body.put("partnerCode", partnerCode);
		body.put("accessKey", accessKey);
		body.put("requestId", requestId);
		body.put("amount", String.valueOf(amount));
		body.put("orderId", orderIdMomo);
		body.put("orderInfo", orderInfo);
		body.put("redirectUrl", returnUrl);
		body.put("ipnUrl", notifyUrl);
		body.put("requestType", requestType);
		body.put("extraData", extraData);
		body.put("signature", signature);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map<String, Object>> response =
				restTemplate.exchange(
						endpoint,
						HttpMethod.POST,
						new HttpEntity<>(body),
						new ParameterizedTypeReference<Map<String, Object>>() {}
				);
		Map<String, Object> responseBody = response.getBody();
		if (responseBody == null || !responseBody.containsKey("payUrl")) {
			throw new AppException(ErrorCode.PAYMENT_FAILED);
		}
		return (String) response.getBody().get("payUrl");
	}

	private String hmacSHA256(String data) throws Exception {
		Mac hmac = Mac.getInstance("HmacSHA256");
		SecretKeySpec secretKeySpec = new SecretKeySpec(MomoService.secretKey.getBytes(), "HmacSHA256");
		hmac.init(secretKeySpec);
		byte[] hash = hmac.doFinal(data.getBytes());
		return HexFormat.of().formatHex(hash);
	}
}
