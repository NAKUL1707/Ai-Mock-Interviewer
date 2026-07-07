
export default function Features() {
  return (
    <>
      {/*
          SECTION 1 — Features Grid
       */}
      <section style={{ backgroundColor: "#f8f9fb", padding: "72px 0 80px" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              Everything you need to interview with confidence
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65, maxWidth: "480px", margin: "0 auto" }}>
              Built for the modern job seeker, our AI platform provides a comprehensive suite of tools
              to polish your performance.
            </p>
          </div>

          {/* Top row — 2 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

            {/* Card 1 — Real-time Feedback */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "28px 28px 24px",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h2l2-4 2 8 2-4h2"/>
                </svg>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>
                Real-time Feedback
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, marginBottom: "24px", maxWidth: "340px" }}>
                Our AI analyzes your speech patterns, sentiment, and structural delivery as you talk,
                giving you pointers on the fly.
              </p>

              {/* Fake waveform / progress bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "28px" }}>
                {[40, 65, 35, 80, 50, 70, 45, 60, 38, 72].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "3px",
                      backgroundColor: i === 3 || i === 7 ? "#2563eb" : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 2 — Role-specific Questions */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "28px 28px 24px",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
                </svg>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>
                Role-specific Questions
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, marginBottom: "24px" }}>
                From Software Engineer to CEO.{" "}
                <span style={{ color: "#2563eb" }}>
                  Our database is trained on thousands of real interview transcripts from top tech companies.
                </span>
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "8px" }}>
                {["FAANG", "FinTech", "Startups"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#374151",
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      padding: "3px 10px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row — small card + blue CTA card */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>

            {/* Card 3 — Voice & Text Practice */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "28px 28px 24px",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                  <path d="M12 1C10.3431 1 9 2.34315 9 4V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V4C15 2.34315 13.6569 1 12 1Z"/>
                  <path d="M5 10C5 9.44772 4.55228 9 4 9C3.44772 9 3 9.44772 3 10C3 14.0796 5.9506 17.446 9.83183 17.931L9.83183 21H8C7.44772 21 7 21.4477 7 22C7 22.5523 7.44772 23 8 23H16C16.5523 23 17 22.5523 17 22C17 21.4477 16.5523 21 16 21H14.1682V17.931C18.0494 17.446 21 14.0796 21 10C21 9.44772 20.5523 9 20 9C19.4477 9 19 9.44772 19 10C19 13.3137 16.3137 16 13 16H11C7.68629 16 5 13.3137 5 10Z"/>
                </svg>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>
                Voice & Text Practice
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65 }}>
                Choose your comfort zone.{" "}
                <span style={{ color: "#2563eb" }}>Practice via chat</span>{" "}
                for high-pressure response drafting or{" "}
                <span style={{ color: "#2563eb" }}>via voice</span>{" "}
                for verbal fluency.
              </p>
            </div>

            {/* Card 4 — Blue CTA card */}
            <div
              style={{
                backgroundColor: "#2563eb",
                borderRadius: "12px",
                padding: "36px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "10px",
                  }}
                >
                  Land Your Dream Job
                </h3>
                <p style={{ fontSize: "13.5px", color: "#bfdbfe", lineHeight: 1.6, marginBottom: "20px", maxWidth: "340px" }}>
                  92% of our users report feeling significantly more confident after just 3 mock sessions.
                </p>
                <a
                  href="#"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#ffffff",
                    color: "#2563eb",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "9px 18px",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  See Success Stories
                </a>
              </div>

              {/* Background star decoration */}
              <div
                style={{
                  position: "absolute",
                  right: "36px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.15,
                }}
              >
                <svg width="130" height="130" viewBox="0 0 24 24" fill="#ffffff">
                  <circle cx="12" cy="12" r="11" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
                  <path d="M12 2l2.9 6.3 6.8.7-5 4.7 1.4 6.8L12 17.3l-6.1 3.2 1.4-6.8-5-4.7 6.8-.7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — Three Steps to Success
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f1f3f8", padding: "72px 0 80px" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 32px)",
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.02em",
              textAlign: "center",
              marginBottom: "52px",
            }}
          >
            Three steps to success
          </h2>

          {/* Steps row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", position: "relative" }}>

            {/* Connector line behind numbers */}
            <div
              style={{
                position: "absolute",
                top: "18px",
                left: "calc(16.66% + 18px)",
                right: "calc(16.66% + 18px)",
                height: "1px",
                backgroundColor: "#d1d5db",
                zIndex: 0,
              }}
            />

            {[
              {
                num: "1",
                title: "Choose Your Target",
                desc: "Select your role, seniority, and even specific company to tailor the AI's persona.",
              },
              {
                num: "2",
                title: "Conduct the Session",
                desc: "Answer challenging, realistic questions in a distraction-free, timed environment.",
              },
              {
                num: "3",
                title: "Analyze & Improve",
                desc: "Receive a detailed breakdown of your performance with actionable improvement steps.",
              },
            ].map((step) => (
              <div key={step.num} style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 1 }}>
                {/* Step number badge */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1.5px solid #2563eb",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#2563eb",
                  }}
                >
                  {step.num}
                </div>

                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, maxWidth: "220px", margin: "0 auto" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — Logo strip (blurred placeholders)
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f1f3f8", padding: "0 0 0" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", paddingBottom: "48px" }}>
            {[120, 100, 110, 130, 100, 120].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}px`,
                  height: "40px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "6px",
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — CTA "Ready to land that offer?"
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f1f3f8", padding: "0 0 80px" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8" style={{ textAlign: "center" }}>

          <h2
            style={{
              fontSize: "clamp(30px, 5vw, 48px)",
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Ready to land that offer?
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65, marginBottom: "28px", maxWidth: "400px", margin: "0 auto 28px" }}>
            Join thousands of job seekers using MockCoach AI to prep for their dream careers. Start
            today for free.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="#"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 600,
                padding: "11px 26px",
                borderRadius: "7px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Start for Free
            </a>
            <a
              href="#"
              style={{
                backgroundColor: "#ffffff",
                color: "#374151",
                fontSize: "14px",
                fontWeight: 600,
                padding: "11px 26px",
                borderRadius: "7px",
                textDecoration: "none",
                border: "1.5px solid #e5e7eb",
                display: "inline-block",
              }}
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}