import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound/RoutesWithNotFound"
import { Home } from "../../../Pages"

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/projects" element={<h1>Projects</h1>} />
      <Route path="/home" element={<Home />} />
      < Route path="/tasks" element={< h1 > Tasks</h1 >} />
    </RoutesWithNotFound >
  )
}

