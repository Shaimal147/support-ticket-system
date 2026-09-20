package com.tai.project.repository;

import com.tai.project.entity.CommentEntity;
import com.tai.project.entity.TicketEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentRepository extends JpaRepository<CommentEntity, Long>{
    Page<CommentEntity> findByTicket(TicketEntity ticket, Pageable pageable);
}
