import React from "react";

const TicketCard = ({ image, title, price, description }) => {
  return (
    <div className="ticket-card">
      <img src={image} alt={title} className="ticket-image" />
      <div className="ticket-content">
        <h3 className="ticket-title">{title}</h3>
        <p className="ticket-description">{description}</p>
        <p className="ticket-price">{price}</p>
        <button className="ticket-btn">Book Now</button>
      </div>
    </div>
  );
};

export default TicketCard;
