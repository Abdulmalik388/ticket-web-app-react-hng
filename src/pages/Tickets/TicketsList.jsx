import React, { useEffect, useState } from "react";
import * as ticketService from "../../services/ticketservice";
import TicketForm from "./TicketForm";
import TicketCard from "./TicketCard";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import bgImage from "../../assets/ticket-list-bg.png"; // ✅ IMPORT HERE

export default function TicketsList() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      setTickets(ticketService.listTickets());
    } catch {
      toast.error("Failed to load tickets. Please retry.");
    }
  }, []);

  function handleCreate(data) {
    try {
      const created = ticketService.createTicket(data);
      setTickets((prev) => [created, ...prev]);
      setShowForm(false);
      toast.success("Ticket created");
    } catch {
      toast.error("Failed to create ticket");
    }
  }

  function handleUpdate(id, changes) {
    try {
      const updated = ticketService.updateTicket(id, changes);
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
      setEditing(null);
      toast.success("Ticket updated");
    } catch (err) {
      toast.error("Failed to update ticket");
    }
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this ticket? This action cannot be undone.")) return;
    try {
      ticketService.deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
      toast.success("Ticket deleted");
    } catch {
      toast.error("Failed to delete ticket");
    }
  }

  return (
    <div
      className="tickets-page container-fluid py-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 text-white container">
        <h2 className="fw-semibold text-white">🎟️ Tickets</h2>
        <button
          onClick={() => {
            setShowForm((s) => !s);
            setEditing(null);
          }}
          className="btn btn-light fw-semibold"
        >
          + New Ticket
        </button>
      </div>

      {/* Ticket Form */}
      {showForm && (
        <div className="mb-4">
          <TicketForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Ticket List */}
      <div className="row g-4">
        {tickets.length === 0 ? (
          <div className="col-12">
            <div className="card shadow-sm border-light">
              <div className="card-body text-center text-muted bg-light bg-opacity-75 rounded-4">
                No tickets yet 🚫
              </div>
            </div>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="col-md-6 col-lg-4">
              <div className="card bg-white bg-opacity-90 border-0 shadow-lg rounded-4">
                <TicketCard
                  ticket={ticket}
                  onEdit={() => {
                    setEditing(ticket);
                    setShowForm(false);
                  }}
                  onDelete={() => handleDelete(ticket.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Section */}
      {editing && (
        <div className="mt-5 card card-body bg-light bg-opacity-75 shadow-lg rounded-4">
          <h4 className="fw-semibold mb-3 text-dark">✏️ Edit Ticket</h4>
          <TicketForm
            initialValues={editing}
            onSubmit={(changes) => handleUpdate(editing.id, changes)}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}
    </div>
  );
}
