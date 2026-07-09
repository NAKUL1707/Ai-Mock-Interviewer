import { Router } from "express";
import { generateQuestions } from "../Controller/Question_Controller";
import { protect } from "../Middlewares/Auth_Middleware";

const router = Router();
router.post("/generate", protect, generateQuestions);
export default router;