import './styles/Navbar.css'
import { brandLogo } from '../assets';
import { navigation } from "../constants";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-logo">
          <a href="/"><img src={brandLogo} alt='Logo' /></a>
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
            <a href="#signin">Login</a>
            <a href="#signup">Download</a>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <button><i className="icon ph-bold ph-list" /></button>
        </div>
      </div>

      <div className={menuOpen ? "portable-device enable-portable-device" : "portable-device"}>
        <div className="mobile-menu">
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
