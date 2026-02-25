import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login/Login'
import Verify from './pages/Verify/Verify'
import VerificationRoute from './routes/VerificationRoute'

function App() {
  return (
    <>
      <ToastContainer position="bottom-right"/>
      <Routes>
        <Route path='/public-webapp' element={<Home />} />
        <Route path='/public-webapp/login' element={<Login />} /> 

        <Route path='/public-webapp/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/public-webapp/verify' element={
          <VerificationRoute>
            <Verify/>
          </VerificationRoute>
        } />

      </Routes>
    </>
  )
}

export default App
