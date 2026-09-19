package com.tai.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tai.project.entity.TicketEntity;
import com.tai.project.enums.TicketPriority;
import com.tai.project.enums.TicketStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    Page<TicketEntity> findByStatus(TicketStatus status, Pageable pageable);
    Page<TicketEntity> findByPriority(TicketPriority priority, Pageable pageable);
    Page<TicketEntity> findByStatusAndPriority(TicketStatus status, TicketPriority priority, Pageable pageable);
}
