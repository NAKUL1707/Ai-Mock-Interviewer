import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
import express from "express";
import cors from "cors";
import AuthRoutes from "./Routes/Auth_Routes";
import SessionRoutes from "./Routes/Session_Routes";
import QuestionRoutes from "./Routes/Question_Routes";
import FeedbackRoutes from "./Routes/Feedback_Routes";

const app = express();
app.use(cors({ origin: [

    "http://localhost:5173",
    "https://ai-mock-interviewer-eta-wheat.vercel.app"
],
    credentials: true
 }));
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/sessions", SessionRoutes);
app.use("/api/questions", QuestionRoutes);
app.use("/api/feedback", FeedbackRoutes);

app.get("/", (req, res) => res.json({ message: "MockCoach API running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));