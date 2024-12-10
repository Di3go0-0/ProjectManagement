import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound/RoutesWithNotFound"
import { Login, Register } from "../../../Pages"

export const PublicRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </RoutesWithNotFound>
  )
}

