import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound/RoutesWithNotFound"

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/projects" element={<h1>Projects</h1>} />
      <Route path="/home" element={<h1>home</h1>} />
      <Route path="/tasks" element={<h1>Tasks</h1>} />
    </RoutesWithNotFound >
  )
}

