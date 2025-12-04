import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import './styles/Auth.css'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [nPassword, setNPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
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
      const response = await axios.post(`${backendURL}/reset-password`, { email, nPassword, otp });
      if (response.status === 200) {
        // navigate("/public-webapp/dashboard");
      }
    } catch (error) {
      setOtp("");
      setNPassword("");
      setCPassword("");
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
              <label htmlFor="email">Email</label>
              <input type='email' id='email' placeholder='Email' autoFocus required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            <div>
              <label htmlFor="otp">OTP</label>
              <input type='text' id='otp' placeholder='OTP' required onChange={(e) => setOtp(e.target.value)} value={otp} />
            </div>

            <div>
              <div className="passwordwrapper">
                <label htmlFor="npassword">New Password</label>
              </div>
              <input type='password'
                name='npassword'
                id='npassword'
                placeholder='New Password'
                required
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                autoComplete="off"
                onChange={(e) => setNPassword(e.target.value)}
                value={nPassword}
              />
            </div>

            <div>
              <div className="passwordwrapper">
                <label htmlFor="cpassword">Confirm Password</label>
              </div>
              <input type='password'
                name='cpassword'
                id='cpassword'
                placeholder='Confirm Password'
                required
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                autoComplete="off"
                onChange={(e) => setCPassword(e.target.value)}
                value={cPassword}
              />
            </div>

            <button type='submit' className='btn' disabled={loading}>
              {loading ? "Please wait..." : "Reset Password"}
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
