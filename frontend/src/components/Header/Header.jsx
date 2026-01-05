import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { scrollToSection, navigateAndScroll } from '../../utils/scrollToSection';
import { SECTIONS, ROUTES } from '../../constants/routes';
import { LangContext } from '../../utils/LangContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { content, lang, loading, changeLang } = useContext(LangContext);

  // ⛔ Hard stop until language is ready
  if (loading || !content?.nav) return null;

  const handleHomeClick = (e) => {
    e.preventDefault();

    if (location.pathname === ROUTES.HOME) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(ROUTES.HOME);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 120);
    }
  };

  const handleScroll = (e, section) => {
    e.preventDefault();

    if (location.pathname === ROUTES.HOME) {
      scrollToSection(section);
    } else {
      navigateAndScroll(navigate, section);
    }
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="logo-container">
          <Link to={ROUTES.HOME} className="logo-link" onClick={handleHomeClick}>
            <img
              src={logo}
              alt="OBC Rann Sangram Logo"
              className="logo-img"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a
                href={ROUTES.HOME}
                onClick={handleHomeClick}
                className="nav-link"
              >
                {content.nav.home}
              </a>
            </li>

            <li className="nav-item">
              <a
                href={`#${SECTIONS.ABOUT}`}
                onClick={(e) => handleScroll(e, SECTIONS.ABOUT)}
                className="nav-link"
              >
                {content.nav.about}
              </a>
            </li>

            <li className="nav-item">
              <a
                href={`#${SECTIONS.QUERIES}`}
                onClick={(e) => handleScroll(e, SECTIONS.QUERIES)}
                className="nav-link"
              >
                {content.nav.queries}
              </a>
            </li>

            <li className="nav-item">
              <a
                href={`#${SECTIONS.CONTACT}`}
                onClick={(e) => handleScroll(e, SECTIONS.CONTACT)}
                className="nav-link"
              >
                {content.nav.contact}
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="header-actions">

            {/* Language Switcher */}
            <div className="lang-switcher-wrapper">
              <select
                className="lang-switcher"
                value={lang}
                onChange={(e) => changeLang(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="hi">हिं</option>
                <option value="mr">मर</option>
              </select>
            </div>

            {/* CTA */}
            <a
              href={`#${SECTIONS.CONTACT}`}
              onClick={(e) => handleScroll(e, SECTIONS.CONTACT)}
              className="header-cta-button"
            >
              <FaPhone className="call-icon" />
              {content.nav.getInTouch}
            </a>

          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
