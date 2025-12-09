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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendURL, isLoggedIn, setIsLoggedIn, setIsVerified, loadProfile } = useContext(AppContext);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        if (!email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "Enter a valid email";
        return "";
    };

    const validatePassword = (password) => {
        if (!password.trim()) return "Password is required";
        const strong =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strong.test(password))
            return "Minimum 8 chars with uppercase, lowercase, number, and symbol.";
        return "";
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);

        if (emailErr || passwordErr) {
            toast.error((emailErr || passwordErr),
                { toastId: "validation" },
                { className: "error-toast" }
            );
            return;
        }

        setLoading(true);
        try {
            //Login
            const response = await axios.post(`${backendURL}/login`, { email, password });
            if (response.status === 200) {
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
                navigate(`/public-webapp/verify?email=${email}`);
            } else {
                setPassword("");
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
                        id="password"
                        label="Password"
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={setPassword}
                        autoFocus={false}
                        autoComplete='off'
                        blockCopyPaste={true}
                        rightElement={
                            <Link to="/public-webapp/reset-password" className='label_right_link'>Forgot password?</Link>
                        }
                    />

                    <button type='submit' className={pagesCss.btn} disabled={loading}>
                        {loading ? "Please wait..." : "Login"}
                    </button>

                </form>

                <Divider />

                <button className={pagesCss.social_btn}><img src={assets.googleIcon} alt="Google Icon" />Sign in with Google</button>
                <button className={pagesCss.social_btn}><img src={assets.appleIcon} alt="Apple Icon" />Sign in with Apple</button>

                <div className={pagesCss.auth_footer}>
                    <p>Don't have an account? <Link to="/public-webapp/signup" className={pagesCss.auth_footer_link}>Signup</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login
