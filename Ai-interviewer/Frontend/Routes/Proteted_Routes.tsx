import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../src/Services/api";
import type { JSX } from "react/jsx-runtime";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  return children;
}