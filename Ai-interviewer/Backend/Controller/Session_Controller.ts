import { Response } from "express";
import prisma from "../DB/Prisma";
import { AuthRequest } from "../Middlewares/Auth_Middleware";

export const createSession = async (req: AuthRequest, res: Response) => {
  try {
    const { role, focus, difficulty } = req.body;
    const session = await prisma.session.create({
      data: { userId: req.userId!, role, focus, difficulty },
    });
    res.status(201).json({ session });
  } catch (err) {
    res.status(500).json({ error: "Failed to create session" });
  }
};

export const getSessions = async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "desc" },
      include: { questions: { include: { feedback: true } } },
    });
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

export const getSessionById = async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.session.findFirst({
      where: { id: req.params.id, userId: req.userId! },
      include: { questions: { include: { feedback: true } } },
    });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json({ session });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch session" });
  }
};