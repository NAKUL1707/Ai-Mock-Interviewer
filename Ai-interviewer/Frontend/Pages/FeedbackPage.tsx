

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scoreFeedback } from "../src/Services/api";


// ── Types ──────────────────────────────────────────────────────────────────
interface Question {
  question: string;
  hint: string;
  type: "TECHNICAL" | "HR";
}

interface SessionConfig {
  role: string;
  focus: string;
  difficulty: string;
}

interface QuestionFeedback {
  score: number;       // 0–10
  improvement: string; // one-line coaching tip
}

// ── Icons ──────────────────────────────────────────────────────────────────
const TrophyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 9a6 6 0 0 0 12 0"/>
    <line x1="12" y1="15" x2="12" y2="19"/>
    <line x1="8" y1="19" x2="16" y2="19"/>
    <path d="M6 2H3a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4"/>
    <path d="M18 2h3a1 1 0 0 1 1 1v1a4 4 0 0 0-4 4"/>
  </svg>
);

const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const ChecklistIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/>
    <polyline points="3 18 4 19 6 17"/>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const CoachIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ activeTab }: { activeTab: string }) {
  const navigate = useNavigate();
  const tabs = ["Dashboard", "Interviews", "Practice", "Feedback"];
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: "56px", background: "#fff",
      borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "15px", color: "#111827", cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}>
        <span style={{ color: "#2563eb" }}><MicIcon /></span>
        MockCoach AI
      </div>

      <div style={{ display: "flex", gap: "4px" }}>
        {tabs.map(tab => {
          const active = tab === activeTab;
          return (
            <button key={tab} style={{
              padding: "6px 16px", borderRadius: "6px", border: "none", cursor: "pointer",
              background: "transparent", fontSize: "14px", fontWeight: active ? 600 : 400,
              color: active ? "#2563eb" : "#374151",
              borderBottom: active ? "2px solid #2563eb" : "2px solid transparent",
            }}>
              {tab}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#374151" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", display: "flex" }}><MicIcon /></button>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", display: "flex" }}><BellIcon /></button>
        <button style={{ background: "none", border: "1px solid #e5e7eb", cursor: "pointer", color: "#374151", display: "flex", borderRadius: "50%", padding: "4px" }}><UserIcon /></button>
      </div>
    </nav>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function FeedbackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { config, questions, answers, sessionId } = (location.state as {
    config: SessionConfig;
    questions: Question[];
    answers: string[];
    sessionId?: string | null;
  }) ?? {
    config: { role: "", focus: "", difficulty: "" },
    questions: [],
    answers: [],
    sessionId: null,
  };

  const [feedbacks, setFeedbacks] = useState<QuestionFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!questions.length) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const run = async () => {
      try {
        const fb = await scoreFeedback(questions, answers, config, sessionId ?? undefined);
        if (isMounted) {
          setFeedbacks(fb as QuestionFeedback[]);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load feedback.");
          setLoading(false);
        }
      }
    };

    void run();
    return () => {
      isMounted = false;
    };
  }, [answers, config, questions, sessionId]);

  // ── Derived stats ──────────────────────────────────────────────────────
  const answered = answers.filter(a => a.trim() !== "").length;
  const total = questions.length;
  const scores = feedbacks.map(f => f.score);
  const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "—";
  const bestScore = scores.length ? Math.max(...scores) : 0;
  const bestIndex = scores.indexOf(bestScore);
  const bestLabel = bestIndex >= 0
    ? (questions[bestIndex]?.type === "HR" ? "Leadership Principles section" : "Technical section")
    : "—";
  const completionRate = total > 0 ? Math.round((answered / total) * 100) : 0;

  // ── Score color ────────────────────────────────────────────────────────
  const scoreColor = (s: number) =>
    s >= 8 ? "#15803d" : s >= 6 ? "#d97706" : "#dc2626";

  const scoreBg = (s: number) =>
    s >= 8 ? "#f0fdf4" : s >= 6 ? "#fffbeb" : "#fef2f2";

  // ── Loading ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
        <Navbar activeTab="Feedback" />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTop: "3px solid #2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>Analyzing your answers...</p>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Navbar activeTab="Feedback" />
        <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", textAlign: "center", maxWidth: "400px" }}>
          <p style={{ color: "#dc2626", marginBottom: "16px" }}>Failed to load feedback.</p>
          <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "24px" }}>{error}</p>
          <button onClick={() => navigate("/dashboard")}
            style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar activeTab="Feedback" />

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 16px 80px" }}>

        {/* Trophy + heading */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px" }}>
          <div style={{
            width: "96px", height: "96px", borderRadius: "20px",
            background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "20px",
          }}>
            <TrophyIcon />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>
            Interview Complete!
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", textAlign: "center", maxWidth: "460px", lineHeight: 1.6, margin: 0 }}>
            You performed better than 85% of candidates. Great progress on your behavioral response structuring.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "40px" }}>
          {/* Avg score */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <BarChartIcon />
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#6b7280" }}>AVG SCORE</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "12px" }}>
              <span style={{ fontSize: "36px", fontWeight: 700, color: "#111827" }}>{avgScore}</span>
              <span style={{ fontSize: "16px", color: "#6b7280" }}>/10</span>
            </div>
            <div style={{ height: "4px", background: "#e5e7eb", borderRadius: "99px" }}>
              <div style={{
                height: "100%", borderRadius: "99px", background: "#2563eb",
                width: `${(parseFloat(String(avgScore)) / 10) * 100}%`,
              }} />
            </div>
          </div>

          {/* Answered */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <ChecklistIcon />
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#6b7280" }}>ANSWERED</span>
            </div>
            <div style={{ fontSize: "36px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>
              {answered}/{total}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>{completionRate}% completion rate</div>
          </div>

          {/* Best score */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <StarIcon />
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#6b7280" }}>BEST SCORE</span>
            </div>
            <div style={{ fontSize: "36px", fontWeight: 700, color: "#111827", marginBottom: "6px" }}>
              {bestScore > 0 ? bestScore : "—"}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>{bestLabel}</div>
          </div>
        </div>

        {/* Question breakdown */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0 }}>
              Question Breakdown
            </h2>

          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {questions.map((q, i) => {
              const fb = feedbacks[i];
              const score = fb?.score ?? 0;
              const skipped = !answers[i]?.trim();
              return (
                <div key={i} style={{
                  background: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb",
                  padding: "20px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px",
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", margin: "0 0 6px", lineHeight: 1.5 }}>
                      "{q.question}"
                    </p>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, fontStyle: "italic" }}>
                      {skipped
                        ? "Skipped — no answer provided."
                        : fb?.improvement ?? "Loading..."}
                    </p>
                  </div>
                  {!skipped && fb && (
                    <span style={{
                      flexShrink: 0, padding: "4px 10px", borderRadius: "6px",
                      fontSize: "13px", fontWeight: 600,
                      background: scoreBg(score), color: scoreColor(score),
                    }}>
                      {score}/10
                    </span>
                  )}
                  {skipped && (
                    <span style={{
                      flexShrink: 0, padding: "4px 10px", borderRadius: "6px",
                      fontSize: "13px", fontWeight: 600,
                      background: "#f3f4f6", color: "#9ca3af",
                    }}>
                      Skipped
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Review with Coach floating button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
          <button 
            onClick={() => navigate('/question-feedback', {
              state: { config, questions, answers, currentIndex: 0 }
            })}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "12px 20px", borderRadius: "10px",
              border: "1px solid #e5e7eb", background: "#fff",
              fontSize: "14px", fontWeight: 500, color: "#111827", cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>
            <CoachIcon />
            Review with Coach
          </button>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "15px 40px", borderRadius: "8px", border: "none",
              background: "#2563eb", color: "#fff", fontSize: "15px", fontWeight: 600,
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
          >
            Start New Interview <ArrowRightIcon />
          </button>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            Practice makes perfect. Ready for another round?
          </p>
        </div>
      </main>
    </div>
  );
}