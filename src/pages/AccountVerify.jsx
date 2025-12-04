import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import './styles/Auth.css'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function AccountVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      //Reset Password
      const response = await axios.post(`${backendURL}/verify-otp`, {otp});
      if (response.status === 200) {
        // navigate("/public-webapp/dashboard");
      }
    } catch (error) {
      setOtp("");
      toast.error(error.response.data.message,
        { className: "error-toast" }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="auth-container">
        <div className="authbox">

          <div className="logo-container">
            <Link to="/public-webapp" ><img src={assets.brandLogo} alt="Logo" width={120} /></Link>
          </div>

          <form onSubmit={onSubmitHandler}>

            <div>
              <label htmlFor="otp">OTP</label>
              <input type='text' id='otp' placeholder='OTP' required onChange={(e) => setOtp(e.target.value)} value={otp} />
            </div>

            <button type='submit' className='btn' disabled={loading}>
              {loading ? "Please wait..." : "Verify OTP"}
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default AccountVerify
