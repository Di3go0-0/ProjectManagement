import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context";
import { useEffect, useState } from "react";

export const PrivateGuard = () => {
  const { isAuthenticated } = useAuth();
  const [authStatus, setAuthStatus] = useState(isAuthenticated);

  useEffect(() => {
    setAuthStatus(isAuthenticated);
  }, [isAuthenticated]);

  return authStatus ? <Outlet /> : <Navigate to="/login" replace />
}



