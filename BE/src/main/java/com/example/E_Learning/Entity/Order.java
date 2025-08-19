package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private User userId;
	@CreationTimestamp
	private LocalDateTime orderDate;
	@Builder.Default
	private String status = "PENDING";
	private Long totalAmount;
	private String paymentMethod;
	private String transactionId;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
