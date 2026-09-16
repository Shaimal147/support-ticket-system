package com.tai.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tai.project.entity.TicketEntity;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    
}
