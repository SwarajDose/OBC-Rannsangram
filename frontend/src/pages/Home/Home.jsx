import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaHandsHelping, 
  FaUserFriends, 
  FaUsersCog,
  FaShieldAlt,
  FaCertificate,
  FaGraduationCap,
  FaChartLine,
  FaGavel,
  FaHeartbeat,
  FaFemale,
  FaVoteYea,
  FaMonument
} from 'react-icons/fa';
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

          <section className="vision-mission-section">
            <div className="vision-mission-grid">
              <div className="vision-mission-card">
                <h2 className="vm-title">Our Vision</h2>
                <p className="vm-text">
                  To create an empowered, educated, and economically strong OBC community that participates actively in nation-building while preserving its cultural identity and constitutional rights.
                </p>
              </div>

              <div className="vision-mission-card">
                <h2 className="vm-title">Our Mission</h2>
                <p className="vm-text">
                  To protect reservation rights, provide educational support, offer legal assistance, and empower OBC communities through comprehensive development programs and political representation.
                </p>
              </div>
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

      <section className="objectives-section-standalone">
        <div className="objectives-container">
          <h2 className="section-title">Working for Community Welfare</h2>
          <p className="objectives-subtitle">
            We are committed to the holistic development of OBC communities through these key initiatives, ensuring progress in every aspect of life.
          </p>
          <div className="objectives-grid">
              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaShieldAlt className="objective-icon" />
                </div>
                <h3 className="objective-title">Reservation Protection</h3>
                <p className="objective-description">
                  Safeguarding and strengthening the constitutional reservation benefits for OBC communities in education, employment, and governance.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaCertificate className="objective-icon" />
                </div>
                <h3 className="objective-title">Fake Caste Certificate Control</h3>
                <p className="objective-description">
                  Working to eliminate the menace of fake caste certificates that deprive genuine OBC candidates of their rightful opportunities.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaGraduationCap className="objective-icon" />
                </div>
                <h3 className="objective-title">Educational Support</h3>
                <p className="objective-description">
                  Comprehensive educational initiatives to ensure OBC students have access to quality education and career opportunities.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaChartLine className="objective-icon" />
                </div>
                <h3 className="objective-title">Economic Empowerment</h3>
                <p className="objective-description">
                  Programs designed to improve the economic condition of OBC communities through skill development and entrepreneurship.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaGavel className="objective-icon" />
                </div>
                <h3 className="objective-title">Legal Assistance</h3>
                <p className="objective-description">
                  Providing legal aid and advocacy to community members facing discrimination, rights violations, or legal challenges.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaHeartbeat className="objective-icon" />
                </div>
                <h3 className="objective-title">Health & Welfare Programs</h3>
                <p className="objective-description">
                  Healthcare initiatives and welfare programs to ensure the physical and mental well-being of community members.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaFemale className="objective-icon" />
                </div>
                <h3 className="objective-title">Women Empowerment</h3>
                <p className="objective-description">
                  Special focus on uplifting women in OBC communities through education, skill development, and leadership opportunities.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaVoteYea className="objective-icon" />
                </div>
                <h3 className="objective-title">Political Representation</h3>
                <p className="objective-description">
                  Encouraging active political participation and ensuring adequate representation of OBC communities in governance.
                </p>
              </div>

              <div className="objective-card">
                <div className="objective-icon-wrapper">
                  <FaMonument className="objective-icon" />
                </div>
                <h3 className="objective-title">Cultural Preservation</h3>
                <p className="objective-description">
                  Celebrating and preserving the rich cultural heritage, traditions, and identity of various OBC communities.
                </p>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

