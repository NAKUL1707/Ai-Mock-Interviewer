
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { registerUser } from "../src/Services/api";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  agreed: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  agreed?: string;
}

interface SignupFormProps {
  onSuccess?: (data: FormData) => void;
  onError?: (message: string) => void;
}

export default function SignupForm({ onSuccess, onError }: SignupFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    agreed: false,
  });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  // ── Validation ──────────────────────────────────────────────────
  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!formData.fullName.trim())
      e.fullName = "Full name is required.";
    if (!formData.email.trim())
      e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email address.";
    if (!formData.password)
      e.password = "Password is required.";
    else if (formData.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (!formData.agreed)
      e.agreed = "You must agree to continue.";
    return e;
  };

  // ── Handlers ────────────────────────────────────────────────────
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
    try {
      await registerUser(formData.email, formData.password, formData.fullName);
      onSuccess?.(formData);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong while creating your account.";
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
          onClick={() => console.log("Google OAuth — wire up here")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "1.5px solid #d1d5db",
            borderRadius: "7px",
            backgroundColor: "#ffffff",
            padding: "10px 14px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            color: "#374151",
          }}
        >
          {/* Google "G" SVG */}
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

      {/* Full Name */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: `1.5px solid ${errors.fullName ? "#ef4444" : "#d1d5db"}`,
            borderRadius: "7px",
            fontSize: "13.5px",
            color: "#111827",
            outline: "none",
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
          }}
        />
        {errors.fullName && (
          <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: `1.5px solid ${errors.email ? "#ef4444" : "#d1d5db"}`,
            borderRadius: "7px",
            fontSize: "13.5px",
            color: "#111827",
            outline: "none",
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
          }}
        />
        {errors.email && (
          <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>Password</label>
          <span style={{ fontSize: "10px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em" }}>
            MIN. 8 CHARACTERS
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 40px 10px 14px",
              border: `1.5px solid ${errors.password ? "#ef4444" : "#d1d5db"}`,
              borderRadius: "7px",
              fontSize: "13.5px",
              color: "#111827",
              outline: "none",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
          />
          {/* Show/hide toggle */}
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#9ca3af",
            }}
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

      {/* Checkbox */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            style={{
              width: "15px",
              height: "15px",
              marginTop: "2px",
              accentColor: "#2563eb",
              flexShrink: 0,
              cursor: "pointer",
            }}
          />
          <span style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5 }}>
            I agree to the{" "}
            <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>Privacy Policy</a>.
          </span>
        </label>
        {errors.agreed && (
          <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>{errors.agreed}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#93c5fd" : "#2563eb",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 600,
          border: "none",
          borderRadius: "7px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.15s",
        }}
      >
        {loading ? "Creating Account…" : "Create Account"}
      </button>
    </form>
  );
}