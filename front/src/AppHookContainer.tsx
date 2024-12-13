import App from "./App"
import { AppRouter } from "./AppRouter"
import { AuthProvider, ModalProvider, ProjectProvider } from "./Context"


const AppHookContainer = () => {
  return (
    <div className="">
      <ModalProvider>
        <AuthProvider>
          <ProjectProvider>
            <AppRouter>
              <App />
            </ AppRouter>
          </ProjectProvider>
        </AuthProvider >
      </ModalProvider>
    </div >
  )
}
export default AppHookContainer;
