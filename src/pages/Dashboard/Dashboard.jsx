import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import dashboardCss from "./Dashboard.module.css"
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Dashboard() {
  const { setIsLoggedIn, setIsVerified, backendURL, authName } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendURL + "/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        setIsVerified(false);
        toast.success("Logged out successfully!",
          { toastId: "success" },
          { className: "success-toast" }
        );
        navigate("/public-webapp/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className={dashboardCss.dashboard_container}>
      <h1 className={dashboardCss.title}>Welcome {authName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
