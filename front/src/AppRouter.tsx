import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Components";

interface Props {
  children: ReactNode;
}

export const AppRouter = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Navigate to="/home" />
          } />
          < Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
