package com.tai.project.dto;

import com.tai.project.enums.TicketPriority;
import com.tai.project.enums.TicketStatus;

public class UpdateTicketDto {
    private String title;
    private String description;
    private TicketStatus status;
    private TicketPriority priority;
    private String createdBy;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public TicketPriority getPriority() {
        return priority;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPriority(TicketPriority priority) {
        this.priority = priority;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }
}
