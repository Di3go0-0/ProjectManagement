import { useParams } from "react-router-dom"



export const ProjectPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Page Project</h1>
      <h2>Project ID: {id}</h2>
    </div>
  )
}
