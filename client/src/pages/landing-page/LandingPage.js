import React, { useRef, useState, useEffect } from "react";
import "./../../App.css";

import { UserInfo, TextCard, Footer } from "./../../components";

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
//import aigotmethelogo from "./../../assets/aigotmethejob.png";
//import aiagentlogo from "./../../assets/aiagent.png";
//import picklelogo from "./../../assets/pickleball.png"
//import techgirlieslogo from "./../../assets/techgirlies.png";
//import vibecodinglogo from "./../../assets/vibecoding2.png";
//import vibecodinglogo2 from "./../../assets/vibecoding1.avif";




const LandingPage = () => {
  const eventsRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Note: scrollToEvents function is available if needed for navigation
  // const scrollToEvents = () => {
  //   eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

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

  
  // const upcomingEvents = [
//     { id: 1, title: "Event 1", link: "https://lu.ma/7xkd8kvx", image: aigotmethelogo },
//     { id: 2, title: "Event 2", link: "https://lu.ma/3m5saxz8", image: picklelogo},
//     { id: 3, title: "Event 3", link: "https://lu.ma/s6a4vfri", image: aiagentlogo },
//     { id: 4, title: "Event 4", link: "https://lu.ma/dic39j6w", image: vibecodinglogo },
//   ];
  
//   const pastEvents = [
//     { id: 1, title: "Past Event 1", link: "https://lu.ma/wu2aes7m", image: techgirlieslogo },
//     { id: 2, title: "Past Event 2", link: "https://lu.ma/ao939t3q", image: vibecodinglogo2 },
//   ];

  return (
    <>
      <div className="landing-page">
        <div className="page-content">
          <header>
            <div className="logo-container">
              <img src={logo} alt="Go Girl Community" className="gg-logo" />
            </div>
            <div className="social-links">
              <a
                href="https://shop.beacons.ai/japnitahuja/636a657c-de77-42dc-8844-3037dffa6043"
                className="link-newsletter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="alt-sub-button">
                  Not in India? click here
                </button>
              </a>
              <a
                href="https://gogirlcommunity.beehiiv.com/"
                className="link-newsletter newsletter-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="events-button">
                  Subscribe to newsletter
                </button>
              </a>
              <a
                href="https://www.instagram.com/thegogirlcommunity/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
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
                className="social-icon"
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
                Claim your one month
                <br />
                ✨free trial✨ now!
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
                  <div className="mobile-only-links">
                    <a
                      href="https://gogirlcommunity.beehiiv.com/"
                      className="newsletter-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Subscribe to newsletter
                    </a>
                    <div className="social-icons-wrapper">
                      <a
                        href="https://www.instagram.com/thegogirlcommunity/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
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
                        className="social-icon"
                      >
                        <img
                          src={linkedinLogo}
                          alt="Linkedin"
                          className="linkedin-icon"
                        />
                      </a>
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
      <div className="benefits-section">
        <p className="benefits-text">here's what you get</p>
        <div className="benefits-list">
          <TextCard
            icon="🌐"
            text="Access to coding sessions & career resources"
          />
          <TextCard icon="💬" text="Community support + mentorship" />
          <TextCard
            icon="🎉"
            text="Priority invites to offline events & webinars"
          />
          <TextCard icon="💼" text="Resume & portfolio reviews" />
        </div>
      </div>

      <div ref={eventsRef} className="events-container-wrapper">
  <div className="upcoming-events-section">
    <h2 className="companies-text">Upcoming Events</h2>
    <div className="iframe-container">
      <iframe
        src="https://lu.ma/embed/calendar/cal-Mi1Um6BhuHPquIv/events?lt=light"
        width="600"
        height="450"
        style={{ border: "1px solid #bfcbda88", borderRadius: "4px", marginLeft: "auto" }}
        allowFullScreen
        title="Upcoming Events Calendar"
      />
    </div>
  </div>
</div>

 {/*<div ref={eventsRef} className="events-container-wrapper">
  <div className="upcoming-events-section">
    <h2 className="events-heading">Upcoming Events</h2>
    <div className="events-grid events-grid--singleline">
      {upcomingEvents.map(ev => (
        <div key={ev.id} className="event-card">
          <div className="event-image">
            <img src={ev.image} alt={ev.title} />
          </div>
          <div className="event-content">
            <h3 className="event-title">{ev.title}</h3>
            <a 
              href={ev.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="event-button"
            >
              Register → 
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="past-events-section">
    <h2 className="past-events-heading">Past Events</h2>
    <div className="events-grid events-grid--singleline">
      {pastEvents.map(ev => (
        <div key={ev.id} className="event-card">
          <div className="event-image">
            <img src={ev.image} alt={ev.title} />
          </div>
          <div className="event-content">
            <h3 className="event-title">{ev.title}</h3>
            <a 
              href={ev.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="event-button"
            >
              View Event →
            </a>
          </div>
        </div>
      ))} 
    </div>
  </div>
</div>*/}


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