import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context";

export const PrivateGuard = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

