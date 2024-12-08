import { useAuth } from "../../../Context"


export const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth()

  console.log(isAuthenticated)


  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsAuthenticated(false)}>Logout</button>
    </div>
  )
}
