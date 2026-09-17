package com.tai.project.dto;

// import com.tai.project.enums.TicketPriority;
import com.tai.project.enums.TicketStatus;

public class UpdateTicketStatusDto {
    private TicketStatus status;

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }
}
