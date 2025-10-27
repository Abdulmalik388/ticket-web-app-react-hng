import React, { useState } from "react";
import { validateTicket, allowedStatuses } from "../../utils/validators";

export default function TicketForm({ initialValues = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initialValues.title || "",
    description: initialValues.description || "",
    status: initialValues.status || "open",
    priority: initialValues.priority || "low",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validateTicket(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    try {
      onSubmit(form);
    } catch (err) {
      setErrors({ form: err.message || "Failed to save ticket" });
    }
  }

  return (
    <div className="container my-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h4 className="card-title mb-3 fw-bold text-primary">
            {initialValues.id ? "Edit Ticket" : "Create Ticket"}
          </h4>

          {errors.form && (
            <div className="alert alert-danger py-2">{errors.form}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`form-control ${
                  errors.title ? "is-invalid" : ""
                }`}
                placeholder="Enter ticket title"
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="form-control"
                placeholder="Describe the issue or request"
              ></textarea>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={`form-select ${
                    errors.status ? "is-invalid" : ""
                  }`}
                >
                  {allowedStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-outline-secondary px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
