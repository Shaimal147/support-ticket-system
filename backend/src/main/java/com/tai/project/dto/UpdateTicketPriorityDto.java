package com.tai.project.dto;

import com.tai.project.enums.TicketPriority;

public class UpdateTicketPriorityDto {
    private TicketPriority priority;

    public TicketPriority getPriority() {
        return priority;
    }

    public void setPriority(TicketPriority priority) {
        this.priority = priority;
    }
}