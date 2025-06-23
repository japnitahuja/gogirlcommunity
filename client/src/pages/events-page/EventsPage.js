import React from 'react';
import { Events } from '../../components';
import { Link } from 'react-router-dom';
import './EventsPage.css';

import logo from "./../../assets/gg-logo.png";
import instagramLogo from "./../../assets/instagram-logo.svg";
import linkedinLogo from "./../../assets/linkedinLogo.svg";

const EventsPage = () => {
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
    <div className="events-page">
      <div className="page-content">
        <header>
          <div className="logo-container">
            <img src={logo} alt="Go Girl Community" className="gg-logo" />
          </div>
          <div className="social-links">
            <Link to="/" className="events-button">← Back</Link>
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
        
        <div className="upcoming-events-section">
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
    </div>
  );
};

export default EventsPage; 