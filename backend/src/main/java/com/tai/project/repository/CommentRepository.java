package com.tai.project.repository;

import com.tai.project.entity.CommentEntity;
import com.tai.project.entity.TicketEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long>{
    List<CommentEntity> findByticket(TicketEntity ticket);
}
