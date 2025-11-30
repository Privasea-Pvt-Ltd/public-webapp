import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import AccountVerify from './pages/AccountVerify'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <>
      <ToastContainer position="bottom-right"/>
      <Routes>
        <Route path='/public-webapp' element={<Home />} />
        <Route path='/public-webapp/auth' element={<Auth />} />
        <Route path='/public-webapp/account-verify' element={<AccountVerify/>} />
        <Route path='/public-webapp/reset-password' element={<ResetPassword/>} />
        <Route path='/public-webapp/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
