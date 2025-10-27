import React from "react";
import heroWave from "../../src/assets/wave.jpg";
import circle1 from "../../src/assets/circle1.png";
import circle2 from "../../src/assets/circle2.png";

function Landing() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="text-center text-white d-flex align-items-center justify-content-center position-relative"
        style={{
          height: "90vh",
          width: "100%",
          background: `url(${heroWave}) no-repeat center center/cover`,
          overflow: "hidden",
        }}
      >
        {/* Decorative Circles */}
        <img
          src={circle1}
          alt="decorative circle"
          className="position-absolute"
          style={{
            top: "40px",
            left: "60px",
            width: "120px",
            opacity: "0.9",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <img
          src={circle2}
          alt="decorative circle"
          className="position-absolute"
          style={{
            bottom: "50px",
            right: "80px",
            width: "140px",
            opacity: "0.9",
            animation: "float 5s ease-in-out infinite",
          }}
        />

        {/* Hero Text */}
        <div
          className="p-4 rounded"
         
        >
          <h1 className="fw-bold mb-3 display-4">Welcome to TicketApp 🎟️</h1>
          <p className="lead mb-4">
            Manage and track support tickets with ease and efficiency.
          </p>
          <a href="/signup" className="btn btn-light btn-lg shadow">
            Get Started
          </a>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <i className="bi bi-speedometer2 text-primary fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Fast Ticket Management</h5>
                <p className="text-muted">
                  Create, update, and resolve tickets quickly with our optimized workflow.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <i className="bi bi-people text-success fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Collaborate Easily</h5>
                <p className="text-muted">
                  Work together with your team to resolve issues and boost productivity.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <i className="bi bi-graph-up text-danger fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Track Performance</h5>
                <p className="text-muted">
                  View insights and monitor support performance in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLOAT ANIMATION ===== */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </>
  );
}

export default Landing;
