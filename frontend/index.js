const getTicketsBtn = document.getElementById("getTickets-btn");
const createTicketBtn = document.getElementById("createTicket-btn");
const ticketsEl = document.getElementById("tickets-el");
const paginationEl = document.getElementById("pagination-el");
const getTicketForm = document.getElementById("getTicketForm");
const createTicketForm = document.getElementById("createTicketForm");

getTicketsBtn.addEventListener("click", () => {
    getTickets();
})

createTicketBtn.addEventListener("click", () => {
    renderTicketForm();
})

async function getTickets(status = "", priority = "", page = 0) {
    try {
        const params = {
            page: page,
            size: 20
        }
        if (status != "") {
            params.status = status;
        }
        if (priority != "") {
            params.priority = priority;
        }
        const response = await axios.get(
            `http://localhost:8080/tickets`,
            {
                params: params
            }
        );
        renderTickets(response.data.content, status, priority);
        renderPagination(response.data, status, priority);
        console.log(response.data);
    } catch (error) {
        console.error("Error: ", error.message);
        ticketsEl.innerHTML = "";
    }
}

async function createTicket(title, desciption, priority, createdBy) {
    try {
        const response = await axios.post(
            `http://localhost:8080/tickets`,
            {
                title: title,
                description: desciption,
                priority: priority,
                createdBy: createdBy
            }
        );

        console.log(response.data)
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

async function deleteTicket(ticketId) {
    try {
        const response = await axios.delete(`http://localhost:8080/tickets/${ticketId}`);
        console.log(response.data);
        getTickets();
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

async function updateTicketStatus(ticketId, status) {
    try {
        const response = await axios.put(
            `http://localhost:8080/tickets/${ticketId}/status`,
            {
                status: status
            }
        );
        console.log(response.data);
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

async function updateTicketPriority(ticketId, priority) {
    try {
        const response = await axios.put(
            `http://localhost:8080/tickets/${ticketId}/priority`,
            {
                priority: priority
            }
        );
        console.log(response.data);
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

async function getComments(ticketId, commentsEl, page = 0) {
    try {
        const response = await axios.get(`http://localhost:8080/tickets/${ticketId}/comments?page=${page}`);
        console.log(response.data);
        renderComments(ticketId, response.data, commentsEl, page);
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

async function createComment(ticketId, content, author, commentsEl) {
    try {
        const response = await axios.post(
            `http://localhost:8080/tickets/${ticketId}/comments`,
            {
                content: content,
                author: author
            }
        );
        console.log(response.data);
        getComments(ticketId, commentsEl, page = 0);
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

function renderTickets(tickets, status, priority) {
     ticketsEl.innerHTML = "";

     ticketsFilterByStatus = document.createElement("select");
     ticketsFilterByPriority = document.createElement("select");

     filterStatusOption0 = document.createElement("option");
     filterStatusOption1 = document.createElement("option");
     filterStatusOption2 = document.createElement("option");
     filterStatusOption3 = document.createElement("option");
     filterStatusOption4 = document.createElement("option");

     filterPriorityOption0 = document.createElement("option");
     filterPriorityOption1 = document.createElement("option");
     filterPriorityOption2 = document.createElement("option");
     filterPriorityOption3 = document.createElement("option");
     filterPriorityOption4 = document.createElement("option");

     filterStatusOption0.value = "";
     filterStatusOption0.textContent = "No filter";

     filterStatusOption1.value = "OPEN";
     filterStatusOption1.textContent = "Open";

     filterStatusOption2.value = "IN_PROGRESS";
     filterStatusOption2.textContent = "In Progress";

     filterStatusOption3.value = "RESOLVED";
     filterStatusOption3.textContent = "Resolved";

     filterStatusOption4.value = "CLOSED";
     filterStatusOption4.textContent = "Closed";

     filterPriorityOption0.value = "";
     filterPriorityOption0.textContent = "No filter";

     filterPriorityOption1.value = "LOW";
     filterPriorityOption1.textContent = "Low";

     filterPriorityOption2.value = "MEDIUM";
     filterPriorityOption2.textContent = "Medium";

     filterPriorityOption3.value = "HIGH";
     filterPriorityOption3.textContent = "High";

     filterPriorityOption4.value = "URGENT";
     filterPriorityOption4.textContent = "Urgent";

     ticketsEl.appendChild(ticketsFilterByStatus);
     ticketsEl.appendChild(ticketsFilterByPriority);
     ticketsFilterByStatus.appendChild(filterStatusOption0);
     ticketsFilterByStatus.appendChild(filterStatusOption1);
     ticketsFilterByStatus.appendChild(filterStatusOption2);
     ticketsFilterByStatus.appendChild(filterStatusOption3);
     ticketsFilterByStatus.appendChild(filterStatusOption4);
     ticketsFilterByPriority.appendChild(filterPriorityOption0);
     ticketsFilterByPriority.appendChild(filterPriorityOption1);
     ticketsFilterByPriority.appendChild(filterPriorityOption2);
     ticketsFilterByPriority.appendChild(filterPriorityOption3);
     ticketsFilterByPriority.appendChild(filterPriorityOption4);

     ticketsFilterByStatus.value = status;
     ticketsFilterByPriority.value = priority;

     ticketsFilterByStatus.addEventListener("change", () => {
        getTickets(ticketsFilterByStatus.value, ticketsFilterByPriority.value);
     })

     ticketsFilterByPriority.addEventListener("change", () => {
        getTickets(ticketsFilterByStatus.value, ticketsFilterByPriority.value);
     })

    for (const item of tickets) {
        const ticketTitle = document.createElement("h2");
        const ticketDescription = document.createElement("p");
        const ticketPriority = document.createElement("select");
        const priorityOption1 = document.createElement("Option");
        const priorityOption2 = document.createElement("Option");
        const priorityOption3 = document.createElement("Option");
        const priorityOption4 = document.createElement("Option");
        const ticketStatus = document.createElement("select");
        const statusOption1 = document.createElement("option");
        const statusOption2 = document.createElement("option");
        const statusOption3 = document.createElement("option");
        const statusOption4 = document.createElement("option");
        const ticketCreatedAt = document.createElement("p");
        const commentsEl = document.createElement("div");
        const ticketDeleteBtn = document.createElement("button")

        statusOption1.value = "OPEN";
        statusOption1.textContent = "Open";

        statusOption2.value = "IN_PROGRESS";
        statusOption2.textContent = "In Progress";

        statusOption3.value = "RESOLVED";
        statusOption3.textContent = "Resolved";

        statusOption4.value = "CLOSED";
        statusOption4.textContent = "Closed";

        priorityOption1.value = "LOW";
        priorityOption1.textContent = "Low";

        priorityOption2.value = "MEDIUM";
        priorityOption2.textContent = "Medium";
        
        priorityOption3.value = "HIGH";
        priorityOption3.textContent = "High";

        priorityOption4.value = "URGENT";
        priorityOption4.textContent = "Urgent";

        ticketTitle.textContent = `Title: ${item.title}`;
        ticketDescription.textContent = `Description: ${item.description}`;
        ticketCreatedAt.textContent = `Created at: ${item.createdAt}`;
        ticketDeleteBtn.innerText = "Delete ticket"

        ticketsEl.appendChild(ticketTitle);
        ticketsEl.appendChild(ticketDescription);
        ticketsEl.appendChild(ticketPriority);
        ticketsEl.appendChild(ticketStatus);
        ticketStatus.appendChild(statusOption1);
        ticketStatus.appendChild(statusOption2);
        ticketStatus.appendChild(statusOption3);
        ticketStatus.appendChild(statusOption4);
        ticketPriority.appendChild(priorityOption1);
        ticketPriority.appendChild(priorityOption2);
        ticketPriority.appendChild(priorityOption3);
        ticketPriority.appendChild(priorityOption4);

        ticketStatus.value = item.status;
        ticketPriority.value = item.priority;

        ticketsEl.appendChild(ticketCreatedAt);
        ticketsEl.appendChild(commentsEl);

        getComments(item.id, commentsEl);

        ticketsEl.appendChild(ticketDeleteBtn);
        ticketsEl.appendChild(document.createElement("hr"));

        ticketStatus.addEventListener("change", () => {
            updateTicketStatus(item.id, ticketStatus.value);
        })

        ticketPriority.addEventListener("change", () => {
            updateTicketPriority(item.id, ticketPriority.value);
        })

        ticketDeleteBtn.addEventListener("click", () => {
            deleteTicket(item.id);
        })
    }
}

function renderPagination(pagination, status, priority) {
    paginationEl.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    paginationEl.appendChild(prevButton);

    prevButton.disabled = pagination.first;

    prevButton.addEventListener("click", () => {
        getTickets(status, priority, pagination.number - 1);
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    paginationEl.appendChild(nextButton);

    nextButton.disabled = pagination.last;

    nextButton.addEventListener("click", () => {
        getTickets(status, priority, pagination.number + 1);
    });

}

getTicketForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const ticketIdEl = document.getElementById("ticketId-el").value;
    getTicket(ticketIdEl);
})

async function getTicket(id) {
    try {
        const response = await axios.get(`http://localhost:8080/tickets/${id}`);
        renderTicket(response.data);
        console.log(response.data);
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

function renderTicket(ticket) {
    ticketsEl.innerHTML = "";

    const ticketTitle = document.createElement("h2");
    const ticketDescription = document.createElement("p");
    const ticketPriority = document.createElement("p");
    const ticketStatus = document.createElement("p");
    const ticketCreatedAt = document.createElement("p");
    const commentsEl = document.createElement("div");

    ticketTitle.textContent = `Title: ${ticket.title}`;
    ticketDescription.textContent = `Description: ${ticket.description}`;
    ticketPriority.textContent = `Priority: ${ticket.priority}`;
    ticketStatus.textContent = `Status: ${ticket.status}`;
    ticketCreatedAt.textContent = `Created at: ${ticket.createdAt}`;

    ticketsEl.appendChild(ticketTitle);
    ticketsEl.appendChild(ticketDescription);
    ticketsEl.appendChild(ticketPriority);
    ticketsEl.appendChild(ticketStatus);
    ticketsEl.appendChild(ticketCreatedAt);
    ticketsEl.appendChild(commentsEl);
    getComments(ticket.id, commentsEl);
    ticketsEl.appendChild(document.createElement("hr"));
}

function renderTicketForm() {
    createTicketForm.innerHTML = "";

    const ticketTitle = document.createElement("input");
    ticketTitle.placeholder = "Title";

    const ticketDescription = document.createElement("input");
    ticketDescription.placeholder = "Description";

    const ticketPriority = document.createElement("Select");
    const priorityOption1 = document.createElement("option");
    const priorityOption2 = document.createElement("option");
    const priorityOption3 = document.createElement("option");
    const priorityOption4 = document.createElement("option");
    priorityOption1.value = "LOW";
    priorityOption1.textContent = "Low";
    priorityOption2.value = "MEDIUM";
    priorityOption2.textContent = "Medium";
    priorityOption3.value = "HIGH";
    priorityOption3.textContent = "High";
    priorityOption4.value = "URGENT";
    priorityOption4.textContent = "Urgent";

    const name = document.createElement("input");
    name.placeholder = "Name";

    const createTicketSubmitBtn = document.createElement("button");
    createTicketSubmitBtn.type = "submit";
    createTicketSubmitBtn.innerText = "Submit";

    createTicketForm.appendChild(ticketTitle);
    createTicketForm.appendChild(ticketDescription);
    createTicketForm.appendChild(ticketPriority);
    ticketPriority.appendChild(priorityOption1);
    ticketPriority.appendChild(priorityOption2);
    ticketPriority.appendChild(priorityOption3);
    ticketPriority.appendChild(priorityOption4);
    createTicketForm.appendChild(name);
    createTicketForm.appendChild(createTicketSubmitBtn);



    createTicketSubmitBtn.addEventListener("click", () => {
        createTicket(
            ticketTitle.value,
            ticketDescription.value,
            ticketPriority.value,
            name.value
        );
    })
}

function renderComments(ticketId, comments, commentsEl, page) {
    commentsEl.innerHTML = "";

    const newComment = document.createElement("input");
    const submitNewCommentBtn = document.createElement("button");
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");

    for (const comment of comments.content) {
        const commentAuthor = document.createElement("h3");
        const commentContent = document.createElement("p");
        const commentCreatedAt = document.createElement("p");

        commentAuthor.textContent = `Author: ${comment.author}`;
        commentContent.textContent = `Content: ${comment.content}`;
        commentCreatedAt.textContent = `Created at: ${comment.createdAt}`;

        commentsEl.appendChild(commentAuthor);
        commentsEl.appendChild(commentContent);
        commentsEl.appendChild(commentCreatedAt);
    }

    commentsEl.appendChild(newComment);
    commentsEl.appendChild(submitNewCommentBtn);

    newComment.placeholder = "Enter new comment: ";
    submitNewCommentBtn.textContent = "Submit";
    prevButton.textContent = "Previous";
    nextButton.textContent = "Next";

    commentsEl.appendChild(prevButton);
    commentsEl.appendChild(nextButton);

    prevButton.disabled = comments.first;
    nextButton.disabled = comments.last;

    submitNewCommentBtn.addEventListener("click", () => {
        createComment(ticketId, newComment.value, "Hardcoded user", commentsEl);
    })

    prevButton.addEventListener("click", () => {
        getComments(ticketId, commentsEl, page - 1);
    })

    nextButton.addEventListener("click", () => {
        getComments(ticketId, commentsEl, page + 1)
    })
}