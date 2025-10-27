function Footer() {
  return (
    <footer className="bg-light text-center py-4 mt-5 border-top">
      <div className="container">
        <p className="mb-1 fw-semibold">TicketApp — Manage your support tickets efficiently.</p>
        <p className="text-muted small mb-0">
          © {new Date().getFullYear()} TicketApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
