package com.tai.project.service;

import com.tai.project.dto.CreateTicketDto;
import com.tai.project.dto.GetTicketDto;
import com.tai.project.repository.TicketRepository;
import com.tai.project.entity.TicketEntity;
import com.tai.project.enums.TicketStatus;
import com.tai.project.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;

@Service 
public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
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
}
