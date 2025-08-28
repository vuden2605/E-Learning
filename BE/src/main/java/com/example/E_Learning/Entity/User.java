package com.example.E_Learning.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.type.descriptor.jdbc.NVarcharJdbcType;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (columnDefinition = "NVARCHAR(100)")
    private String fullName;
	private String email;
	private String password;
	private String avatarUrl;
	@Builder.Default
	private String role = "USER";
	@Builder.Default
	private Boolean active = true;
	@CreationTimestamp
	private LocalDateTime createdAt;
}
