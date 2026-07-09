import { Router } from "express";
import { createSession, getSessions, getSessionById } from "../Controller/Session_Controller";
import { protect } from "../Middlewares/Auth_Middleware";


const router = Router();
router.post("/", protect, createSession);
router.get("/", protect, getSessions);
router.get("/:id", protect, getSessionById);
export default router;