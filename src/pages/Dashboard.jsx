import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as ticketService from "../services/ticketService"; // fixed typo (ticketService.js)

function StatsCard({ title, value, color }) {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card shadow-sm border-0 rounded-4 text-center h-100 bg-${color} bg-opacity-10`}>
        <div className="card-body py-4">
          <h6 className="text-muted mb-2">{title}</h6>
          <h3 className="fw-bold text-dark">{value}</h3>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const tickets = ticketService.listTickets();
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <div
      className="dashboard-page"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #eef2ff, #ffffff)",
        backgroundImage: "url('/src/assets/dashboard-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "80px",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2 text-primary">Dashboard Overview</h1>
          <p className="text-muted">
            Manage and monitor your ticket activities at a glance.
          </p>
        </div>

        <div className="row">
          <StatsCard title="Total Tickets" value={total} color="primary" />
          <StatsCard title="Open Tickets" value={open} color="warning" />
          <StatsCard title="Resolved Tickets" value={resolved} color="success" />
        </div>

        <div className="text-center mt-5">
          <Link
            to="/tickets"
            className="btn btn-primary btn-lg px-4 py-2 shadow-sm rounded-pill"
          >
            Manage Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
