import React from 'react';
import './Events.css';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Tech Talk: Women in Software Engineering",
      date: "April 15, 2024",
      time: "6:00 PM PST",
      location: "Virtual Event",
      description: "Join us for an inspiring discussion with leading women software engineers from top tech companies sharing their journey and insights.",
      category: "Tech",
      image: "https://placehold.co/600x400/E6D4FE/ffffff/png"
    },
    {
      id: 2,
      title: "Entrepreneurship Workshop",
      date: "April 20, 2024",
      time: "10:00 AM PST",
      location: "San Francisco",
      description: "Learn from successful women entrepreneurs about starting and scaling your business in today's competitive market.",
      category: "Business",
      image: "https://placehold.co/600x400/FEF6B7/ffffff/png"
    },
    {
      id: 3,
      title: "Networking Mixer",
      date: "April 25, 2024",
      time: "5:30 PM PST",
      location: "Seattle",
      description: "Connect with fellow Go Girl Community members in a casual setting. Great opportunity to expand your professional network!",
      category: "Networking",
      image: "https://placehold.co/600x400/E6D4FE/ffffff/png"
    }
  ];

  return (
    <div className="events-section">
      <div className="events-container">
        
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
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
                <button className="event-register-button">Register Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events; 