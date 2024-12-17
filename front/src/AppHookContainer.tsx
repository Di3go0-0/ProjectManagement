import App from "./App"
import { AppRouter } from "./AppRouter"
import { AuthProvider, ModalProvider, ProjectProvider } from "./Context"
import { TaskProvider } from "./Context/TaskContext/TaskProvider"


const AppHookContainer = () => {
  return (
    <div className="">
      <ModalProvider>
        <AuthProvider>
          <ProjectProvider>
            <TaskProvider>
              <AppRouter>
                <App />
              </ AppRouter>
            </TaskProvider>
          </ProjectProvider>
        </AuthProvider >
      </ModalProvider>
    </div >
  )
}
export default AppHookContainer;
