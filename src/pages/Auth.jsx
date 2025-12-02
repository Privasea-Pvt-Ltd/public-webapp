import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import './styles/Auth.css'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


function Login() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {backendURL, setIsLoggedIn, getUserData} = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try{
      if(isCreateAccount){
        //Signup
        const response = await axios.post(`${backendURL}/signup`, {name, email, password});
        if(response.status === 201){
          navigate("/public-webapp/auth");
          toast.success("Account created successfully.");
        }else{
          toast.error("Email already exists");
        }
      }else{
        //Login
        const response = await axios.post(`${backendURL}/login`, {email, password});
        if(response.status === 200){
          setIsLoggedIn(true);
          getUserData();
          navigate("/public-webapp/dashboard");
        }else{
          toast.error("Email or Password is incorrect!");
        }
      }
    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
      <div className="auth-container">
        <div className="authbox">

          <div className="logo-container">
            <Link to="/public-webapp" ><img src={assets.brandLogo} alt="Logo" width={120}/></Link>
          </div>

          <form onSubmit={onSubmitHandler}>
            {
              isCreateAccount && (
                <div>
                  <label htmlFor="fullName">Full name</label>
                  <input type='text' id='fullName' placeholder='Enter fullname' autoFocus required onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
              )
            }
            <div>
              <label htmlFor="email">Email</label>
              <input type='email' id='email' placeholder='Enter email' autoFocus required onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>

            <div>
              <div className="passwordwrapper">
                <label htmlFor="password">Password</label>
                <Link to="/public-webapp/reset-password" className='forgotPasswordlink'>Forgot password?</Link>
              </div>
              <input type='password' id='password' placeholder='Enter password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>

            <button type='submit' className='btn' disabled={loading}>
              {loading ? "Loading..." : isCreateAccount ? "Signup" : "Login"}
              {/* {isCreateAccount ? "Signup" : "Login"} */}
            </button>
          </form>
           <div className='divider'>
              <span>OR</span>
            </div>

            <button className='social-btn'><img src={assets.googleIcon} alt="Google Icon" />Sign in with Google</button>
            <button className='social-btn'><img src={assets.appleIcon} alt="Apple Icon" />Sign in with Apple</button>

            <div className='switcher'>
              <p>
                {isCreateAccount ? 
                (<>Already have an account? <span onClick={() => setIsCreateAccount(false)}>Login</span></>):
                (<> Don't have an account? <span onClick={() => setIsCreateAccount(true)}>Signup</span></>)
                }
              </p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login
