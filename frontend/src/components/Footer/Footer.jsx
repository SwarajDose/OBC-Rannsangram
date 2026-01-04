import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram,
  FaLinkedin,
  FaUserShield
} from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { ROUTES, SECTIONS } from '../../constants/routes';
import { scrollToSection, navigateAndScroll } from '../../utils/scrollToSection';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === ROUTES.HOME) {
      scrollToSection(SECTIONS.ABOUT);
    } else {
      navigateAndScroll(navigate, SECTIONS.ABOUT);
    }
  };

  const handleObjectivesClick = (e) => {
    e.preventDefault();
    if (location.pathname === ROUTES.HOME) {
      scrollToSection(SECTIONS.OBJECTIVES);
    } else {
      navigateAndScroll(navigate, SECTIONS.OBJECTIVES);
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
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section footer-about">
            <Link to={ROUTES.HOME} className="footer-logo-link">
              <img src={logo} alt="OBC Rann Sangram Logo" className="footer-logo" />
            </Link>
            <p className="footer-description">
              OBC Runsangram Organization is dedicated to the protection, development, and empowerment of Other Backward Classes, Nomadic & Denotified Tribes, and allied marginalized communities.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#" onClick={handleHomeClick} className="footer-link">Home</a>
              </li>
              <li>
                <a href={`#${SECTIONS.ABOUT}`} onClick={handleAboutClick} className="footer-link">About Us</a>
              </li>
              <li>
                <a href={`#${SECTIONS.OBJECTIVES}`} onClick={handleObjectivesClick} className="footer-link">Our Objectives</a>
              </li>
              <li>
                <a href={`#${SECTIONS.CONTACT}`} onClick={handleContactClick} className="footer-link">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>info@obcrannsangram.org</span>
              </li>
              <li className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="footer-section footer-important-links">
            <h3 className="footer-heading">Important Links</h3>
            <ul className="footer-links-horizontal">
              <li>
                <a href="#" className="footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="footer-link">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="footer-link">Disclaimer</a>
              </li>
              <li>
                <Link to="/admin/login" className="footer-link admin-link">
                  <FaUserShield className="admin-icon" />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} OBC Rann Sangram Organization. All rights reserved.
            </p>
            <p className="footer-tagline">
              Empowering OBC Communities Through Unity & Action
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

