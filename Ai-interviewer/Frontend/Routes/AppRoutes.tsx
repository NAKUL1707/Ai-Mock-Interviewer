import Hero from "../Components/Hero";
import Login from "../Pages/Login";
import Dashborad from "../Pages/Dashboard";
import Signup from "../Pages/Signup";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import InterviewSession from "../Pages/InterviewSession";
import FeedbackPage from "../Pages/FeedbackPage";
import QuestionFeedback from "../Pages/QuestionFeedback";
export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Hero />} />
          <Route path="/interview" element={<InterviewSession/>} />
        </Route>
      <Route path = '/Question-Feedback' element={<QuestionFeedback/>} />
      <Route path="/feedback" element={<FeedbackPage/>} />
      <Route path="/dashboard" element={<Dashborad/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  );
}
