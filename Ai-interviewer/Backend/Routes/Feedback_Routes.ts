import { Router } from "express";
import { detailFeedback, scoreFeedback } from "../Controller/Feedback_Controller";
import { protect } from "../Middlewares/Auth_Middleware";

const router = Router();
router.post("/score", protect, scoreFeedback);
router.post("/detail", protect, detailFeedback); 
export default router;