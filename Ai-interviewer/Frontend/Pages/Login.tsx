import hero_image from "../Assets/hero_image.jpg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm";

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const handleSuccess = (data: { email: string }) => {
    setLoginError("");
    console.log("Logged in:", data);
    navigate("/dashboard");
  };

  const handleError = (message: string) => {
    setLoginError(message);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", flexDirection: "column" as const }}>

      {/* ── Main content ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" as const, alignItems: "center", padding: "48px 16px 40px" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <img
                          src={hero_image}
                          alt="MockCoach AI Logo"
                          className="w-10 h-10 object-contain"
                         />
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }}>
            MockCoach AI
          </span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", textAlign: "center", marginBottom: "10px" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center", marginBottom: "32px" }}>
          Log in to continue your coaching journey
        </p>

        {/* Card shell */}
        <div style={{ width: "100%", maxWidth: "440px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px 32px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {loginError && (
            <p style={{ marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#ef4444" }}>
              {loginError}
            </p>
          )}
          <LoginForm onSuccess={handleSuccess} onError={handleError} />
        </div>

        {/* Don't have account */}
        <p style={{ marginTop: "24px", fontSize: "13.5px", color: "#6b7280" }}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/Signup")}
            style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}
          >
            Sign up
          </button>
        </p>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #e5e7eb", backgroundColor: "#ffffff", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "12px" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>MockCoach AI</p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>© 2024 MockCoach AI. All rights reserved.</p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy Policy", "Terms of Service", "Contact Support", "Twitter"].map((link) => (
            <a key={link} href="#" style={{ fontSize: "12px", color: "#6b7280", textDecoration: "none" }}>{link}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}