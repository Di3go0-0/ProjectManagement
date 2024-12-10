import App from "./App"
import { AppRouter } from "./AppRouter"
import { AuthProvider } from "./Context"


const AppHookContainer = () => {
  return (
    <AuthProvider>
      <AppRouter>
        <App />
      </ AppRouter>
    </AuthProvider >
  )
}
export default AppHookContainer;
