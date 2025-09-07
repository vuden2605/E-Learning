//package com.example.E_Learning.Service;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class MoMoService {
//	private final WebClient webClient;
//	@Value("${momo.endpoint}") private String endpoint;
//	@Value("${momo.partnerCode}") private String partnerCode;
//	@Value("${momo.accessKey}") private String accessKey;
//	@Value("${momo.secretKey}") private String secretKey;
//	@Value("${momo.redirectUrl}") private String redirectUrl;
//	@Value("${momo.ipnUrl}") private String ipnUrl;
//	public Map<String, Object> createPayment(String orderId, String requestId, long amount, String orderInfo) {
//		try {
//			String rawSignature = "accessKey=" + accessKey +
//					"&amount=" + amount +
//					"&extraData=" + "" +
//					"&ipnUrl=" + ipnUrl +
//					"&orderId=" + orderId +
//					"&orderInfo=" + orderInfo +
//					"&partnerCode=" + partnerCode +
//					"&redirectUrl=" + redirectUrl +
//					"&requestId=" + requestId +
//					"&requestType=captureWallet";
//
//			String signature = SignatureUtil.hmacSHA256(rawSignature, secretKey);
//
//			Map<String, Object> payload = new HashMap<>();
//			payload.put("partnerCode", partnerCode);
//			payload.put("accessKey", accessKey);
//			payload.put("requestId", requestId);
//			payload.put("amount", String.valueOf(amount));
//			payload.put("orderId", orderId);
//			payload.put("orderInfo", orderInfo);
//			payload.put("redirectUrl", ipnUrl);
//			payload.put("ipnUrl", redirectUrl);
//			payload.put("lang", "vi");
//			payload.put("extraData", "");
//			payload.put("requestType", "captureWallet");
//			payload.put("signature", signature);
//
//			Map response = webClient.post()
//					.uri(endpoint)
//					.bodyValue(payload)
//					.retrieve()
//					.bodyToMono(Map.class)
//					.block();
//
//			return response;
//		} catch (Exception e) {
//			throw new RuntimeException(e);
//		}
//	}
//}
//}
