import './App.css'
import { Register, Login, Home } from './Pages'
import { AuthProvider } from './Context'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PrivateGuard } from './Guard'

function App() {


  return (
    <div className='Body'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Navigate to="/login" />
            } />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateGuard />} >
              <Route path="/home" element={<Home />} />
            </Route>

            <Route path="/home" element={<Home />} />

            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>

      </AuthProvider>
    </div >
  )
}

export default App
