import Hero from "../Components/Hero";
import Login from "../Pages/Login";
import Dashborad from "../Pages/Dashboard";
import Signup from "../Pages/Signup";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import InterviewSession from "../Pages/InterviewSession";
import FeedbackPage from "../Pages/FeedbackPage";
import QuestionFeedback from "../Pages/QuestionFeedback";
import ProtectedRoute from "./Proteted_Routes";
export default function AppRoutes() {
  return (
    <>
  <Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Hero />} />
  </Route>

  {/* Protected routes — redirect to /login if not logged in */}
  <Route path="/dashboard" element={
    <ProtectedRoute><Dashborad /></ProtectedRoute>
  } />
  <Route path="/interview" element={
    <ProtectedRoute><InterviewSession /></ProtectedRoute>
  } />
  <Route path="/feedback" element={
    <ProtectedRoute><FeedbackPage /></ProtectedRoute>
  } />
  <Route path="/Question-Feedback" element={
    <ProtectedRoute><QuestionFeedback /></ProtectedRoute>
  } />

  {/* Public routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>
</>
  );
  }