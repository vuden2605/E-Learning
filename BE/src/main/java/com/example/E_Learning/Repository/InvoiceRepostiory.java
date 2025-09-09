package com.example.E_Learning.Repository;

import com.example.E_Learning.Entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepostiory extends JpaRepository<Invoice,Long> {
}
