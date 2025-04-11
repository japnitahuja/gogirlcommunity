import React from "react";
import "./../../App.css";

import { UserInfo } from './../../components';

import logo from "./../../assets/gg-logo.png";
import instagramLogo from "./../../assets/instagram-logo.svg";
import expediaLogo from "./../../assets/expedia.png";
import googleLogo from "./../../assets/google.png";
import amazonLogo from "./../../assets/amazon.png";
import bnyLogo from "./../../assets/bny.png";
import microsoftLogo from "./../../assets/microsoft.png";
import communityImage from "./../../assets/community-members.jpeg";
import linkedinLogo from "./../../assets/linkedinLogo.svg";
const LandingPage = () => {
  return (
    <>
    <div className="landing-page">
      <div className="page-content">
        <header>
          <div className="logo-container">
            <img src={logo} alt="Go Girl Community" className="gg-logo" />
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/thegogirlcommunity/" target="_blank" rel="noopener noreferrer">
              <img src={instagramLogo} alt="Instagram" className="instagram-icon" />
            </a>
            <a href="https://www.linkedin.com/showcase/gogirlcommunity/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinLogo} alt="Linkedin" className="linkedin-icon" />
            </a>
          </div>
        </header>

        <main>
          <div className="left-section">
            <h1 className="main-heading">Join the<br />Community</h1>
            <p className="promo-text">Claim your One Month<br />Free Trial now!</p>
            <div className="community-image-container">
              <img src={communityImage} alt="Community members" className="community-image" />
            </div>
          </div>

          <div className="right-section">
            <div className="signup-form-wrapper">
              <h2 className="form-heading">Sign up <span className="here-text">here</span>.</h2>
              {/* Using the actual UserInfo component but applying our custom class */}
              <div className="landing-user-info">
                <UserInfo />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <footer style={{marginTop:0}}>
      <p className="companies-text">join members from companies like</p>
      <div className="company-logos">
        <img src={expediaLogo} alt="Expedia Group" className="company-logo" />
        <img src={googleLogo} alt="Google" className="company-logo" />
        <img src={amazonLogo} alt="Amazon" className="company-logo" />
        <img src={bnyLogo} alt="BNY" className="company-logo" />
        <img src={microsoftLogo} alt="Microsoft" className="company-logo" />
      </div>
    </footer>
    </>
  );
}

export default LandingPage;