import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context";

export const PrivateGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // O puedes mostrar un spinner de carga.
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


