import React, { useRef, useState, useEffect } from "react";
import "./../../App.css";

import { UserInfo, Events, Footer } from "./../../components";

import logo from "./../../assets/gg-logo.png";
import instagramLogo from "./../../assets/instagram-logo.svg";
import expediaLogo from "./../../assets/expedia.png";
import googleLogo from "./../../assets/google.png";
import amazonLogo from "./../../assets/amazon.png";
import bnyLogo from "./../../assets/bny.png";
import microsoftLogo from "./../../assets/microsoft.png";
import communityImage from "./../../assets/community-members.jpeg";
import communityImageMobile from "./../../assets/community-members-mobile.jpeg";
import linkedinLogo from "./../../assets/linkedinLogo.svg";

const LandingPage = () => {
  const eventsRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled more than 400px
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pastEvents = [
    {
      id: 1,
      title: "International Women's Day Celebration",
      date: "March 8, 2024",
      time: "5:00 PM PST",
      location: "San Francisco",
      description: "We celebrated International Women's Day with inspiring talks from women leaders in tech and a networking session.",
      category: "Special Event",
      image: "https://placehold.co/600x400/E6D4FE/ffffff/png"
    },
    {
      id: 2,
      title: "Career Development Workshop",
      date: "March 1, 2024",
      time: "2:00 PM PST",
      location: "Virtual Event",
      description: "An interactive session on career growth, personal branding, and leadership development in the tech industry.",
      category: "Workshop",
      image: "https://placehold.co/600x400/FEF6B7/ffffff/png"
    },
    {
      id: 3,
      title: "Tech Mentorship Kickoff",
      date: "February 15, 2024",
      time: "4:00 PM PST",
      location: "Seattle",
      description: "Launched our mentorship program connecting experienced tech professionals with aspiring women in tech.",
      category: "Mentorship",
      image: "https://placehold.co/600x400/E6D4FE/ffffff/png"
    }
  ];

  return (
    <>
      <div className="landing-page">
        <div className="page-content">
          <header>
            <div className="logo-container">
              <img src={logo} alt="Go Girl Community" className="gg-logo" />
            </div>
            <div className="social-links">
              <button onClick={scrollToEvents} className="events-button">Events</button>
              <a
                href="https://www.instagram.com/thegogirlcommunity/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagramLogo}
                  alt="Instagram"
                  className="instagram-icon"
                />
              </a>
              <a
                href="https://www.linkedin.com/showcase/gogirlcommunity/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={linkedinLogo}
                  alt="Linkedin"
                  className="linkedin-icon"
                />
              </a>
            </div>
          </header>

          <main>
            <div className="left-section">
              <h1 className="main-heading">
                Join the
                <br />
                Community
              </h1>
              <p className="promo-text">
                Claim your One Month
                <br />
                Free Trial now!
              </p>
              <div className="community-image-container">
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet={communityImageMobile}
                  />
                  <img
                    src={communityImage}
                    alt="Community members"
                    className="community-image"
                  />
                </picture>
              </div>
            </div>

            <div className="right-section">
              <div className="signup-form-wrapper">
                <h2 className="form-heading">
                  Sign up <span className="here-text">here</span>.
                </h2>
                <div className="landing-user-info">
                  <UserInfo />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="companies-section">
        <p className="companies-text">join members from companies like</p>
        <div className="company-logos">
          <img src={expediaLogo} alt="Expedia Group" className="company-logo" />
          <img src={googleLogo} alt="Google" className="company-logo" />
          <img src={amazonLogo} alt="Amazon" className="company-logo" />
          <img src={bnyLogo} alt="BNY" className="company-logo" />
          <img src={microsoftLogo} alt="Microsoft" className="company-logo" />
        </div>
      </div>

      <div ref={eventsRef} className="events-container-wrapper">
        <div className="upcoming-events-section">
          <h2 className="events-heading">Upcoming Events</h2>
          <p className="events-subheading">Join our community events and connect with amazing women in tech!</p>
          <Events />
        </div>
        
        <div className="past-events-section">
          <div className="past-events-container">
            <h2 className="past-events-heading">Past Events</h2>
            <p className="past-events-subheading">Take a look at our previous successful events!</p>
            
            <div className="events-grid">
              {pastEvents.map(event => (
                <div key={event.id} className="event-card past-event">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <span className="event-category">{event.category}</span>
                  </div>
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-details">
                      <p className="event-date-time">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                      </p>
                      <p className="event-location">{event.location}</p>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <button className="event-gallery-button">View Gallery</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button 
        className={`back-to-top-button ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>

      <Footer />
    </>
  );
};

export default LandingPage;
