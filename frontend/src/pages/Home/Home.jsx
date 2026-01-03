import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero-community.jpg';
import './Home.css';

const Home = () => {
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
            <Link to="/contact" className="cta-button primary">
              Get Involved
            </Link>
            <Link to="/about" className="cta-button secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

