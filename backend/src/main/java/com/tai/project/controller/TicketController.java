package com.tai.project.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.tai.project.dto.CreateTicketDto;
import com.tai.project.dto.GetTicketDto;
import com.tai.project.dto.UpdateTicketDto;
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
    public String updateTicketStatus(@PathVariable Long id, @RequestBody UpdateTicketDto updateTicketDto) {
        return ticketService.updateTicketStatus(id, updateTicketDto);
    }
}
