// src/services/api.ts
// All backend API calls in one place
// Usage: import { generateQuestions, scoreAnswers } from "../services/api"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Helper ─────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ── Auth ───────────────────────────────────────────────────────────────────
export const registerUser = async (email: string, password: string, name: string) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => !!getToken();

// ── Questions ──────────────────────────────────────────────────────────────
export const generateQuestions = async (role: string, focus: string, difficulty: string) => {
  const res = await fetch(`${BASE_URL}/questions/generate`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ role, focus, difficulty }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.questions;
};

// ── Sessions ───────────────────────────────────────────────────────────────
export const createSession = async (role: string, focus: string, difficulty: string) => {
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ role, focus, difficulty }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.session;
};

export const getSessions = async () => {
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: "GET",
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.sessions;
};

export const getSessionById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/sessions/${id}`, {
    method: "GET",
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.session;
};

// ── Feedback ───────────────────────────────────────────────────────────────
export const scoreFeedback = async (
  questions: any[],
  answers: string[],
  config: { role: string; focus: string; difficulty: string },
  sessionId?: string
) => {
  const res = await fetch(`${BASE_URL}/feedback/score`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ questions, answers, config, sessionId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.feedbacks;
};

export const getDetailedFeedback = async (
  question: any,
  answer: string,
  config: { role: string; focus: string; difficulty: string }
) => {
  const res = await fetch(`${BASE_URL}/feedback/detail`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ question, answer, config }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.feedback;
};