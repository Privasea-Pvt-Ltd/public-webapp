import navbarCss from './Navbar.module.css'
import { assets } from '../../assets/assets.js';
import { navigation } from "../../constants/index.js";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav>
      <div className={navbarCss.nav_wrapper}>
        <div className={navbarCss.nav_logo}>
          <a href="/"><img src={assets.brandLogo} alt='Logo' /></a>
        </div>
        <div className={navbarCss.nav_links}>
          <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={navbarCss.nav_authentication_wrapper}>
        <div className={navbarCss.nav_authentication_btn}>
            <a onClick={() => navigate("/public-webapp/login")}>Login</a>
            <a onClick={() => navigate("/public-webapp/signup")}>Signup</a>
        </div>
        <div className={navbarCss.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {
              menuOpen ? 
              <button className={navbarCss.black}><i className="icon ph-bold ph-x" /></button> : 
              <button><i className="icon ph-bold ph-list" /></button>
            }
        </div>
      </div>

      <div className={menuOpen ? `${navbarCss.portable_device} ${navbarCss.enable_portable_device}` : `${navbarCss.portable_device}`}>
        <div className={navbarCss.mobile_menu}>
          <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
              <div className= {`${navbarCss.mobile_authentication_module} ${navbarCss.enable_mobile_mode}`}>
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
