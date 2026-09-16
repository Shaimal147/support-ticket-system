package com.tai.project.service;
import com.tai.project.dto.TicketDto;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service 
public class TicketService {
    Map<String, String> tickets = new HashMap<>();

    public String createTicket(TicketDto dto) {
        tickets.put(dto.getTitle(), dto.getDescription());
        return "Ticket created sucessfully!";
    }
}
