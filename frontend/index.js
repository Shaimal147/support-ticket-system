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

async function getTickets(page = 0) {
    try {
        const response = await axios.get(`http://localhost:8080/tickets?page=${page}&size=20`);
        renderTickets(response.data.content);
        renderPagination(response.data);
        console.log(response.data);
    } catch (error) {
        console.error("Error: ", error.message);
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

function renderTickets(tickets) {
     ticketsEl.innerHTML = "";

    for (const item of tickets) {
        const ticketTitle = document.createElement("h2");
        const ticketDescription = document.createElement("p");
        const ticketPriority = document.createElement("p");
        const ticketStatus = document.createElement("p");
        const ticketCreatedAt = document.createElement("p");

        ticketTitle.textContent = `Title: ${item.title}`;
        ticketDescription.textContent = `Description: ${item.description}`;
        ticketPriority.textContent = `Priority: ${item.priority}`;
        ticketStatus.textContent = `Status: ${item.status}`;
        ticketCreatedAt.textContent = `Created at: ${item.createdAt}`;

        ticketsEl.appendChild(ticketTitle);
        ticketsEl.appendChild(ticketDescription);
        ticketsEl.appendChild(ticketPriority);
        ticketsEl.appendChild(ticketStatus);
        ticketsEl.appendChild(ticketCreatedAt);
        ticketsEl.appendChild(document.createElement("hr"));
    }
}

function renderPagination(pagination) {
    paginationEl.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    paginationEl.appendChild(prevButton);

    prevButton.disabled = pagination.first;

    prevButton.addEventListener("click", () => {
        getTickets(pagination.number - 1);
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    paginationEl.appendChild(nextButton);

    nextButton.disabled = pagination.last;

    nextButton.addEventListener("click", () => {
        getTickets(pagination.number + 1);
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