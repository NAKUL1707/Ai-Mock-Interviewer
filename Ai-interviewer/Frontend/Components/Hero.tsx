
import Features from "./Features";

export default function Hero() {
  return (
    <>
      {/* Inject responsive rule once */}
      <style>{`
        .hero-section {
          background-color: #ffffff;
          padding: 72px 0 80px;
        }
        .hero-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-headline {
            font-size: 34px !important;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-grid">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2563eb", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "16px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#2563eb">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Next-Gen Interview Prep
            </div>

            {/* Headline */}
            <h1
              className="hero-headline"
              style={{ fontSize: "48px", fontWeight: 700, color: "#111827", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "20px", margin: "0 0 20px 0" }}
            >
              Master your next <br />
              interview with{" "}
              <span style={{ color: "#2563eb" }}>AI.</span>
            </h1>

            {/* Subheadline */}
            <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.65, maxWidth: "420px", margin: "0 0 32px 0" }}>
              Practice with realistic AI-driven mock interviews, get instant feedback, and land your dream job. The smartest way to prepare for top-tier roles.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", flexWrap: "wrap" as const }}>
              <a
                href="#"
                style={{ backgroundColor: "#2563eb", color: "#ffffff", fontSize: "14px", fontWeight: 600, padding: "10px 22px", borderRadius: "7px", textDecoration: "none", display: "inline-block" }}
              >
                Start for Free
              </a>
              <a
                href="#"
                style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "1.5px solid #e5e7eb", color: "#374151", fontSize: "14px", fontWeight: 600, padding: "10px 22px", borderRadius: "7px", textDecoration: "none", backgroundColor: "#ffffff" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#374151">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </a>
            </div>

            {/* Social proof */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex" }}>
                {[{ bg: "#bfdbfe" }, { bg: "#c7d2fe" }, { bg: "#bbf7d0" }].map((av, i) => (
                  <div
                    key={i}
                    style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: av.bg, border: "2px solid #ffffff", marginLeft: i === 0 ? "0" : "-8px" }}
                  />
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                Trusted by <span style={{ color: "#111827", fontWeight: 600 }}>10,000+</span> candidates
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN — YOUR IMAGE GOES HERE ── */}
          <div style={{ width: "100%" }}>

            
    
            {/* ↓ DELETE FROM HERE when you add your image ↓ */}
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>
              {/* Window chrome */}
              <div style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #f3f4f6", padding: "10px 16px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#f87171", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#fbbf24", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#34d399", display: "inline-block" }} />
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "#9ca3af" }}>
                  Mock Session: Senior Product Designer
                </span>
              </div>
              {/* Chat body */}
              <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column" as const, gap: "14px" }}>
                {/* AI question */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#2563eb">
                      <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"/>
                      <path d="M5 10C5 9.45 4.55 9 4 9C3.45 9 3 9.45 3 10C3 14.08 5.95 17.45 9.83 17.93V21H8C7.45 21 7 21.45 7 22C7 22.55 7.45 23 8 23H16C16.55 23 17 22.55 17 22C17 21.45 16.55 21 16 21H14.17V17.93C18.05 17.45 21 14.08 21 10C21 9.45 20.55 9 20 9C19.45 9 19 9.45 19 10C19 13.31 16.31 16 13 16H11C7.69 16 5 13.31 5 10Z"/>
                    </svg>
                  </div>
                  <div style={{ backgroundColor: "#f9fafb", borderRadius: "12px", padding: "10px 13px", fontSize: "12.5px", color: "#374151", lineHeight: 1.55 }}>
                    "Can you describe a time when you had to manage conflicting stakeholder requirements on a high-stakes project?"
                  </div>
                </div>
                {/* User answer */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", justifyContent: "flex-end" }}>
                  <div style={{ backgroundColor: "#2563eb", borderRadius: "12px", padding: "10px 13px", fontSize: "12.5px", color: "#ffffff", lineHeight: 1.55, maxWidth: "80%" }}>
                    "Sure, in my last role at TechCorp, I was leading a redesign where marketing and engineering had fundamentally different..."
                  </div>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#e5e7eb", flexShrink: 0 }} />
                </div>
                {/* Feedback */}
                <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "10px 13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                    </svg>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#15803d", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                      Real-Time Feedback
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#15803d", lineHeight: 1.5, margin: 0 }}>
                    Excellent use of the STAR method. Consider adding more specific metrics to your result phase.
                  </p>
                </div>
              </div>
            </div>
            {/* ↑ DELETE TO HERE when you add your image ↑ */}

          </div>
        </div>
      </section>
      <Features/>
    </>
  );
}