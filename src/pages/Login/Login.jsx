import { Link, Navigate, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
// import "../styles/Auth.css"
import pagesCss from "../Pages.module.css"
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Divider from '../../components/Divider/Divider'
import InputField from '../../components/FormFields/InputField'

function Login() {
    const [emailormobile, setEmailormobile] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendURL, isLoggedIn, setIsLoggedIn, loadProfile } = useContext(AppContext);
    const navigate = useNavigate();

    const validateEmailOrMobile = (emailormobile) => {
        if (!emailormobile.trim()) return "Email or mobile number is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{7,14}$/;
        if (emailRegex.test(emailormobile)) return "";
        if (phoneRegex.test(emailormobile)) return "";
        return "Please enter a valid email or mobile number";
    };

    // Submit Logic
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const emailorMobileErr = validateEmailOrMobile(emailormobile);
        if (emailorMobileErr) {
            toast.error((emailorMobileErr),
                { toastId: "validation" },
                { className: "error-toast" }
            );
            return;
        }
        setLoading(true);        
        try {
            const response = await axios.post(`${backendURL}/login`, { emailormobile });
            if (response.status === 200) {
                // Prompt for OTP
                setIsLoggedIn(true);
                navigate("/public-webapp/dashboard");
            }
        } catch (error) {
            if (error.response.data.status === 403) {
                toast.info("Please verify your account",
                    { toastId: "sww" },
                    { className: "error-toast" }
                );
                setIsVerified("not_verified");
                navigate(`/public-webapp/verify?emailormobile=${emailormobile}`);
            } else {
                // setPassword("");
                toast.error(error.response.data?.message || "Something went wrong",
                    { toastId: "sww" },
                    { className: "error-toast" }
                );
            }
        } finally {
            setLoading(false);
        }
    }
    // console.log(isLoggedIn);
    if(isLoggedIn){
        return <Navigate to="/public-webapp/dashboard" replace />;
    }

    return (
        <div className={pagesCss.container}>
            <div className={pagesCss.auth_box}>

                <div className={pagesCss.auth_header}>
                    <img src={assets.brandLogo} alt="Logo" />
                </div>

                <form onSubmit={onSubmitHandler}>
                    <InputField
                        id="emailormobile"
                        label=""
                        type="text"
                        placeholder='Email or mobile number'
                        value={emailormobile}
                        onChange={setEmailormobile}
                        autoFocus={true}
                        autoComplete='off'
                    />

                    <button type='submit' className={pagesCss.btn} disabled={loading}>
                        {loading ? "Please wait..." : "Continue"}
                    </button>
                </form>

                <Divider />

                <button className={pagesCss.social_btn}><img src={assets.googleIcon} alt="Google Icon" />Sign in with Google</button>
                <button className={pagesCss.social_btn}><img src={assets.appleIcon} alt="Apple Icon" />Sign in with Apple</button>

                {/* <div className={pagesCss.auth_footer}>
                    <p>Don't have an account? <Link to="/public-webapp/signup" className={pagesCss.auth_footer_link}>Signup</Link></p>
                </div> */}
            </div>
        </div>
    );
}

export default Login
