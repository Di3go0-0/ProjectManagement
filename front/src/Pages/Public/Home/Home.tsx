import { useEffect } from "react"
import { useAuth } from "../../../Context"


export const Home = () => {
  const { Logout } = useAuth()


  return (
    <div>
      <h1>Homke</h1>

      <button onClick={Logout}>Logout</button>
    </div >
  )
}
