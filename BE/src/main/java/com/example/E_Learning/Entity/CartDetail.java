package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart_details")
public class CartDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "cart_id")
	private Cart cart;
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	private Integer currentPrice;
}
