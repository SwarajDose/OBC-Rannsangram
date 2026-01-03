import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaHandsHelping, FaUserFriends, FaUsersCog } from 'react-icons/fa';
import heroImage from '../../assets/hero-community.jpg';
import { scrollToSection } from '../../utils/scrollToSection';
import { SECTIONS, ROUTES } from '../../constants/routes';
import './Home.css';

const Home = () => {
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    scrollToSection(SECTIONS.ABOUT);
  };

  return (
    <div className="home-page">
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering OBC Communities Through Unity & Action
          </h1>
          <p className="hero-subtitle">
            OBC Runsangram Organization is dedicated to the protection, development, and empowerment of Other Backward Classes, Nomadic & Denotified Tribes, Alutedar, Balutedar, and Micro-OBC communities — socially, economically, educationally, and politically.
          </p>
          <div className="hero-cta">
            <Link to={ROUTES.CONTACT} className="cta-button primary">
              Get Involved
            </Link>
            <a href={`#${SECTIONS.ABOUT}`} onClick={handleLearnMoreClick} className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id={SECTIONS.ABOUT} className="about-section-home">
        <div className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-hero-title">ABOUT US</h1>
          </div>
        </div>
        
        <div className="about-container">
          <section className="about-section">
            <h2 className="section-title">Who We Are</h2>
            <div className="about-content">
              <p className="about-text">
                OBC Runsangram Organization is a social and political movement dedicated to the protection, development, and empowerment of the Other Backward Classes (OBC) and allied marginalized communities.
              </p>
              <p className="about-text">
                We function based on constitutional values and actively work for the social, economic, educational, and political upliftment of OBC society. Our organization brings together diverse OBC groups to address their challenges and fight injustice collectively.
              </p>
            </div>
          </section>

          <section className="communities-section">
            <h2 className="section-title">Communities We Represent</h2>
            <p className="communities-subtitle">
              We represent and work for the welfare of diverse communities that fall under the Other Backward Classes category.
            </p>
            <div className="communities-grid">
              <div className="community-card">
                <div className="community-icon-wrapper">
                  <FaUsers className="community-icon" />
                </div>
                <h3 className="community-title">Other Backward Classes (OBC)</h3>
              </div>
              
              <div className="community-card">
                <div className="community-icon-wrapper">
                  <FaHandsHelping className="community-icon" />
                </div>
                <h3 className="community-title">Nomadic & Vimukta Jatis</h3>
              </div>
              
              <div className="community-card">
                <div className="community-icon-wrapper">
                  <FaUserFriends className="community-icon" />
                </div>
                <h3 className="community-title">Alutedar & Balutedar</h3>
              </div>
              
              <div className="community-card">
                <div className="community-icon-wrapper">
                  <FaUsersCog className="community-icon" />
                </div>
                <h3 className="community-title">Micro OBC Communities</h3>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Home;

