import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import './styles/AccountVerify.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function AccountVerify() {
  const [otpArr, setOtpArr] = useState(new Array(6).fill(""));
  const refArr = useRef([]);
  const [loading, setLoading] = useState(false);
  const { backendURL } = useContext(AppContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      //Reset Password
      otp = otpArr.join("");
      const response = await axios.post(`${backendURL}/verify-otp`, { otp });
      console.log(otpArr);
      if (response.status === 200) {
        // navigate("/public-webapp/dashboard");
      }
    } catch (error) {
      setOtpArr(new Array(6).fill(""));
      toast.error(error.response.data.message,
        { className: "error-toast" }
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    refArr.current[0]?.focus();
  }, [])

  const handleOnChange = (value, index) =>{
    if(isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...otpArr];
    newArr[index] = newValue.slice(-1);
    setOtpArr(newArr);

    newValue && refArr.current[index+1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if(!e.target.value && e.key === "Backspace"){
      refArr.current[index-1]?.focus();
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

            <div className='otpBox'>
              <div className='otpheader'>
                <h3>Verify OTP</h3>
                <p>Enter the 6-digit code sent to <span>abc@gmail.com</span></p>
              </div>
              <div className='otpFieldBox'>
                {
                  otpArr.map((input, index) => {
                    return (
                      <input className='otp-input'
                        name={`otp-input${index+1}`}
                        type='text'
                        key={index}
                        value={otpArr[index]}
                        ref={input => {refArr.current[index] = input}}
                        onChange={(e) => handleOnChange(e.target.value, index)}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                      />
                    )
                  })
                }
              </div>
              <div className='otpfooter'>
                <p>Don't receive code? <strong>Resend OTP</strong></p>
              </div>
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
