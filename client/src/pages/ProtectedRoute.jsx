import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loader from "./Loader";

export default function ProtectedRoute({ validate, to = "/" }) {
  const { loading } = useAuth();

  if (loading) return <Loader />;
  return !loading && validate ? <Outlet /> : <Navigate to={to} replace />;
}
