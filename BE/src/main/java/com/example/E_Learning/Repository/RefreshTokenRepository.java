package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.RefreshToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.beans.Transient;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	@Modifying
	int deleteByUserId(Long userId);
	@Modifying
	@Query("UPDATE RefreshToken r SET r.token = :token WHERE r.user.id = :userId")
	int updateTokenByUserId(@Param("token") String refreshToken, @Param("userId") Long userId);

}
