// Dashboard.tsx
// Place this in: Pages/Dashboard.tsx
//
// On "Start Interview" click, navigates to /interview passing
// { role, focus, difficulty } via React Router state.
// InterviewSession.tsx reads this with useLocation().state

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react";
// ── Icons ──────────────────────────────────────────────────────────────────
const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "React Developer",
  "Node.js Developer",
  "MERN Stack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Data Analyst",
  "Python Developer",
  "Java Developer",
  "C++ Developer",
  "Mobile App Developer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Cloud Solutions Architect",
  "Cybersecurity Specialist",
  "Blockchain Developer",
];



const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const BothIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TechIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const HRIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

const QuickIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────
type FocusOption = "both" | "technical" | "hr" | "quick";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface FocusOptionConfig {
  id: FocusOption;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

const focusOptions: FocusOptionConfig[] = [
  { id: "both",      icon: <BothIcon />,  title: "Both (Technical + HR)",     subtitle: "A balanced comprehensive session" },
  { id: "technical", icon: <TechIcon />,  title: "Technical only",            subtitle: "Focus on skills and architecture" },
  { id: "hr",        icon: <HRIcon />,    title: "HR only",                   subtitle: "Culture fit and behavioral" },
  { id: "quick",     icon: <QuickIcon />, title: "Quick Round (5 questions)", subtitle: "Fast warm-up or daily drill" },
];

const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

// ── Dashboard Page ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [focus, setFocus] = useState<FocusOption>("both");
  const [difficulty, setDifficulty] = useState<Difficulty>("Intermediate");
  const [customRole, setCustomRole] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleStartInterview = () => {
    const role = targetRole.trim() || "Full Stack Developer"; // fallback to placeholder value
    if(!targetRole.trim()) {
      setError("Please enter your target role.");
      return;
    }
    setError("");
    navigate("/interview", {
      state: {
        role,
        focus,
        difficulty,
      },
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* Main content */}
      <main style={{ display: "flex", justifyContent: "center", padding: "40px 16px 80px" }}>
        <div style={{
          background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb",
          padding: "40px 48px", width: "100%", maxWidth: "560px",
        }}>
          {/* Heading */}
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>
            Start Your Practice
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 32px" }}>
            Configure your personalized AI interview experience.
          </p>

          {/* Target role */}
          <section style={{ marginBottom: "28px" }}>
  <label style={{
    display: "block", fontSize: "11px", fontWeight: 600,
    letterSpacing: "0.08em", color: "#6b7280", marginBottom: "10px"
  }}>
    YOUR TARGET ROLE
  </label>

  {/* Dropdown */}
  <select
    value={showCustom ? "Other (type your own)" : targetRole}
    onChange={(e) => {
      if (e.target.value === "Other (type your own)") {
        setShowCustom(true);
        setTargetRole("");
      } else {
        setShowCustom(false);
        setTargetRole(e.target.value);
        if (error) setError("");
      }
    }}
    style={{
      width: "100%", padding: "12px 16px", fontSize: "14px",
      border: `1px solid ${error && !targetRole ? "#dc2626" : "#d1d5db"}`,
      borderRadius: "8px", color: targetRole ? "#111827" : "#9ca3af",
      outline: "none", boxSizing: "border-box", background: "#fff",
      cursor: "pointer", appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 14px center",
    }}
  >
    <option value="" disabled>Select a role...</option>
    {roles.map((role) => (
      <option key={role} value={role}>{role}</option>
    ))}
  </select>

  {/* Custom input — only shows when "Other" is selected */}
  {showCustom && (
    <input
      type="text"
      placeholder="e.g. Flutter Developer"
      value={customRole}
      onChange={(e) => {
        setCustomRole(e.target.value);
        setTargetRole(e.target.value);
        if (error) setError("");
      }}
      style={{
        width: "100%", padding: "12px 16px", fontSize: "14px",
        border: `1px solid ${error && !targetRole ? "#dc2626" : "#d1d5db"}`,
        borderRadius: "8px", color: "#111827", outline: "none",
        boxSizing: "border-box", background: "#fff", marginTop: "10px",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
      autoFocus
    />
  )}

  {error && (
    <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "6px" }}>
      {error}
    </p>
  )}
</section>

          {/* Interview focus */}
          <section style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#6b7280", marginBottom: "12px" }}>
              INTERVIEW FOCUS
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {focusOptions.map((opt) => {
                const selected = focus === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFocus(opt.id)}
                    type="button"
                    style={{
                      padding: "16px 14px", borderRadius: "8px", textAlign: "left", cursor: "pointer",
                      border: selected ? "1.5px solid #2563eb" : "1px solid #e5e7eb",
                      background: selected ? "#eff6ff" : "#fff",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ marginBottom: "8px" }}>{opt.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>
                      {opt.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      {opt.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Difficulty level */}
          <section style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#6b7280", marginBottom: "12px" }}>
              DIFFICULTY LEVEL
            </label>
            <div style={{
              display: "inline-flex", background: "#f3f4f6", borderRadius: "8px", padding: "4px", gap: "2px",
            }}>
              {difficulties.map((d) => {
                const active = difficulty === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    type="button"
                    style={{
                      padding: "7px 20px", borderRadius: "6px", border: "none", cursor: "pointer",
                      fontSize: "13px", fontWeight: active ? 600 : 400,
                      background: active ? "#2563eb" : "transparent",
                      color: active ? "#fff" : "#6b7280",
                      transition: "all 0.15s",
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <button
            
            onClick={handleStartInterview }
            type="button"
            style={{
              width: "100%", padding: "15px 24px", borderRadius: "8px", border: "none",
              background: "#2563eb", color: "#fff", fontSize: "15px", fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "10px", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
          >
            Start Interview <ArrowRightIcon />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "20px", fontSize: "13px", color: "#9ca3af", borderTop: "1px solid #e5e7eb", background: "#fff" }}>
        © 2024 MockCoach AI • Built for high-performance interview preparation.
      </footer>
    </div>
  );
}