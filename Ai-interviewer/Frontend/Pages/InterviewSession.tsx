// InterviewSession.tsx
// Place this in: Pages/InterviewSession.tsx

import VoiceVisualizer from "../Components/VoiceVisualizer"; // ✅ default import (no curly braces)
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

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

// ── Web Speech API types ───────────────────────────────────────────────────
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((event: Event) => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

// ── Icons ──────────────────────────────────────────────────────────────────
const MicIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const MicOffIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23"/>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
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

const LightbulbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

// ── Groq API call ──────────────────────────────────────────────────────────
async function fetchQuestions(config: SessionConfig): Promise<Question[]> {
  const focusLabel =
    config.focus === "both"        ? "both Technical and HR"
    : config.focus === "technical" ? "Technical only"
    : config.focus === "hr"        ? "HR / behavioral only"
    : "5 quick-fire mixed";

  const count = config.focus === "quick" ? 5 : 8;

  const prompt = `You are an expert interview coach. Generate exactly ${count} interview questions for a ${config.difficulty} level ${config.role} candidate. Focus: ${focusLabel}.

Return ONLY a valid JSON array, no markdown, no explanation. Each item must have exactly these fields:
- "question": the interview question (string)
- "hint": a short coaching tip (string)
- "type": either "TECHNICAL" or "HR" (string)

Example:
[{"question":"...","hint":"...","type":"TECHNICAL"},{"question":"...","hint":"...","type":"HR"}]`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are an expert interview coach. Always respond with valid JSON only. No markdown, no explanation.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${await response.text()}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content ?? "[]";
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed: Question[] = JSON.parse(clean);
  return parsed;
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function InterviewSession() {
  const location = useLocation();
  const navigate = useNavigate();

  const config: SessionConfig = (location.state as SessionConfig) ?? {
    role: "Full Stack Developer",
    focus: "both",
    difficulty: "Intermediate",
  };

  // ── State ─────────────────────────────────────────────────────────────────
  const [questions, setQuestions]       = useState<Question[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer]             = useState("");
  const [answers, setAnswers]           = useState<string[]>([]);
  const [isListening, setIsListening]   = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // ── Fetch questions on mount ───────────────────────────────────────────────
  useEffect(() => {
    fetchQuestions(config)
      .then((qs) => { setQuestions(qs); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Voice input ────────────────────────────────────────────────────────────
 const toggleVoice = () => {
  console.log("SpeechRecognition:", window.SpeechRecognition);
  console.log("webkitSpeechRecognition:", window.webkitSpeechRecognition);

  const SpeechRecognitionAPI =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionAPI) {
    console.log("❌ Not supported in this browser");
    alert("Your browser doesn't support voice input. Please type your answer.");
    return;
  }

  if (isListening) {
    recognitionRef.current?.stop();
    setIsListening(false);
    return;
  }

  const recognition = new SpeechRecognitionAPI();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    console.log("✅ Got result:", event.results);
    let transcript = "";
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    setAnswer(transcript);
  };

  recognition.onend = () => {
    console.log("🔴 Recognition ended");
    setIsListening(false);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.log("❌ Error:", event.error); // ← THIS is what we need to see
    setIsListening(false);
  };

  recognition.start();
  console.log("🎙️ Recognition started");
  recognitionRef.current = recognition;
  setIsListening(true);
};

  // ── Submit / Skip ──────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!answer.trim()) return;

    const updatedAnswers = [...answers, answer.trim()];
    setAnswers(updatedAnswers);
    setAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/feedback", { state: { config, questions, answers: updatedAnswers } });
    }
  };

  const handleSkip = () => {
    const updatedAnswers = [...answers, ""];
    setAnswers(updatedAnswers);
    setAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/feedback", { state: { config, questions, answers: updatedAnswers } });
    }
  };

  // ── Progress ───────────────────────────────────────────────────────────────
  const total = questions.length;
  const progressPct = total > 0 ? (currentIndex / total) * 100 : 0;
  const currentQ = questions[currentIndex];

  // ── Render: Loading ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
        <SessionNavbar role={config.role} current={0} total={0} progress={0} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTop: "3px solid #2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>Generating your personalized questions...</p>
        </div>
      </div>
    );
  }

  // ── Render: Error ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "40px", textAlign: "center", maxWidth: "400px" }}>
          <p style={{ color: "#dc2626", marginBottom: "16px" }}>Failed to load questions.</p>
          <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "24px" }}>{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ── Render: Interview ──────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column", fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      <SessionNavbar role={config.role} current={currentIndex + 1} total={total} progress={progressPct} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 16px 100px" }}>

        {/* Question card */}
        <div style={{
          background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb",
          padding: "36px 40px", width: "100%", maxWidth: "660px", marginBottom: "32px",
        }}>
          <span style={{
            display: "inline-block", padding: "3px 10px", borderRadius: "4px", fontSize: "11px",
            fontWeight: 700, letterSpacing: "0.08em",
            background: currentQ?.type === "TECHNICAL" ? "#eff6ff" : "#f0fdf4",
            color: currentQ?.type === "TECHNICAL" ? "#1d4ed8" : "#15803d",
            marginBottom: "16px",
          }}>
            {currentQ?.type}
          </span>

          <p style={{ fontSize: "20px", fontWeight: 700, color: "#111827", lineHeight: 1.45, marginBottom: "20px" }}>
            {currentQ?.question}
          </p>

          {currentQ?.hint && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LightbulbIcon />
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                <strong>Hint:</strong> {currentQ.hint}
              </span>
            </div>
          )}
        </div>

        {/* Mic button */}
        <button
          onClick={toggleVoice}
          title={isListening ? "Stop recording" : "Start voice answer"}
          style={{
            width: "64px", height: "64px", borderRadius: "12px", border: "none",
            background: isListening ? "#dc2626" : "#2563eb",
            color: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", marginBottom: "20px",
            boxShadow: isListening ? "0 0 0 4px rgba(220,38,38,0.25)" : "none",
            transition: "all 0.2s",
          }}
        >
          {isListening ? <MicOffIcon size={26} /> : <MicIcon size={26} />}
        </button>

        {/* ✅ VoiceVisualizer replaces the old <p>Listening...</p> */}
        <VoiceVisualizer isListening={isListening} />

        {/* Text answer */}
        <div style={{ width: "100%", maxWidth: "660px", marginTop: "8px" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
            Type your answer instead...
          </p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Briefly explain the concepts using a real-world analogy..."
            rows={5}
            style={{
              width: "100%", padding: "14px 16px", fontSize: "14px", color: "#111827",
              border: "1px solid #d1d5db", borderRadius: "8px", resize: "vertical",
              outline: "none", fontFamily: "inherit", lineHeight: 1.6,
              boxSizing: "border-box", background: "#fff",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>
      </main>

      {/* Bottom bar */}
      <div style={{
        position: "sticky", bottom: 0, background: "#fff",
        borderTop: "1px solid #e5e7eb", padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button
          onClick={handleSkip}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#6b7280" }}
        >
          Skip
        </button>

        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 24px", borderRadius: "8px", border: "none",
            background: answer.trim() ? "#2563eb" : "#e5e7eb",
            color: answer.trim() ? "#fff" : "#9ca3af",
            fontSize: "14px", fontWeight: 600,
            cursor: answer.trim() ? "pointer" : "not-allowed",
            transition: "all 0.15s",
          }}
        >
          {currentIndex < total - 1 ? "Submit Answer" : "Finish Interview"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Session Navbar ─────────────────────────────────────────────────────────
function SessionNavbar({ role, current, total, progress }: {
  role: string;
  current: number;
  total: number;
  progress: number;
}) {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: "56px", background: "#fff",
      borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100,
    }}>
      <span style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
        {role || "Interview"}
      </span>

      {total > 0 && (
        <div style={{ flex: 1, maxWidth: "320px", margin: "0 32px" }}>
          <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "#2563eb", borderRadius: "99px",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {total > 0 && (
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
            Q{current} / {total}
          </span>
        )}
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", display: "flex" }}>
          <BellIcon />
        </button>
        <button style={{ background: "none", border: "1px solid #e5e7eb", cursor: "pointer", color: "#374151", display: "flex", borderRadius: "50%", padding: "4px" }}>
          <UserIcon />
        </button>
      </div>
    </nav>
  );
}