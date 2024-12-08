import './App.css'
import { Register } from './Pages'
import { AuthProvider } from './Context'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Public/Login/Login'

function App() {

  return (
    <div className='Body'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Navigate to="/register" />
            } />

            < Route path="/register" element={<Register />} />
            < Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>

      </AuthProvider>
    </div>
  )
}

export default App
