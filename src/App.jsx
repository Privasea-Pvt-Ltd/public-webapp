import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AccountVerify from './pages/AccountVerify'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <ToastContainer position="bottom-right"/>
      <Routes>
        <Route path='/public-webapp' element={<Home />} />
        <Route path='/public-webapp/login' element={<Login />} /> 
        <Route path='/public-webapp/signup' element={<Signup />} />
        <Route path='/public-webapp/reset-password' element={<ResetPassword/>} />

        <Route path='/public-webapp/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/public-webapp/account-verify' element={
          <ProtectedRoute>
            <AccountVerify/>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
