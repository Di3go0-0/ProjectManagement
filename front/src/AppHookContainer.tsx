import App from "./App"
import { AppRouter } from "./AppRouter"
import { AuthProvider } from "./Context"


const AppHookContainer = () => {
  return (
    <div className="gradient-background">
      <AuthProvider>
        <AppRouter>
          <App />
        </ AppRouter>
      </AuthProvider >

    </div>
  )
}
export default AppHookContainer;
