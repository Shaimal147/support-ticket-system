package com.tai.project.service;

import com.tai.project.dto.TicketDto;
import com.tai.project.repository.TicketRepository;
import com.tai.project.entity.TicketEntity;

import org.springframework.stereotype.Service;

@Service 
public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public String createTicket(TicketDto dto) {
        TicketEntity ticketEntity = new TicketEntity();

        ticketEntity.setTitle(dto.getTitle());
        ticketEntity.setDescription(dto.getDescription());

        ticketRepository.save(ticketEntity);
        
        return "Ticket created successfully!";
    }
}
