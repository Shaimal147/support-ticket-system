package com.tai.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tai.project.entity.TicketEntity;
import com.tai.project.enums.TicketPriority;
import com.tai.project.enums.TicketStatus;

import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    List<TicketEntity> findByStatus(TicketStatus status);
    List<TicketEntity> findByPriority(TicketPriority priority);
    List<TicketEntity> findByStatusAndPriority(TicketStatus status, TicketPriority priority);
}
