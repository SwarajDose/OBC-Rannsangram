import React, { useState, useContext } from "react";
import stateDistrictData from "../../utils/stateDistrictData";
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
  FaMonument,
} from "react-icons/fa";
import heroImage from "../../assets/hero-community.jpg";
import { scrollToSection } from "../../utils/scrollToSection";
import { SECTIONS } from "../../constants/routes";
import { LangContext } from "../../utils/LangContext";
import "./Home.css";

const Home = () => {
  const { content } = useContext(LangContext);

  if (!content || !content.hero) return null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    scrollToSection(SECTIONS.ABOUT);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setAvailableDistricts(stateDistrictData[state] || []);
  };

  const handleGetInvolvedClick = (e) => {
    e.preventDefault();
    scrollToSection(SECTIONS.CONTACT);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const { contactAPI } = await import("../../services/api");
      await contactAPI.submit(formObject);
      e.target.reset();
      alert(content.alerts.success);
    } catch (err) {
      console.error(err);
      alert(content.alerts.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <section
        id="hero"
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">{content.hero.title}</h1>
          <p className="hero-subtitle">{content.hero.subtitle}</p>

          <div className="hero-cta">
            <a
              href={`#${SECTIONS.CONTACT}`}
              onClick={handleGetInvolvedClick}
              className="cta-button primary"
            >
              {content.hero.getInvolved}
            </a>
            <a
              href={`#${SECTIONS.ABOUT}`}
              onClick={handleLearnMoreClick}
              className="cta-button secondary"
            >
              {content.hero.learnMore}
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id={SECTIONS.ABOUT} className="about-section-home">
        <div className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-hero-title">{content.about.heading}</h1>
          </div>
        </div>

        <div className="about-container">
          <section className="about-section">
            <h2 className="section-title">{content.about.whoWeAre}</h2>
            <div className="about-content">
              <p className="about-text">{content.about.para1}</p>
              <p className="about-text">{content.about.para2}</p>
            </div>
          </section>

          <section className="vision-mission-section">
            <div className="vision-mission-grid">
              <div className="vision-mission-card">
                <h2 className="vm-title">{content.about.visionTitle}</h2>
                <p className="vm-text">{content.about.visionText}</p>
              </div>
              <div className="vision-mission-card">
                <h2 className="vm-title">{content.about.missionTitle}</h2>
                <p className="vm-text">{content.about.missionText}</p>
              </div>
            </div>
          </section>

          {/* COMMUNITIES */}
          <section className="communities-section">
            <h2 className="section-title">{content.communities.title}</h2>
            <p className="communities-subtitle">
              {content.communities.subtitle}
            </p>

            <div className="communities-grid">
              {[
                { icon: <FaUsers />, text: content.communities.obc },
                { icon: <FaHandsHelping />, text: content.communities.nomadic },
                { icon: <FaUserFriends />, text: content.communities.alutedar },
                { icon: <FaUsersCog />, text: content.communities.micro },
              ].map((item, i) => (
                <div className="community-card" key={i}>
                  <div className="community-icon-wrapper">
                    <span className="community-icon">{item.icon}</span>
                  </div>
                  <h3 className="community-title">{item.text}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section
        id={SECTIONS.OBJECTIVES}
        className="objectives-section-standalone"
      >
        <div className="objectives-container">
          <h2 className="section-title">{content.objectives.title}</h2>
          <p className="objectives-subtitle">{content.objectives.subtitle}</p>

          <div className="objectives-grid">
            {[
              [
                <FaShieldAlt />,
                content.objectives.reservationTitle,
                content.objectives.reservationDesc,
              ],
              [
                <FaCertificate />,
                content.objectives.fakeCertTitle,
                content.objectives.fakeCertDesc,
              ],
              [
                <FaGraduationCap />,
                content.objectives.educationTitle,
                content.objectives.educationDesc,
              ],
              [
                <FaChartLine />,
                content.objectives.economicTitle,
                content.objectives.economicDesc,
              ],
              [
                <FaGavel />,
                content.objectives.legalTitle,
                content.objectives.legalDesc,
              ],
              [
                <FaHeartbeat />,
                content.objectives.healthTitle,
                content.objectives.healthDesc,
              ],
              [
                <FaFemale />,
                content.objectives.womenTitle,
                content.objectives.womenDesc,
              ],
              [
                <FaVoteYea />,
                content.objectives.politicalTitle,
                content.objectives.politicalDesc,
              ],
              [
                <FaMonument />,
                content.objectives.culturalTitle,
                content.objectives.culturalDesc,
              ],
            ].map(([icon, title, desc], i) => (
              <div className="objective-card" key={i}>
                <div className="objective-icon-wrapper">
                  <span className="objective-icon">{icon}</span>
                </div>
                <h3 className="objective-title">{title}</h3>
                <p className="objective-description">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUERIES */}
      <section id={SECTIONS.QUERIES} className="queries-section">
        <div className="queries-container">
          <h2 className="section-title">{content.queries.title}</h2>

          <p className="queries-subtitle">{content.queries.subtitle}</p>

          <form className="queries-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{content.queries.fullName}</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder={content.queries.fullNamePh}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">{content.queries.mobile}</label>
                <input
                  type="tel"
                  name="mobile"
                  className="form-input"
                  placeholder={content.queries.mobilePh}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{content.queries.query}</label>
              <textarea
                name="query"
                className="form-textarea"
                placeholder={content.queries.queryPh}
                required
              />
            </div>

            <div className="form-submit">
              <button type="submit" className="submit-button">
                {content.queries.submit}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section id={SECTIONS.CONTACT} className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">{content.contact.title}</h2>
          <p className="contact-subtitle">{content.contact.subtitle}</p>

          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{content.contact.fullName}</label>
                <input
                  className="form-input"
                  name="fullName"
                  placeholder={content.contact.fullNamePh}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{content.contact.mobile}</label>
                <input
                  className="form-input"
                  name="mobile"
                  placeholder={content.contact.mobilePh}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{content.contact.state}</label>
                <select
                  className="form-input"
                  name="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  required
                >
                  <option value="">{content.contact.statePh}</option>
                  {Object.keys(stateDistrictData).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{content.contact.district}</label>
                <select
                  className="form-input"
                  name="district"
                  required
                  disabled={!selectedState}
                >
                  <option value="">{content.contact.districtPh}</option>
                  {availableDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{content.contact.taluka}</label>
                <input
                  className="form-input"
                  name="taluka"
                  placeholder={content.contact.talukaPh}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{content.contact.village}</label>
                <input
                  className="form-input"
                  name="village"
                  placeholder={content.contact.villagePh}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{content.contact.pincode}</label>
              <input
                className="form-input"
                name="pincode"
                placeholder={content.contact.pincodePh}
                required
              />
            </div>

            <div className="form-submit">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? content.contact.submitting
                  : content.contact.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
