import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mountain, Compass, Calendar, Heart, Leaf, Globe } from 'lucide-react';
import '../styles/about.css'; 

export default function AboutUs() {
  const navigate = useNavigate();

  const handlePlanJourney = () => {
    navigate('/itinerary-form');
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover the Magic of Nepal</h1>
          <p className="hero-subtitle">Your journey into the heart of the Himalayas begins with us</p>
        </div>
      </div>

      <div className="container">
        {/* Mission Statement */}
        <div className="section animate-fade-in">
          <h2 className="section-title">Our Mission</h2>
          <div className="section-divider"></div>
          <p className="section-text">
            We're passionate about sharing the beauty, culture, and adventure of Nepal with travelers from around the world. 
            Our mission is to create authentic, sustainable travel experiences that connect visitors with the true essence of Nepal 
            while supporting local communities and preserving this extraordinary destination for generations to come.
          </p>
        </div>

        {/* Why Nepal */}
        <div className="section animate-fade-in">
          <h2 className="section-title">Why Nepal?</h2>
          <div className="section-divider"></div>
          <div className="features-grid">
            <div className="feature-card">
              <Mountain className="feature-icon" />
              <h3 className="feature-title">Breathtaking Landscapes</h3>
              <p className="feature-description">
                From the towering peaks of the Himalayas to lush jungle lowlands, Nepal offers some of the most diverse and stunning scenery on Earth.
              </p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3 className="feature-title">Rich Cultural Heritage</h3>
              <p className="feature-description">
                Experience ancient traditions, vibrant festivals, and the legendary warmth and hospitality of Nepali people.
              </p>
            </div>
            <div className="feature-card">
              <Compass className="feature-icon" />
              <h3 className="feature-title">Endless Adventure</h3>
              <p className="feature-description">
                Whether you seek trekking challenges, wildlife encounters, or spiritual journeys, Nepal offers adventures for every traveler.
              </p>
            </div>
          </div>
        </div>

        {/* Our Services */}
        <div className="section animate-fade-in">
          <h2 className="section-title">What We Offer</h2>
          <div className="section-divider"></div>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon-wrapper">
                <Mountain className="service-icon" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Trekking Adventures</h3>
                <p className="service-description">
                  Expertly guided treks through iconic routes like Everest Base Camp and Annapurna Circuit, as well as hidden gems off the beaten path.
                </p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon-wrapper">
                <Users className="service-icon" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Cultural Experiences</h3>
                <p className="service-description">
                  Immersive cultural tours, homestays with local families, cooking classes, and opportunities to participate in traditional ceremonies.
                </p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon-wrapper">
                <Calendar className="service-icon" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Personalized Itineraries</h3>
                <p className="service-description">
                  Custom-crafted travel plans tailored to your interests, timeframe, and preferences, ensuring you experience the Nepal you've dreamed of.
                </p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon-wrapper">
                <Heart className="service-icon" />
              </div>
              <div className="service-content">
                <h3 className="service-title">Local Expertise</h3>
                <p className="service-description">
                  All our guides and partners are locals with deep knowledge of Nepal's geography, culture, and hidden treasures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="section animate-fade-in">
          <h2 className="section-title">Our Values</h2>
          <div className="section-divider"></div>
          <div className="values-grid">
            <div>
              <div className="value-icon-wrapper">
                <Leaf className="value-icon" />
              </div>
              <h3 className="value-title">Sustainability</h3>
              <p className="value-description">
                We prioritize eco-friendly practices and support conservation efforts throughout Nepal.
              </p>
            </div>
            <div>
              <div className="value-icon-wrapper">
                <Users className="value-icon" />
              </div>
              <h3 className="value-title">Community Impact</h3>
              <p className="value-description">
                Your travels with us directly benefit local communities through fair employment and community projects.
              </p>
            </div>
            <div>
              <div className="value-icon-wrapper">
                <Globe className="value-icon" />
              </div>
              <h3 className="value-title">Authenticity</h3>
              <p className="value-description">
                We showcase the real Nepal, going beyond tourist highlights to share genuine experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section animate-fade-in">
          <h2 className="cta-title">Ready to Experience Nepal?</h2>
          <p className="cta-text">
            Let us help you create the perfect Nepali adventure tailored to your dreams. From snowcapped peaks to sacred temples, magical experiences await.
          </p>
          <button className="cta-button" onClick={handlePlanJourney}>
            Start Planning Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}