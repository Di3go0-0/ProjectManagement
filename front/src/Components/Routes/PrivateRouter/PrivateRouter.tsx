import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound/RoutesWithNotFound"
import { Home, ProjectPage } from "../../../Pages"
import { Navbar } from "../../Navbar/Nav"

export const PrivateRouter = () => {
  return (
    <>
      <Navbar />
      <RoutesWithNotFound>
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/home" element={<Home />} />
        < Route path="/tasks" element={< h1 > Tasks</h1 >} />
      </RoutesWithNotFound >
    </>
  )
}

