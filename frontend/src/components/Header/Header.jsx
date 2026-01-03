import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { scrollToSection, navigateAndScroll } from '../../utils/scrollToSection';
import { SECTIONS, ROUTES } from '../../constants/routes';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === ROUTES.HOME) {
      scrollToSection(SECTIONS.ABOUT);
    } else {
      navigateAndScroll(navigate, SECTIONS.ABOUT);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="OBC Rann Sangram Logo" className="logo-img" />
          </Link>
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to={ROUTES.HOME} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <a href={`#${SECTIONS.ABOUT}`} onClick={handleAboutClick} className="nav-link">About</a>
            </li>
          </ul>
          <Link to={ROUTES.CONTACT} className="header-cta-button">
            <FaPhone className="call-icon" />
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

