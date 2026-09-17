package com.tai.project.dto;

public class AddCommentDto {
    private String content;
    private String author;
    private Long ticketId;

    public String getContent() {
        return content;
    }

    public String getAuthor() {
        return author;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }
}
