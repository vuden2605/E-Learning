package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.mapping.ToOne;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CartDetail> cartDetails = new ArrayList<>();
}
