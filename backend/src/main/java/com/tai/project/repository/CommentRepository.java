package com.tai.project.repository;

import com.tai.project.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long>{
    
}
