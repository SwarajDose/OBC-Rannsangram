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

  const handleGetInvolvedClick = (e) => {
    e.preventDefault();
    scrollToSection(SECTIONS.CONTACT);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = {
      id: Date.now().toString(),
      fullName: formData.get('fullName'),
      mobile: formData.get('mobile'),
      state: formData.get('state'),
      district: formData.get('district'),
      taluka: formData.get('taluka'),
      village: formData.get('village'),
      pincode: formData.get('pincode'),
      submittedAt: new Date().toISOString(),
    };

    // Get existing submissions from localStorage
    const existingSubmissions = localStorage.getItem('contactFormSubmissions');
    const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : [];
    
    // Add new submission
    submissions.push(formObject);
    
    // Save back to localStorage
    localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));

    // Reset form
    e.target.reset();

    // Show success message
    alert('Thank you! Your form has been submitted successfully.');
  };

  return (
    <div className="home-page">
      <section id="hero" className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering OBC Communities Through Unity & Action
          </h1>
          <p className="hero-subtitle">
            OBC Runsangram Organization is dedicated to the protection, development, and empowerment of Other Backward Classes, Nomadic & Denotified Tribes, Alutedar, Balutedar, and Micro-OBC communities — socially, economically, educationally, and politically.
          </p>
          <div className="hero-cta">
            <a href={`#${SECTIONS.CONTACT}`} onClick={handleGetInvolvedClick} className="cta-button primary">
              Get Involved
            </a>
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

      <section id={SECTIONS.OBJECTIVES} className="objectives-section-standalone">
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

      <section id={SECTIONS.CONTACT} className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Contact Us</h2>
          <p className="contact-subtitle">
            Get in touch with us. Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile" className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="form-input"
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state" className="form-label">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="form-input"
                  placeholder="Enter your state"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="district" className="form-label">District *</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  className="form-input"
                  placeholder="Enter your district"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="taluka" className="form-label">Taluka *</label>
                <input
                  type="text"
                  id="taluka"
                  name="taluka"
                  className="form-input"
                  placeholder="Enter your taluka"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="village" className="form-label">Village *</label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  className="form-input"
                  placeholder="Enter your village"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pincode" className="form-label">Pincode *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="form-input"
                placeholder="Enter your pincode"
                pattern="[0-9]{6}"
                required
              />
            </div>

            <div className="form-submit">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;

