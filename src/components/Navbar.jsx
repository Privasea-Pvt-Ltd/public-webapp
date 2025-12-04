import './styles/Navbar.css'
import { assets } from '../assets/assets.js';
import { navigation } from "../constants";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-logo">
          <a href="/"><img src={assets.brandLogo} alt='Logo' /></a>
        </div>
        <div className="nav-links">
          <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="nav-authentication-wrapper">
        <div className="nav-authentication-btn">
            <a onClick={() => navigate("/public-webapp/login")}>Login</a>
            <a onClick={() => navigate("/public-webapp/signup")}>Signup</a>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {
              menuOpen ? 
              <button className='black'><i className="icon ph-bold ph-x" /></button> : 
              <button><i className="icon ph-bold ph-list" /></button>
            }
        </div>
      </div>

      <div className={menuOpen ? "portable-device enable-portable-device" : "portable-device"}>
        <div className="mobile-menu">
          <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
              <div className="mobile-authentication-module enable-mobile-mode">
                <a onClick={() => navigate("/public-webapp/login")}>Login</a>
                <a onClick={() => navigate("/public-webapp/signup")}>Signup</a>
              </div>
          </ul>
        </div>
      </div >
    </nav>
  );
};

export default Navbar;
