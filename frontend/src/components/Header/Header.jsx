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

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === ROUTES.HOME) {
      scrollToSection(SECTIONS.CONTACT);
    } else {
      navigateAndScroll(navigate, SECTIONS.CONTACT);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === ROUTES.HOME) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(ROUTES.HOME);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link" onClick={handleHomeClick}>
            <img src={logo} alt="OBC Rann Sangram Logo" className="logo-img" />
          </Link>
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" onClick={handleHomeClick} className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href={`#${SECTIONS.ABOUT}`} onClick={handleAboutClick} className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href={`#${SECTIONS.CONTACT}`} onClick={handleContactClick} className="nav-link">Contact Us</a>
            </li>
          </ul>
          <a href={`#${SECTIONS.CONTACT}`} onClick={handleContactClick} className="header-cta-button">
            <FaPhone className="call-icon" />
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

