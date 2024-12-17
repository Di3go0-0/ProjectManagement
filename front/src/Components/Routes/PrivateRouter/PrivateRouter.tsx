import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../RoutesWithNotFound/RoutesWithNotFound"
import { Home, ProjectPage } from "../../../Pages"
import { Navbar } from "../../Navbar/Nav"
import { ProjectGuard } from "../../../Guard"

export const PrivateRouter = () => {
  return (
    <>
      <Navbar />
      <RoutesWithNotFound>
        <Route path="/project/:id" element={
          <ProjectGuard>
            <ProjectPage />
          </ProjectGuard>
        } />
        <Route path="/home" element={<Home />} />
        < Route path="/tasks" element={< h1 > Tasks</h1 >} />
      </RoutesWithNotFound >
    </>
  )
}

