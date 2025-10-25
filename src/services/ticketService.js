const TICKET_KEY = "tickets";

// Get tickets stats
export function getTicketsStats() {
    const tickets = JSON.parse(localStorage.getItem(TICKET_KEY)) || [];
    const stats =  tickets.reduce((acc,ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1;
        return acc;
    }, {});

    const open = stats.open || 0;
    const in_progress = stats.in_progress || 0

    return { 
        total: tickets.length,
        closed: stats.closed || 0,
        open: open + in_progress
    }
}

// Get all tickets
export function getAllTickets() {
    return JSON.parse(localStorage.getItem(TICKET_KEY))
}

// Get ticket by id
export function getTicketById(id) {
    return JSON.parse(localStorage.getItem(TICKET_KEY)).filter(t => t.id == id)[0]
}

// Create a new ticket
export function createTicket({title, description, status, priority}) {
    const tickets = JSON.parse(localStorage.getItem(TICKET_KEY)) || [];

    tickets.push({
        id: Date.now(),
        title,
        description,
        status,
        priority,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
    });

    localStorage.setItem(TICKET_KEY, JSON.stringify(tickets));
}

// Edit ticket
export function editTicket({id,title,description,status,priority}) {
    const tickets = JSON.parse(localStorage.getItem(TICKET_KEY)) || [];

    const ticket = tickets.map(t => 
        t.id == id ? {...t, id, title, description, status, priority, updatedAt: new Date().toLocaleString() } : t
    );

    localStorage.setItem(TICKET_KEY, JSON.stringify(ticket));
}

// Delete ticket
export function deleteTicket(id) {
    let tickets = JSON.parse(localStorage.getItem(TICKET_KEY)) || [];

    tickets = tickets.filter(t => t.id !== id);

    localStorage.setItem(TICKET_KEY, JSON.stringify(tickets));
}