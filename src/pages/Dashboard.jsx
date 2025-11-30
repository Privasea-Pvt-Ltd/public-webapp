import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const {userData, setUserData, setIsLoggedIn,backendURL} = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendURL+"/logout");
      if(response.status === 200){
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/public-webapp/auth");
      }
    }catch(error){
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <h1 className='title'>Welcome {userData.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  ) 
}

export default Dashboard
