import hero_image from "../Assets/hero_image.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../Components/SignupForm";

export default function Signup() {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const handleSuccess = (data: { fullName: string; email: string }) => {
    navigate("/dashboard");
    console.log("Account created:", data);
  };

  const handleError = (message: string) => {
    setSignupError(message);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Main content ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "48px 16px 40px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
          }}
        >
         
           <img
                src={hero_image}
                alt="MockCoach AI Logo"
                className="w-10 h-10 object-contain"
               />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "-0.01em",
            }}
          >
            MockCoach AI
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Create your account
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Start your AI-powered career coaching journey today.
        </p>

        {/* Card shell */}
        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "32px 32px 28px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          {signupError && (
            <div
              style={{
                marginBottom: "14px",
                padding: "10px 12px",
                borderRadius: "8px",
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
                border: "1px solid #fecaca",
                fontSize: "13px",
              }}
            >
              {signupError}
            </div>
          )}
          <SignupForm onSuccess={handleSuccess} onError={handleError} />
        </div>

        {/* Already have account */}
        <p
          style={{
            marginTop: "24px",
            fontSize: "13.5px",
            color: "#6b7280",
          }}
        >
          Already have an account?{" "}
          <button
            onClick={() => navigate("/Login")}
            style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}
          >
            Login
          </button>
        </p>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Left — brand + copyright */}
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>
            MockCoach AI
          </p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>
            © 2024 MockCoach AI. All rights reserved.
          </p>
        </div>

        {/* Right — links */}
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy Policy", "Terms of Service", "Contact Support", "Twitter"].map((link) => (
            <button
              onClick={() =>navigate("/Login")}
              
              style={{
                fontSize: "12px",
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              {link}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}