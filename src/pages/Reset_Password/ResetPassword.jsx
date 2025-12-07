import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
// import '../styles/Auth.css'
import pagesCss from "../Pages.module.css"
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import InputField from '../../components/FormFields/InputField';

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
      <div className={pagesCss.container}>
        <div className={pagesCss.auth_box}>

          <div className={pagesCss.auth_header}>
            <img src={assets.brandLogo} alt="Logo" />
          </div>

          <form onSubmit={onSubmitHandler}>

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder='Email'
              value={email}
              onChange={setEmail}
              autoFocus={true}
              autoComplete='off'
            />

            <InputField
              id="otp"
              label="OTP"
              type="text"
              placeholder='OTP'
              value={otp}
              onChange={setOtp}
              autoFocus={false}
              autoComplete='off'
            />

            <InputField
              id="npassword"
              label="New Password"
              type="password"
              placeholder='New Password'
              value={nPassword}
              onChange={setNPassword}
              autoFocus={false}
              autoComplete='off'
              blockCopyPaste={true}
            />

            <InputField
              id="cpassword"
              label="Confirm Password"
              type="password"
              placeholder='Confirm Password'
              value={cPassword}
              onChange={setCPassword}
              autoFocus={false}
              autoComplete='off'
              blockCopyPaste={true}
            />

            <button type='submit' className={pagesCss.btn} disabled={loading}>
              {loading ? "Please wait..." : "Reset Password"}
            </button>

          </form>

          <div className={pagesCss.auth_footer}>
            <p><Link to="/public-webapp/login" className={pagesCss.auth_footer_link}>Back to login</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
