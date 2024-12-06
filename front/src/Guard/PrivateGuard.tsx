import { Navigate, Outlet } from "react-router-dom";


export const PrivateGuard = () => {
  const autenticated = false;

  //Outlet is a component that renders the children of the parent route.
  //replace the url in its entirety 
  return autenticated ? <Outlet /> : <Navigate to="/login" replace />
}



