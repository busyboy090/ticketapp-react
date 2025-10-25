import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <>
      {/* ===== Header ===== */}
      <Header />

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Manage Tickets Easily Across Teams</h1>
          <p>Track, resolve, and organize your tickets with a seamless experience.</p>

          <div className="hero-buttons">
            <Link to="/auth/signup" className="btn primary">Get Started</Link>
            <Link to="/auth/login" className="btn secondary">Login</Link>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>

        {/* Wavy SVG Background */}
        <svg
          className="wave"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"
            fill="#f3f4f6"
          ></path>
        </svg>
      </section>

      {/* ===== Feature Section ===== */}
      <section className="features">
        <div className="grid">
          <div className="card">
            <h3>💡 Create Tickets</h3>
            <p>Open new issues or requests instantly with a simple form.</p>
          </div>
          <div className="card">
            <h3>📊 Track Progress</h3>
            <p>View real-time ticket statuses and updates on your dashboard.</p>
          </div>
          <div className="card">
            <h3>✅ Resolve Faster</h3>
            <p>Collaborate and close tickets efficiently with your team.</p>
          </div>
        </div>
      </section>
    </>
  );
}
