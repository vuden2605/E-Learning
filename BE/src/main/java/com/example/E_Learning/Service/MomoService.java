package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.MoMoPaymentRequest;
import com.example.E_Learning.Entity.*;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
	@Value("${app.momo.return.url}")
	private static final String returnUrl = "";
	@Value("${app.momo.notify.url}")
	private static final String notifyUrl = "";
	private static final String endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
	private final OrderRepository orderRepository;
	private final CourseRepository courseRepository;
	private final UserRepository userRepository;
	private final InvoiceRepostiory invoiceRepostiory;
	private final EnrollmentRepository enrollmentRepository;
	private final CartRepository cartRepository;
	private final CartDetailRepository cartDetailRepository;
	@Transactional
	public String createPayment(MoMoPaymentRequest moMoPaymentRequest, Long userId) throws Exception {
		List<Long> courseIds = new ArrayList<>();
		if (moMoPaymentRequest != null) {
			courseIds = moMoPaymentRequest.getCourseIds();
		}
		else {
			User currentUser = userRepository.findById(userId)
					.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

			Cart cart = cartRepository.findByUserId(currentUser.getId())
					.orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

			List<CartDetail> cartDetails = cartDetailRepository.findByCartId(cart.getId());
			courseIds = cartDetails.stream()
					.map(cartDetail -> cartDetail.getCourse().getId())
					.toList();
		}
		if (courseIds.isEmpty()){
			return "No item to pay";
		}
		// Create order
		Order order = Order.builder()
				.user(userRepository.getReferenceById(userId))
				.paymentMethod("Momo")
				.build();
		long amount = 0;
		for (long courseId : courseIds) {
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
	@Transactional
	public String handleMomoNotify(Map<String,Object> payload) {
		if (payload.containsKey("resultCode")) {
			int resultCode = Integer.parseInt(payload.get("resultCode").toString());
			if (resultCode != 0) {
				return ErrorCode.PAYMENT_FAILED.getMessage();
			}
			else {
				if (payload.containsKey("orderId")) {
					long orderId = Integer.parseInt(payload.get("orderId").toString().split("-")[0]);
					Order order = orderRepository.findById(orderId)
							.orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
					order.setStatus("Success");
					orderRepository.save(order);
					Invoice invoice = Invoice.builder()
							.order(order)
							.amount(Long.parseLong(payload.get("amount").toString()))
							.method("Momo")
							.build();
					invoiceRepostiory.save(invoice);
					List<Course> courses = order.getOrderDetails()
							.stream()
							.map(OrderDetail::getCourse)
							.toList();
					List<Enrollment> enrollments = courses
							.stream()
							.map(course -> Enrollment.builder()
									.course(course)
									.user(order.getUser())
									.build())
							.toList();
					enrollmentRepository.saveAll(enrollments);
					courses.forEach(course -> course.setStudentCount(course.getStudentCount()+1));
					courseRepository.saveAll(courses);
					User user = order.getUser();
					Cart cart = cartRepository.findByUserId(user.getId())
							.orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
					List<CartDetail> cartDetails = cartDetailRepository.findByCartId(cart.getId());
					cartDetailRepository.deleteAll(cartDetails);

					return "Pay success";
				}
			}

		}
		return ErrorCode.PAYMENT_FAILED.getMessage();
	}
	private String hmacSHA256(String data) throws Exception {
		Mac hmac = Mac.getInstance("HmacSHA256");
		SecretKeySpec secretKeySpec = new SecretKeySpec(MomoService.secretKey.getBytes(), "HmacSHA256");
		hmac.init(secretKeySpec);
		byte[] hash = hmac.doFinal(data.getBytes());
		return HexFormat.of().formatHex(hash);
	}
}