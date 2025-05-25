import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Star, Calendar } from 'lucide-react';
import './../styles/guides.css';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const Guides = () => {
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState([]);
  const navigate = useNavigate();

  // Review state and functions
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewGuideId, setReviewGuideId] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch guides from backend
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(`${BASE_URL}/guides`);
        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }
        const data = await response.json();
        setFilteredGuides(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Fetch availability when a guide is selected
  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedGuide) {
        try {
          const response = await fetch(`${BASE_URL}/guides/${selectedGuide._id}/availability`);
          if (!response.ok) {
            throw new Error('Failed to fetch availability');
          }
          const result = await response.json();
          if (result.success) {
            setAvailability(result.data);
          }
        } catch (err) {
          console.error('Failed to fetch availability:', err);
        }
      }
    };

    fetchAvailability();
  }, [selectedGuide]);

  // Render star rating
 const renderStars = (rating) => {
  return (
    <div className="star-rating flex items-center">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        return (
          <div key={i} className="relative">
            <Star 
              className={`w-4 h-4 ${starValue <= Math.floor(rating) ? 'fill-orange-400 text-orange-400 font-bold' : 'text-gray-300 font-bold'}`}
            />
            {rating % 1 > 0 && Math.floor(rating) === i && (
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                <Star className="w-4 h-4 fill-orange-400 text-orange-400 font-bold" />
              </div>
            )}
          </div>
        );
      })}
      <span className="ml-1 text-sm text-gray-600 font-bold">{rating.toFixed(1)}</span>
    </div>
  );
};

  // Review functions
  const handleOpenReviewModal = (guideId) => {
    setReviewGuideId(guideId);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setReviewRating(0);
    setReviewComment('');
    setReviewGuideId(null);
  };

  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      const response = await fetch(`${BASE_URL}/guide-reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          guideId: reviewGuideId,
          rating: reviewRating,
          comment: reviewComment
        })
      });
  
      const result = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error(result.message || 'Failed to submit review');
      }
  
      if (result.success) {
        alert('Review submitted successfully!');
        handleCloseReviewModal();
        if (selectedGuide) {
          const guideResponse = await fetch(`${BASE_URL}/guides/${selectedGuide._id}`);
          if (guideResponse.ok) {
            const guideResult = await guideResponse.json();
            if (guideResult.success) {
              setSelectedGuide(guideResult.data);
            }
          }
        }
      }
    } catch (error) {
      console.error('Review submission failed:', error);
      alert(`Failed to submit review: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-[80px]">
        <header className="bg-white text-black-500 p-4 md:p-6 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold">Professional Travel Guides</h1>
            <p className="mt-2 text-orange-400">
              Connect with expert local guides for your next adventure
            </p>
          </div>
        </header>
        <main className="container mx-auto p-4 md:p-6">
          <div className="text-center py-10">Loading guides...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white text-black-500 p-4 md:p-6 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold">Professional Travel Guides</h1>
            <p className="mt-2 text-orange-400">
              Connect with expert local guides for your next adventure
            </p>
          </div>
        </header>
        <main className="container mx-auto p-4 md:p-6">
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 header-offset">
      <div className="bg-white text-black-500 p-4 md:p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Professional Travel Guides</h1>
          <p className="mt-2 text-orange-400">
            Connect with expert local guides for your next adventure
          </p>
        </div>
      </div>

      <main className="container mx-auto p-4 md:p-6">
        {filteredGuides.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide, index) => (
            <div 
              key={guide._id} 
              className="guide-card-enhanced"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {guide.isFeatured && (
                <div className="guide-card-ribbon">Featured</div>
              )}
              
              <div className="guide-card-header">
                <img 
                  src={guide.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(guide.name)}&background=ff8c00&color=fff&size=200`} 
                  alt={guide.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(guide.name)}&background=ff8c00&color=fff&size=200`;
                  }}
                />
                <div className="guide-card-overlay">
                  <h3 className="guide-card-title">{guide.name}</h3>
                </div>
              </div>
              
              <div className="guide-card-body">
                <div className="guide-card-meta">
                  <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                  <span>{guide.locations.join(', ')}</span>
                </div>
                
                <div className="guide-card-meta">
                  <Globe className="w-5 h-5 mr-2 text-orange-500" />
                  <span>{(guide.languages || ['English']).join(', ')}</span>
                </div>
                
                <div className="guide-card-expertise">
                  <span className="guide-card-expertise-label">Expertise:</span>
                  <div className="guide-card-badges">
                    {guide.expertise.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="guide-card-badge">
                        {specialty}
                      </span>
                    ))}
                    {guide.expertise.length > 3 && (
                      <span className="guide-card-badge">+{guide.expertise.length - 3}</span>
                    )}
                  </div>
                </div>
                
                <div className="guide-card-rating">
                  <div className="guide-card-stars">
                    {renderStars(guide.rating || 0)}
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedGuide(guide)}
                  className="guide-card-button"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">No guides available at the moment.</p>
        </div>
      )}

      {selectedGuide && (
  <div className="guide-modal-overlay active">
    <div className="guide-modal-container">
      <div className="guide-modal-header">
        <img 
          src={selectedGuide.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedGuide.name)}&background=ff8c00&color=fff&size=200`} 
          alt={selectedGuide.name}
          className="guide-modal-image"
        />
        <button 
          className="guide-modal-close"
          onClick={() => setSelectedGuide(null)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="guide-modal-body">
        <h2 className="guide-modal-title">{selectedGuide.name}</h2>
        
        {selectedGuide.bio && (
          <p className="guide-modal-bio">{selectedGuide.bio}</p>
        )}
        
        <div className="guide-modal-rating">
          {renderStars(selectedGuide.rating || 0)}
        </div>
        
        <div className="guide-modal-grid">
          <div>
            <div className="guide-modal-section with-gap">
              <h3 className="guide-modal-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                Expertise
              </h3>
              <ul className="guide-modal-list">
                {selectedGuide.expertise.map((item, index) => (
                  <li key={index} className="guide-modal-list-item">
                    <div className="guide-modal-list-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="guide-modal-section">
              <h3 className="guide-modal-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Locations
              </h3>
              <ul className="guide-modal-list">
                {selectedGuide.locations.map((location, index) => (
                  <li key={index} className="guide-modal-list-item">
                    <div className="guide-modal-list-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <span>{location}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="guide-modal-section">
              <h3 className="guide-modal-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Languages
              </h3>
              <ul className="guide-modal-list">
                {(selectedGuide.languages || ['English']).map((language, index) => (
                  <li key={index} className="guide-modal-list-item">
                    <div className="guide-modal-list-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </div>
                    <span>{language}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="guide-modal-section">
              <h3 className="guide-modal-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Pricing
              </h3>
              <div>
                <div className="guide-modal-pricing-item">
                  <span className="guide-modal-pricing-label">Hourly Rate:</span>
                  <span className="guide-modal-pricing-value">${selectedGuide.pricing?.hourly || 'N/A'}</span>
                </div>
                <div className="guide-modal-pricing-item">
                  <span className="guide-modal-pricing-label">Daily Rate:</span>
                  <span className="guide-modal-pricing-value">${selectedGuide.pricing?.daily || 'N/A'}</span>
                </div>
                <div className="guide-modal-pricing-item">
                  <span className="guide-modal-pricing-label">Weekly Rate:</span>
                  <span className="guide-modal-pricing-value">${selectedGuide.pricing?.weekly || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="guide-modal-section">
              <h3 className="guide-modal-section-title">
                <Calendar className="w-5 h-5 text-black" />
                Availability
              </h3>
              {availability.length > 0 ? (
                <ul className="guide-modal-list">
                  {availability.map((period, index) => (
                    <li key={index} className="guide-modal-list-item">
                      <div className="guide-modal-list-icon">
                        <Calendar className="w-5 h-5 text-black" />
                      </div>
                      <span>
                        {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}: 
                        <span className={`status ${period.status}`}>
                          {period.status.charAt(0).toUpperCase() + period.status.slice(1)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No availability information available.</p>
              )}
            </div>

            <div className="guide-modal-section">
              <h3 className="guide-modal-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact
              </h3>
              <div>
                <div className="guide-modal-contact-item">
                  <span className="guide-modal-contact-label">Email:</span>
                  <a 
                    href={`mailto:${selectedGuide.contact?.email}`} 
                    className="guide-modal-contact-value"
                  >
                    {selectedGuide.contact?.email || 'N/A'}
                  </a>
                </div>
                {selectedGuide.contact?.phone && (
                  <div className="guide-modal-contact-item">
                    <span className="guide-modal-contact-label">Phone:</span>
                    <a 
                      href={`tel:${selectedGuide.contact.phone.replace(/[^0-9+]/g, '')}`} 
                      className="guide-modal-contact-value"
                    >
                      {selectedGuide.contact.phone}
                    </a>
                  </div>
                )}
                {selectedGuide.contact?.instagram && (
                  <div className="guide-modal-contact-item">
                    <span className="guide-modal-contact-label">Instagram:</span>
                    <span className="guide-modal-contact-value">
                      @{selectedGuide.contact.instagram.replace('@', '')}
                    </span>
                  </div>
                )}
                {selectedGuide.contact?.facebook && (
                  <div className="guide-modal-contact-item">
                    <span className="guide-modal-contact-label">Facebook:</span>
                    <a 
                      href={`https://facebook.com/${selectedGuide.contact.facebook}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="guide-modal-contact-value"
                    >
                      {selectedGuide.contact.facebook}
                    </a>
                  </div>
                )}
                {selectedGuide.contact?.linkedin && (
                  <div className="guide-modal-contact-item">
                    <span className="guide-modal-contact-label">LinkedIn:</span>
                    <a 
                      href={`https://linkedin.com/in/${selectedGuide.contact.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="guide-modal-contact-value"
                    >
                      {selectedGuide.contact.linkedin}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="guide-modal-footer">
          <button 
            onClick={() => handleOpenReviewModal(selectedGuide._id)}
            className="guide-modal-button guide-modal-button-primary"
          >
            Leave Review
          </button>
          <button 
            onClick={() => setSelectedGuide(null)}
            className="guide-modal-button guide-modal-button-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {reviewModalOpen && (
        <div className="review-modal-overlay active">
          <div className="review-modal-container">
            <button 
              className="review-modal-close"
              onClick={handleCloseReviewModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h3 className="review-modal-title">Leave a Review</h3>
            
            <div className="review-modal-content">
              <div className="review-modal-rating">
                <label className="review-modal-rating-label">Your Rating</label>
                <div className="review-modal-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`review-modal-star ${star <= reviewRating ? 'filled' : ''}`}
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  {reviewRating === 0 ? 'Select a rating' : 
                  reviewRating === 1 ? 'Poor' :
                  reviewRating === 2 ? 'Fair' :
                  reviewRating === 3 ? 'Good' :
                  reviewRating === 4 ? 'Very Good' : 'Excellent'}
                </div>
              </div>
              
              <div className="review-modal-comment">
                <label htmlFor="review-comment" className="review-modal-comment-label">
                  Share Your Experience
                </label>
                <textarea
                  id="review-comment"
                  className="review-modal-textarea"
                  placeholder="Tell us about your experience with this guide..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>
              
              <div className="review-modal-actions">
                <button
                  className="review-modal-button review-modal-button-cancel"
                  onClick={handleCloseReviewModal}
                >
                  Cancel
                </button>
                <button
                  className="review-modal-button review-modal-button-submit"
                  onClick={handleSubmitReview}
                  disabled={reviewRating === 0 || !reviewComment.trim()}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default Guides;