import React, { createContext, useContext, useState, useEffect } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  // Load tickets from localStorage on mount
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(savedTickets);
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  // ✅ Create Ticket
  const addTicket = (ticket) => {
    const newTicket = { id: Date.now(), ...ticket };
    setTickets((prev) => [...prev, newTicket]);
  };

  // 🧾 Read Ticket (optional helper)
  const getTicketById = (id) => {
    return tickets.find((ticket) => ticket.id === id);
  };

  // ✏️ Update Ticket
  const updateTicket = (id, updatedTicket) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === id ? { ...ticket, ...updatedTicket } : ticket))
    );
  };

  // ❌ Delete Ticket
  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicket,
        deleteTicket,
        getTicketById,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

// Custom hook for using TicketContext
export const useTickets = () => useContext(TicketContext);
