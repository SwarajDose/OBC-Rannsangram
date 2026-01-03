import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
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
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
          <Link to="/contact" className="header-cta-button">
            <FaPhone className="call-icon" />
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

