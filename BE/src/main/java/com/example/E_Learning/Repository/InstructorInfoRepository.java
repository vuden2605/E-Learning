package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.InstructorInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorInfoRepository extends JpaRepository<InstructorInfo, Long> {

}
