import { Request, Response } from "express";
import { AuthRequest } from "../Middlewares/Auth_Middleware";



export const generateQuestions = async (req: AuthRequest, res: Response) => {
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
     console.log("API KEY:", process.env.GROQ_API_KEY); // ← add this
    console.log("Body:", req.body); // ← add this
    const { role, focus, difficulty } = req.body;

    if (!role || !focus || !difficulty) {
      return res.status(400).json({ error: "role, focus and difficulty are required" });
    }

    const focusLabel =
      focus === "both"       ? "both Technical and HR"
      : focus === "technical"  ? "Technical only"
      : focus === "hr"         ? "HR / behavioral only"
      : "5 quick-fire mixed";

    const count = focus === "quick" ? 5 : 8;

    const prompt = `You are an expert interview coach. Generate exactly ${count} interview questions for a ${difficulty} level ${role} candidate. Focus: ${focusLabel}.

Return ONLY a valid JSON array, no markdown, no explanation. Each item must have exactly these fields:
- "question": the interview question (string)
- "hint": a short coaching tip (string)
- "type": either "TECHNICAL" or "HR" (string)

Example:
[{"question":"...","hint":"...","type":"TECHNICAL"}]`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "You are an expert interview coach. Always respond with valid JSON only. No markdown.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

   if (!response.ok) {
  const errorText = await response.text();
  console.log("Groq error:", errorText); // ← shows exact error
  throw new Error(`Groq error: ${response.status}`);
}
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(clean);

    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate questions" });
  }
};