// QuestionFeedback.tsx
// Place this in: Pages/QuestionFeedback.tsx
//
// This is the per-question detailed feedback page shown after each answer
// OR navigated to from FeedbackPage when user clicks "Review with Coach"
//
// SETUP:
// - Add route: <Route path="/question-feedback" element={<QuestionFeedback />} />
// - Navigate here with:
//   navigate('/question-feedback', { state: { config, questions, answers, currentIndex: 0 } })

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDetailedFeedback  } from "../src/Services/api";

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

interface DetailedFeedback {
  score: number;
  label: string;           // e.g. "STRONG", "GOOD", "NEEDS WORK"
  topic: string;           // e.g. "Conflict Resolution in a Team Setting"
  whatWorked: string[];    // 2–3 bullet points
  improveThis: string[];   // 1–2 bullet points
  idealAnswer: string;     // model answer paragraph
}

// ── Icons ──────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const InterviewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const QuestionBankIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
    <path d="M5 5l1.5 1.5M17.5 5L19 6.5M5 19l1.5-1.5M17.5 19L19 17.5"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
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

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ activePage }: { activePage: string }) {
  const navigate = useNavigate();

  const items = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Mock Interviews", icon: <InterviewIcon />, path: "/dashboard" },
    { label: "Question Bank", icon: <QuestionBankIcon />, path: "/question-bank" },
    { label: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
    { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <aside style={{
      width: "200px", flexShrink: 0, background: "#fff",
      borderRight: "1px solid #e5e7eb", minHeight: "calc(100vh - 56px)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "16px 0",
    }}>
      <nav>
        {items.map((item) => {
          const active = item.label === activePage;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 20px", border: "none", cursor: "pointer", textAlign: "left",
                background: active ? "#2563eb" : "transparent",
                color: active ? "#fff" : "#374151",
                fontSize: "14px", fontWeight: active ? 600 : 400,
                borderRadius: active ? "0" : "0",
                transition: "all 0.15s",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Daily goal */}
      <div style={{ padding: "16px", margin: "12px", background: "#f9fafb", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
        <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", color: "#9ca3af", margin: "0 0 8px" }}>
          DAILY GOAL
        </p>
        <div style={{ height: "4px", background: "#e5e7eb", borderRadius: "99px", marginBottom: "8px" }}>
          <div style={{ width: "60%", height: "100%", background: "#2563eb", borderRadius: "99px" }} />
        </div>
        <p style={{ fontSize: "12px", color: "#374151", margin: 0, fontWeight: 500 }}>
          3/5 Practice Sessions
        </p>
      </div>
    </aside>
  );
}

// ── Top Navbar ─────────────────────────────────────────────────────────────
function Navbar({ activeTab }: { activeTab: string }) {
  const navigate = useNavigate();
  const tabs = ["Dashboard", "Interviews", "Practice", "Feedback"];

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: "56px", background: "#fff",
      borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100,
    }}>
      <div onClick={() => navigate("/dashboard")} style={{
        display: "flex", alignItems: "center", gap: "8px",
        fontWeight: 700, fontSize: "15px", color: "#111827", cursor: "pointer",
      }}>
        <span style={{ color: "#2563eb" }}><MicIcon /></span>
        MockCoach AI
      </div>

      <div style={{ display: "flex", gap: "4px" }}>
        {tabs.map(tab => {
          const active = tab === activeTab;
          return (
            <button key={tab} style={{
              padding: "6px 16px", border: "none", cursor: "pointer", background: "transparent",
              fontSize: "14px", fontWeight: active ? 600 : 400,
              color: active ? "#2563eb" : "#374151",
              borderBottom: active ? "2px solid #2563eb" : "2px solid transparent",
            }}>
              {tab}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", display: "flex" }}><MicIcon /></button>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", display: "flex" }}><BellIcon /></button>
        <button style={{ background: "none", border: "1px solid #e5e7eb", cursor: "pointer", color: "#374151", display: "flex", borderRadius: "50%", padding: "4px" }}><UserIcon /></button>
      </div>
    </nav>
  );
}

// ── Score Ring ─────────────────────────────────────────────────────────────
function ScoreRing({ score, label }: { score: number; label: string }) {
  const pct = score / 10;
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  const labelColor =
    label === "STRONG" ? "#2563eb"
    : label === "GOOD" ? "#d97706"
    : "#dc2626";

  const labelBg =
    label === "STRONG" ? "#eff6ff"
    : label === "GOOD" ? "#fffbeb"
    : "#fef2f2";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
      <div style={{ position: "relative", width: "140px", height: "140px" }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Track */}
          <circle cx="70" cy="70" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10"/>
          {/* Progress */}
          <circle
            cx="70" cy="70" r={r} fill="none"
            stroke="#2563eb" strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={circ * 0.25}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
        }}>
          <span style={{ fontSize: "26px", fontWeight: 800, color: "#2563eb" }}>
            {score}/10
          </span>
          <span style={{
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
            padding: "2px 8px", borderRadius: "4px",
            background: labelBg, color: labelColor,
          }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function QuestionFeedback() {
  const location = useLocation();
  const navigate = useNavigate();

  const { config, questions, answers, currentIndex: initialIndex } = (location.state as {
    config: SessionConfig;
    questions: Question[];
    answers: string[];
    currentIndex: number;
  }) ?? { config: null, questions: [], answers: [], currentIndex: 0 };

  const [currentIndex, setCurrentIndex] = useState(initialIndex ?? 0);
  const [feedback, setFeedback] = useState<DetailedFeedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const currentQ = questions[currentIndex];
  const currentA = answers[currentIndex];
  const total = questions.length;

  useEffect(() => {
    if (!currentQ || !config) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setFeedback(null);

    const loadFeedback = async () => {
      try {
        const fb = await getDetailedFeedback(currentQ, currentA, config);
        if (isMounted) {
          setFeedback(fb as DetailedFeedback);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadFeedback();

    return () => {
      isMounted = false;
    };
  }, [currentA, currentQ, config]);

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/feedback", { state: { config, questions, answers } });
    }
  };

  const handleCopy = () => {
    if (feedback?.idealAnswer) {
      navigator.clipboard.writeText(feedback.idealAnswer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading || !feedback) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        <Navbar activeTab="Interviews" />
        <div style={{ display: "flex" }}>
          <Sidebar activePage="Mock Interviews" />
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", minHeight: "calc(100vh - 56px)" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTop: "3px solid #2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>Analyzing your answer...</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar activeTab="Interviews" />

      <div style={{ display: "flex" }}>
        <Sidebar activePage="Mock Interviews" />

        {/* Main content */}
        <main style={{ flex: 1, padding: "40px 48px 80px", maxWidth: "760px" }}>

          {/* Score ring */}
          <ScoreRing score={feedback.score} label={feedback.label} />

          {/* Heading */}
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827", textAlign: "center", margin: "0 0 8px" }}>
            Feedback for: {currentQ.type === "HR" ? "Behavioral Question" : "Technical Question"}
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center", margin: "0 0 32px" }}>
            Topic: {feedback.topic}
          </p>

          {/* What worked */}
          <div style={{
            background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb",
            padding: "24px 28px", marginBottom: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <CheckCircleIcon />
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#2563eb", margin: 0 }}>
                What worked
              </h2>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {feedback.whatWorked.map((point, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563eb", flexShrink: 0, marginTop: "7px" }} />
                  <span style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Improve this */}
          <div style={{
            background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb",
            padding: "24px 28px", marginBottom: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <TrendUpIcon />
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#b45309", margin: 0 }}>
                Improve this
              </h2>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {feedback.improveThis.map((point, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#b45309", flexShrink: 0, marginTop: "7px" }} />
                  <span style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal answer */}
          <div style={{
            background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb",
            padding: "24px 28px", marginBottom: "32px", position: "relative",
          }}>
            {/* Sparkle decoration */}
            <div style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.3 }}>
              <SparkleIcon />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <LightbulbIcon />
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#2563eb", margin: 0 }}>
                Ideal answer
              </h2>
            </div>

            <p style={{
              fontSize: "14px", color: "#374151", lineHeight: 1.7,
              fontStyle: "italic", margin: "0 0 20px",
            }}>
              "{feedback.idealAnswer}"
            </p>

            {/* Copy to Practice Bank */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleCopy}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "13px", color: copied ? "#15803d" : "#2563eb", fontWeight: 500,
                }}
              >
                <CopyIcon />
                {copied ? "Copied!" : "Copy to Practice Bank"}
              </button>
            </div>
          </div>

          {/* Next button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <button
              onClick={handleNext}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 40px", borderRadius: "8px", border: "none",
                background: "#2563eb", color: "#fff", fontSize: "15px", fontWeight: 600,
                cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
            >
              {currentIndex < total - 1 ? "Next Question" : "View Full Report"}
              <ArrowRightIcon />
            </button>

            {/* Progress dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {questions.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: "4px", borderRadius: "99px",
                    width: i <= currentIndex ? "28px" : "20px",
                    background: i <= currentIndex ? "#2563eb" : "#d1d5db",
                    transition: "all 0.3s",
                  }}
                />
              ))}
              <span style={{ fontSize: "13px", color: "#6b7280", marginLeft: "8px" }}>
                {currentIndex + 1} of {total} completed
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}