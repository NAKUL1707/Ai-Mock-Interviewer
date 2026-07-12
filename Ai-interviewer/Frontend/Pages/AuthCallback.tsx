import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "center", minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
    }}>
      <p style={{ color: "#6b7280" }}>Signing you in...</p>
    </div>
  );
}