import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { PrivateGuard } from "./Guard";
import { PrivateRouter, PublicRoutes, RoutesWithNotFound } from "./Components";

interface Props {
  children: ReactNode;
}

export const AppRouter = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/*" element={<PublicRoutes />} />
          <Route element={<PrivateGuard />}>
            <Route path="/private/*" element={<PrivateRouter />} />
          </Route>
        </RoutesWithNotFound>
        {children}
      </BrowserRouter >
    </>
  )
}
