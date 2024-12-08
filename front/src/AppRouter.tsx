import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Register, Login } from "./Pages";
import { PrivateGuard } from "./Guard";

interface Props {
  children: ReactNode;
}

export const AppRouter = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Navigate to="/login" />
          } />
          <Route element={<PrivateGuard />} >
            < Route path="/register" element={<Register />} />
            < Route path="/login" element={<Login />} />
          </Route>
          <Route path="/home" element={<h1>Home</h1>} />

          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
