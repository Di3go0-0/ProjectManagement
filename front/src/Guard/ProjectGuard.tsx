import { ReactNode } from "react"
import { Navigate, useParams } from "react-router-dom"
import { useProject } from "../Context"

interface Props {
  children: ReactNode
}

export const ProjectGuard = ({ children }: Props) => {
  const { id } = useParams()
  const idNumber = Number(id)
  const { projects } = useProject();

  const project = projects.find((project) => project.id === idNumber)

  return project ? children : <Navigate to="/private/home" replace />;
}

