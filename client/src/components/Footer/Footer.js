import React, { useEffect } from 'react';
import './Footer.css';
import logo from "./../../assets/gg-logo.png";
import instagramLogo from "./../../assets/instagram-logo.svg";
import linkedinLogo from "./../../assets/linkedinLogo.svg";

const Footer = () => {
  useEffect(() => {
    // Load Beehiiv script
    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

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
          <div className="beehiiv-container">
            <iframe 
              src="https://subscribe-forms.beehiiv.com/dc90404b-cfb4-4bb0-a3a8-fc5668e33afa" 
              className="beehiiv-embed" 
              data-test-id="beehiiv-embed" 
              frameBorder="0" 
              scrolling="no" 
              style={{
                width: '731px', 
                height: '415px', 
                margin: 0, 
                borderRadius: '0px 0px 0px 0px', 
                backgroundColor: 'transparent', 
                boxShadow: '0 0 #0000', 
                maxWidth: '100%'
              }}
              title="Newsletter Subscription"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;