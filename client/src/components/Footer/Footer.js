import React, { useState } from 'react';
import './Footer.css';
import logo from "./../../assets/gg-logo.png";
import instagramLogo from "./../../assets/instagram-logo.svg";
import linkedinLogo from "./../../assets/linkedinLogo.svg";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreeToMessages: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', formData);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="Go Girl Community" className="footer-logo" />
          <div className="footer-social">
            <a
              href="https://www.instagram.com/thegogirlcommunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <img src={instagramLogo} alt="Instagram" className="social-icon" />
            </a>
            <a
              href="https://www.linkedin.com/showcase/gogirlcommunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <img src={linkedinLogo} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-right">
          {/* <h3 className="newsletter-heading"></h3> */}
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="form-text">
              <span>My name is </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder=""
              />
              <span>, email is </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder=""
              />
              <span>& my phone is </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder=""
              />
              <span>.</span>
            </div>

            

            <button type="submit" className="subscribe-button">
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 