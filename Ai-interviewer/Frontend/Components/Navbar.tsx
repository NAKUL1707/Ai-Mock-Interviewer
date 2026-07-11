
import { useState } from "react";
import hero_image from "../Assets/hero_image.jpg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #f3f4f6" }} className="w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <div className="flex items-center gap-1.5">
           
                        <img
                src={hero_image}
                alt="MockCoach AI Logo"
                className="w-10 h-10 object-contain"
               />
            <span style={{ color: "#111827", fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>
              MockCoach AI
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'About'].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                style={{ color: "#6b7280", fontSize: "13px", textDecoration: "none" }}
                className="hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/Login")}
              style={{ color: "#6b7280", fontSize: "13px", textDecoration: "none" }}
              className="hover:text-gray-900 transition-colors"
            >
              Login
            </button>
            <button
              onClick={()=>navigate("/Signup")}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                padding: "7px 16px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
              className="hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4 border-t border-gray-100">
            {["Features", "About"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(`/#${item.toLowerCase()}`);
                }}
                style={{ color: "#6b7280", fontSize: "13px" }}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/Login");
              }}
              style={{ color: "#6b7280", fontSize: "13px" }}
            >
              Login
            </button>
            <button
              onClick={()=>navigate("/Signup")}
              style={{ backgroundColor: "#2563eb", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "8px 16px", borderRadius: "6px", textAlign: "center" }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}