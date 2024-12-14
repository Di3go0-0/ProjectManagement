import { useNavigate, useParams } from "react-router-dom"
import './Project.css'
import { useProject } from "../../../Context";
import { useEffect } from "react";



export const ProjectPage = () => {
  const { id } = useParams();
  const { GetProject, project } = useProject();

  const navigate = useNavigate();

  useEffect(() => {
    const idString = id as string;
    GetProject(idString);

    if (!project) {
      navigate('/private/home');
    }
  }, [id, navigate, project, GetProject]);


  return (
    <div className="project-body" >
      <h1>Page Project</h1>
      <h2>Project ID: {id}</h2>
      <h3>Project Name: {project?.title}</h3>
      <h3>Project Description: {project?.description}</h3>

    </div>
  )
}
