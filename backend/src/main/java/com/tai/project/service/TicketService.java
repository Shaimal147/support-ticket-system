package com.tai.project.service;

import com.tai.project.dto.CreateTicketDto;
import com.tai.project.dto.GetTicketDto;
import com.tai.project.dto.UpdateTicketStatusDto;
import com.tai.project.dto.UpdateTicketPriorityDto;
import com.tai.project.dto.AddCommentDto;

import com.tai.project.repository.CommentRepository;
import com.tai.project.repository.TicketRepository;

import com.tai.project.entity.TicketEntity;
import com.tai.project.entity.CommentEntity;

import com.tai.project.enums.TicketStatus;

import com.tai.project.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service 
public class TicketService {
    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;

    public TicketService(
        TicketRepository ticketRepository, CommentRepository commentRepository
    ) {
        this.ticketRepository = ticketRepository;
        this.commentRepository = commentRepository;
    }

    public String createTicket(CreateTicketDto createTicketDto) {
        TicketEntity ticketEntity = new TicketEntity();

        ticketEntity.setTitle(createTicketDto.getTitle());
        ticketEntity.setDescription(createTicketDto.getDescription());
        ticketEntity.setStatus(TicketStatus.OPEN);
        ticketEntity.setPriority(createTicketDto.getPriority());
        ticketEntity.setCreatedBy(createTicketDto.getCreatedBy());

        ticketRepository.save(ticketEntity);

        return "Ticket created successfully!";
    }

    public GetTicketDto getTicket(Long id) {
        TicketEntity entity = ticketRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Ticket not found with ID: %d".formatted(id))
        );
        GetTicketDto getTicketDto = new GetTicketDto();

        getTicketDto.setId(entity.getId());
        getTicketDto.setTitle(entity.getTitle());
        getTicketDto.setDescription(entity.getDescription());
        getTicketDto.setStatus(entity.getStatus());
        getTicketDto.setPriority(entity.getPriority());
        getTicketDto.setCreatedAt(entity.getCreatedAt());
        getTicketDto.setUpdatedAt(entity.getUpdatedAt());
        getTicketDto.setCreatedBy(entity.getCreatedBy());

        return getTicketDto;
    }

    public List<GetTicketDto> getTickets() {
        List<GetTicketDto> tickets = new ArrayList<>();
        List<TicketEntity> entities = ticketRepository.findAll();

        for (TicketEntity entity : entities) {
            GetTicketDto getTicketDto = new GetTicketDto();

            getTicketDto.setId(entity.getId());
            getTicketDto.setTitle(entity.getTitle());
            getTicketDto.setDescription(entity.getDescription());
            getTicketDto.setStatus(entity.getStatus());
            getTicketDto.setPriority(entity.getPriority());
            getTicketDto.setCreatedAt(entity.getCreatedAt());
            getTicketDto.setUpdatedAt(entity.getUpdatedAt());
            getTicketDto.setCreatedBy(entity.getCreatedBy());

            tickets.add(getTicketDto);
        }

        if (!tickets.isEmpty()) {
            return tickets;
        } else {
            throw new ResourceNotFoundException("No Tickets found.");
        }
    }

    public String updateTicketStatus(Long id, UpdateTicketStatusDto updateTicketStatusDto) {
        TicketEntity entity = ticketRepository.findById(id).orElseThrow(
             () -> new ResourceNotFoundException("Ticket not found with ID: %d".formatted(id))
        );

        entity.setStatus(updateTicketStatusDto.getStatus());
        ticketRepository.save(entity);

        return "Status changed Successfully";
    }

    public String updateTicketPriority(Long id, UpdateTicketPriorityDto updateTicketPriorityDto) {
        TicketEntity entity = ticketRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Ticket not found with ID: %d".formatted(id))
        );

        entity.setPriority(updateTicketPriorityDto.getPriority());
        ticketRepository.save(entity);

        return "Priority changed successfully";
    }

    public String deleteTicket(Long id) {
        if (!ticketRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ticket not found with ID: %d".formatted(id));
        };

        ticketRepository.deleteById(id);
        return "Successfully deleted";
    }

    public String addComment(Long id, AddCommentDto addCommentDto) {
        CommentEntity commentEntity = new CommentEntity();
        TicketEntity ticketEntity = ticketRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Ticket not found with ID: %d".formatted(id))
        );

        commentEntity.setContent(addCommentDto.getContent());
        commentEntity.setAuthor(addCommentDto.getAuthor());
        commentEntity.setTicketId(ticketEntity);

        commentRepository.save(commentEntity);

        return "Comment successfully added.";
    }
}
