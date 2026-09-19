package com.tai.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.tai.project.dto.CreateTicketDto;
import com.tai.project.dto.GetTicketDto;
import com.tai.project.dto.UpdateTicketStatusDto;
import com.tai.project.enums.TicketPriority;
import com.tai.project.enums.TicketStatus;
import com.tai.project.dto.UpdateTicketPriorityDto;
import com.tai.project.dto.AddCommentDto;
import com.tai.project.dto.GetCommentsDto;

import com.tai.project.service.TicketService;

import java.util.List;


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

    @GetMapping("/tickets/{id}")
    public GetTicketDto getTicket(@PathVariable Long id) {
        return ticketService.getTicket(id);
    }

    @GetMapping("/tickets")
    public Page<GetTicketDto> getTickets(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(required = false) TicketStatus status,
        @RequestParam(required = false) TicketPriority priority 
    ) {
        return ticketService.getTickets(page, size, status, priority);
    }

    @GetMapping("/tickets/{id}/comments")
    public List<GetCommentsDto> getComments(@PathVariable Long id) {
        return ticketService.getComments(id);
    } 

    @PostMapping("/tickets")
    public String createTicket(@RequestBody CreateTicketDto dto) {
        return ticketService.createTicket(dto);
    }

    @PostMapping("/tickets/{id}/comments")
    public String addComment(@PathVariable Long id, @RequestBody AddCommentDto addCommentDto) {
        return ticketService.addComment(id, addCommentDto);
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
