import App from "./App"
import { AppRouter } from "./AppRouter"
import { AuthProvider, ProjectProvider } from "./Context"


const AppHookContainer = () => {
  return (
    <div className="gradient-background">
      <AuthProvider>
        <ProjectProvider>
          <AppRouter>
            <App />
          </ AppRouter>
        </ProjectProvider>
      </AuthProvider >

    </div >
  )
}
export default AppHookContainer;
