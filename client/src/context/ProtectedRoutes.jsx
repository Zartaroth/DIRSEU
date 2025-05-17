import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { isAuthenticated, loading, getUser } = useAuth();
  const location = useLocation();
  const user = getUser(); // Obtener información del usuario

  // Mientras el estado de autenticación se verifica
  if (loading) {
    return <div>Loading...</div>; // Mostrar algo mientras se carga
  }

  // Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el usuario no tiene un rol permitido, redirigir a "No autorizado"
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  // Renderizar el contenido permitido (rutas hijas)
  return <Outlet />;
};

export default ProtectedRoutes;
