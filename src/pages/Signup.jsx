import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import './styles/Auth.css'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendURL} = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      //Signup
      const response = await axios.post(`${backendURL}/signup`, { name, email, password });
      if (response.status === 201) {
        navigate("/public-webapp/account-verify");
        toast.success("Account created successfully.");
      } else {
        toast.error("Email already exists");
      }
    } catch (error) {
      setPassword("");
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
              <label htmlFor="name">Name</label>
              <input type='text' id='name' placeholder='Name' autoFocus required onChange={(e) => setName(e.target.value)} value={name} />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input type='email' id='email' placeholder='Email' autoFocus required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            <div>
              <div className="passwordwrapper">
                <label htmlFor="password">Password</label>
              </div>
              <input type='password'
                name='password'
                id='password'
                placeholder='Password'
                required
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button type='submit' className='btn' disabled={loading}>
              {loading ? "Please wait..." : "Signup"}
            </button>

          </form>

          <div className='divider'>
            <span>OR</span>
          </div>

          <button className='social-btn'><img src={assets.googleIcon} alt="Google Icon" />Sign in with Google</button>
          <button className='social-btn'><img src={assets.appleIcon} alt="Apple Icon" />Sign in with Apple</button>

          <div className='switcher'>
            <p>Already have an account? <Link to="/public-webapp/login" className='loginLink'>Login</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
