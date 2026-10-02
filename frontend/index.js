const ticketsEl = document.getElementById("tickets-el");
const paginationEl = document.getElementById("pagination-el");

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