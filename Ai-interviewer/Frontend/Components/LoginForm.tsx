
import { useState, type ChangeEvent, type FormEvent } from "react";
import { loginUser } from "../src/Services/api";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSuccess?: (data: FormData) => void;
  onError?: (message: string) => void;
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ── Validation ──────────────────────────────────────────────────
  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!formData.email.trim())
      e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email address.";
    if (!formData.password)
      e.password = "Password is required.";
    else if (formData.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    return e;
  };

  // ── Handlers ────────────────────────────────────────────────────
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      await loginUser(formData.email, formData.password);
      onSuccess?.(formData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again.";
      setSubmitError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>

      {/* OAuth buttons */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>

        {/* Google */}
        <button
          type="button"
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", border: "1.5px solid #d1d5db", borderRadius: "7px", backgroundColor: "#ffffff", padding: "10px 14px", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: "#374151" }}
        >
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Google
        </button>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.08em" }}>
          OR CONTINUE WITH EMAIL
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
      </div>

      {/* Email */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${errors.email ? "#ef4444" : "#d1d5db"}`, borderRadius: "7px", fontSize: "13.5px", color: "#111827", outline: "none", backgroundColor: "#ffffff", boxSizing: "border-box" as const }}
        />
        {errors.email && (
          <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>Password</label>
          <a href="/forgot-password" style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
            Forgot password?
          </a>
        </div>
        <div style={{ position: "relative" as const }}>
          <input
            type={showPw ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px 40px 10px 14px", border: `1.5px solid ${errors.password ? "#ef4444" : "#d1d5db"}`, borderRadius: "7px", fontSize: "13.5px", color: "#111827", outline: "none", backgroundColor: "#ffffff", boxSizing: "border-box" as const }}
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            style={{ position: "absolute" as const, right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9ca3af" }}
          >
            {showPw ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{errors.password}</p>
        )}
      </div>

      {submitError && (
        <p style={{ marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#ef4444" }}>
          {submitError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{ width: "100%", padding: "12px", backgroundColor: loading ? "#93c5fd" : "#2563eb", color: "#ffffff", fontSize: "14px", fontWeight: 600, border: "none", borderRadius: "7px", cursor: loading ? "not-allowed" : "pointer", transition: "background-color 0.15s" }}
      >
        {loading ? "Logging in…" : "Login"}
      </button>
    </form>
  );
}