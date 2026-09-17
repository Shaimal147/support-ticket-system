package com.tai.project.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.tai.project.dto.CreateTicketDto;
import com.tai.project.dto.GetTicketDto;
import com.tai.project.dto.UpdateTicketStatusDto;
import com.tai.project.dto.UpdateTicketPriorityDto;
import com.tai.project.service.TicketService;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping()
    public String testFunction() {
        return "Hello World";
    }

    @PostMapping("/tickets")
    public String createTicket(@RequestBody CreateTicketDto dto) {
        return ticketService.createTicket(dto);
    }

    @GetMapping("/tickets/{id}")
    public GetTicketDto getTicket(@PathVariable Long id) {
        return ticketService.getTicket(id);
    }

    @GetMapping("/tickets")
    public List<GetTicketDto> getTickets() {
        return ticketService.getTickets();
    }

    @PutMapping("/tickets/{id}/status")
    public String updateTicketStatus(@PathVariable Long id, @RequestBody UpdateTicketStatusDto updateTicketStatusDto) {
        return ticketService.updateTicketStatus(id, updateTicketStatusDto);
    }

    @PutMapping("/tickets/{id}/priority")
    public String updateTicketPriority(@PathVariable Long id, @RequestBody UpdateTicketPriorityDto updateTicketPriorityDto) {
        return ticketService.updateTicketPriority(id, updateTicketPriorityDto);
    }

    @DeleteMapping("/tickets/{id}")
    public String deleteTicket(@PathVariable Long id) {
        return ticketService.deleteTicket(id);
    }
}
