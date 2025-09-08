package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "order_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	private Long price;
	private Long discount;
	private Long finalPrice;
}
