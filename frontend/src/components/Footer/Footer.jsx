import React, { useContext } from 'react';
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
import { LangContext } from '../../utils/LangContext';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { content, loading } = useContext(LangContext);

  // 🔒 Don’t render until language is loaded
  if (loading || !content?.footer) return null;

  const handleScroll = (e, section) => {
    e.preventDefault();
    if (location.pathname === ROUTES.HOME) {
      scrollToSection(section);
    } else {
      navigateAndScroll(navigate, section);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === ROUTES.HOME) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(ROUTES.HOME);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">

          {/* Logo & Description */}
          <div className="footer-section footer-about">
            <Link to={ROUTES.HOME} className="footer-logo-link">
              <img
                src={logo}
                alt="OBC Rann Sangram Logo"
                className="footer-logo"
              />
            </Link>

            <p className="footer-description">
              {content.footer.description}
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
            <h3 className="footer-heading">{content.footer.quickLinks}</h3>
            <ul className="footer-links">
              <li>
                <a href="#" onClick={handleHomeClick} className="footer-link">
                  {content.footer.home}
                </a>
              </li>
              <li>
                <a
                  href={`#${SECTIONS.ABOUT}`}
                  onClick={(e) => handleScroll(e, SECTIONS.ABOUT)}
                  className="footer-link"
                >
                  {content.footer.about}
                </a>
              </li>
              <li>
                <a
                  href={`#${SECTIONS.OBJECTIVES}`}
                  onClick={(e) => handleScroll(e, SECTIONS.OBJECTIVES)}
                  className="footer-link"
                >
                  {content.footer.objectives}
                </a>
              </li>
              <li>
                <a
                  href={`#${SECTIONS.CONTACT}`}
                  onClick={(e) => handleScroll(e, SECTIONS.CONTACT)}
                  className="footer-link"
                >
                  {content.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-heading">{content.footer.contactTitle}</h3>
            <ul className="footer-contact">
              <li className="contact-item">
                <FaPhone className="contact-icon phone-icon" />
                <span>{content.footer.phone}</span>
              </li>
              <li className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>{content.footer.email}</span>
              </li>
              <li className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>{content.footer.address}</span>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="footer-section footer-important-links">
            <h3 className="footer-heading">{content.footer.importantLinks}</h3>
            <ul className="footer-links-horizontal">
              <li>
                <a href="#" className="footer-link">
                  {content.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  {content.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  {content.footer.disclaimer}
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="footer-link admin-link">
                  <FaUserShield className="admin-icon" />
                  {content.footer.admin}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} {content.footer.rights}
            </p>
            <p className="footer-tagline">
              {content.footer.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
