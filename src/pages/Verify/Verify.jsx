import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import pagesCss from "../Pages.module.css"
import accountVerifyCss from "./Verify.module.css"
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otpArr, setOtpArr] = useState(new Array(6).fill(""));
  const refArr = useRef([]);
  const [loading, setLoading] = useState(false);
  const { backendURL, isVerified } = useContext(AppContext);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const otp = otpArr.join("");
    if (otp == null || otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP",
        { toastId: "otp-validation" },
        { className: "error-toast" }
      );
      return;
    }
    setLoading(true);
    try {
      // Verify OTP
      const response = await axios.post(`${backendURL}/verify-otp`, { email, otp });
      if (response.status === 200) {
        navigate("/public-webapp/login");
        toast.success("Account verified successfully!",
          { toastId: "success" },
          { className: "success-toast" }
        );
      }
    } catch (error) {
      setOtpArr(new Array(6).fill(""));
      toast.error(error.response.data.message || "Something went wrong",
        { toastId: "sww" },
        { className: "error-toast" }
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isVerified) navigate("/public-webapp/login");
    refArr.current[0]?.focus();
  }, [])

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...otpArr];
    newArr[index] = newValue.slice(-1);
    setOtpArr(newArr);
    newValue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  }

  function maskEmail(email) {
    if (email === null) return;
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) {
      return `${localPart[0]}*@${domain}`;
    }
    return (
      localPart[0] + ".." + localPart[localPart.length - 1] + "@" + domain
    );
  }

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    // call your API to resend OTP
    console.log("OTP Resent!");

    setTimer(60);
    setCanResend(false);
  };

  return (
    <>
      <div className={pagesCss.container}>
        <div className={pagesCss.auth_box}>

          <div className={pagesCss.auth_header}>
            <img src={assets.brandLogo} alt="Logo" width={120} />
          </div>

          <form onSubmit={onSubmitHandler}>

            <div className={accountVerifyCss.otp_box}>

              <div className={accountVerifyCss.otp_header}>
                <h3>Verify OTP</h3>
                <p>Enter the 6-digit code sent to <span>{maskEmail(email)}</span></p>
              </div>

              <div className={accountVerifyCss.otp_field_box}>
                {
                  otpArr.map((input, index) => {
                    return (
                      <input className={accountVerifyCss.otp_input}
                        name={`otp-input${index + 1}`}
                        type='text'
                        key={index}
                        value={otpArr[index]}
                        ref={input => { refArr.current[index] = input }}
                        onChange={(e) => handleOnChange(e.target.value, index)}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                      />
                    )
                  })
                }
              </div>

            </div>

            <button type='submit' className={pagesCss.btn} disabled={loading}>
              {loading ? "Please wait..." : "Verify OTP"}
            </button>

          </form>
          <div className={pagesCss.auth_footer}>
            {canResend ? (
              <p>
                Didn't receive code?{" "}
                <a
                  onClick={handleResend}
                  className={pagesCss.auth_footer_link}
                  style={{ cursor: "pointer" }}
                >
                  Resend OTP
                </a>
              </p>
            ) : (
              <p>
                You can resend OTP in{" "}{timer}s
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Verify
