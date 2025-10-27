import React from "react";
import { statusMap } from "../../utils/statusColors";

export default function TicketCard({ ticket, onEdit, onDelete }) {
  const status = statusMap[ticket.status] || statusMap.open;

  return (
    <div className="card shadow-lg border-0 rounded-4 h-100 bg-white bg-opacity-75 p-3">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-dark mb-0">{ticket.title}</h5>
          <span
            className={`badge bg-${status.color || "secondary"} text-uppercase px-3 py-2 rounded-pill`}
            style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}
          >
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted small mb-4">
          {ticket.description ? (
            ticket.description
          ) : (
            <em>No description provided</em>
          )}
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button
            onClick={onEdit}
            className="btn btn-sm btn-outline-primary fw-semibold px-3 rounded-pill shadow-sm"
          >
            ✏️ Edit
          </button>
          <button
            onClick={onDelete}
            className="btn btn-sm btn-outline-danger fw-semibold px-3 rounded-pill shadow-sm"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
