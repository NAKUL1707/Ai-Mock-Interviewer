import { Request, Response } from "express";
import prisma from "../DB/Prisma";
import { AuthRequest } from "../Middlewares/Auth_Middleware";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export const scoreFeedback = async (req: AuthRequest, res: Response) => {
  try {
    const { questions, answers, config, sessionId } = req.body;

    if (!questions || !answers || !config) {
      return res.status(400).json({ error: "questions, answers and config are required" });
    }

    const pairs = questions.map((q: any, i: number) => ({
      question: q.question,
      answer: answers[i] || "(skipped)",
    }));

    const prompt = `You are an expert interview coach. Score each answer for a ${config.difficulty} level ${config.role} interview.

Questions and answers:
${JSON.stringify(pairs, null, 2)}

Return ONLY a valid JSON array with exactly ${questions.length} items. Each item must have:
- "score": number from 0 to 10 (one decimal allowed)
- "improvement": one specific coaching tip (max 15 words)
- "idealAnswer": one paragraph model answer (60-80 words, first person)

Example: [{"score":8.5,"improvement":"Use the STAR method more strictly.","idealAnswer":"..."}]`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1500,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "You are an expert interview coach. Always respond with valid JSON only. No markdown.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) throw new Error(`Groq error: ${response.status}`);

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    const feedbacks = JSON.parse(clean);

    // save to DB if sessionId provided
    if (sessionId) {
      for (let i = 0; i < questions.length; i++) {
        const q = await prisma.question.create({
          data: {
            sessionId,
            question: questions[i].question,
            hint: questions[i].hint,
            type: questions[i].type,
            userAnswer: answers[i] || "",
          },
        });

        await prisma.feedback.create({
          data: {
            questionId: q.id,
            score: feedbacks[i].score,
            improvement: feedbacks[i].improvement,
            idealAnswer: feedbacks[i].idealAnswer,
          },
        });
      }

      // update session avg score
      const avg = feedbacks.reduce((sum: number, f: any) => sum + f.score, 0) / feedbacks.length;
      await prisma.session.update({
        where: { id: sessionId },
        data: { avgScore: avg },
      });
    }

    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ error: "Failed to score feedback" });
  }
};

export const detailFeedback = async (req: AuthRequest, res: Response) => {
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const { question, answer, config } = req.body;

    const prompt = `You are an expert interview coach. Analyze this ${config.difficulty} ${config.role} interview answer.

Question: "${question.question}"
Answer: "${answer || "(no answer provided)"}"

Return ONLY valid JSON with exactly these fields:
{
  "score": <number 0-10, one decimal>,
  "label": <"STRONG" if score>=8, "GOOD" if score>=6, "NEEDS WORK" if below 6>,
  "topic": <3-6 word topic label for this question>,
  "whatWorked": [<2-3 specific things done well, each max 20 words>],
  "improveThis": [<1-2 specific improvements, each max 20 words>],
  "idealAnswer": <one paragraph model answer, 80-120 words, in first person>
}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        temperature: 0.3,
        messages: [
          { role: "system", content: "You are an expert interview coach. Always respond with valid JSON only. No markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.log("Groq error:", err);
      throw new Error(`Groq error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const feedback = JSON.parse(clean);

    res.json({ feedback });
  } catch (err) {
    res.status(500).json({ error: "Failed to get detailed feedback" });
  }
};