package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "material_id")
	private Material material;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@Column(columnDefinition = "NVARCHAR(MAX)")
	private String content;
	@CreationTimestamp
	private LocalDateTime createdAt;
	@ManyToOne
	@JoinColumn(name = "parent_id")
	private Message parent;
	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
	private List<Message> replies = new ArrayList<>();
}
