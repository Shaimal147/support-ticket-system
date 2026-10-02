const ticketsEl = document.getElementById("tickets-el");

async function getTickets() {
    try {
        const response = await axios.get('http://localhost:8080/tickets')
        ticketsEl.innerHTML = "";
        for (const item of response.data.content) {
            const ticketEl = document.createElement("p");
            ticketEl.textContent = `Title: ${item.title} | Description: ${item.description} |  Priority: ${item.priority} | Status: ${item.status} | Created at: ${item.createdAt}`;
            ticketsEl.appendChild(ticketEl);
        }
        console.log(response.data.content);
    } catch (error) {
        console.error("Error: ", error.message);
    }
}