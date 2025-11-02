import './styles/Navbar.css'
import logo from "../assets/logo/logo.png"
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-logo">
          <a href="/"><img src={logo} alt='Logo' /></a>
        </div>
        <div className="nav-links">
          <ul>
              <li><a href="#products">Products</a></li>
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#about">Why Enkey</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
      </div>
      <div className="nav-authentication-wrapper">
        <div className="nav-authentication-btn">
            <a href="#signin">Login</a>
            <a href="#signup">Signup</a>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <button><i className="icon ph-bold ph-list" /></button>
        </div>
      </div>

      {/* className="portable-device"  */}
      <div className={menuOpen ? "portable-device enable-portable-device" : "portable-device"}>
        <div className="mobile-menu">
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
