package com.tai.project.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.tai.project.dto.CreateTicketDto;
import com.tai.project.dto.GetTicketDto;
import com.tai.project.service.TicketService;

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
}
