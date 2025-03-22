import React, { useState, useEffect } from 'react';
import './../styles/guide-dashboard.css';

const GuideDashboard = () => {
  // State to track if the profile exists
  const [profileExists, setProfileExists] = useState(false);

  // State for guide profile
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    expertise: [],
    locations: [],
    pricing: {
      hourly: 0,
      daily: 0,
      weekly: 0
    },
    contact: {
      email: '',
      phone: '',
      facebook: '',
      instagram: ''
    },
    rating: 0,
    profileImage: ''
  });

  // State for availability calendar
  const [availability, setAvailability] = useState([]);

  // State for reviews
  const [reviews, setReviews] = useState([]);

  // State for inquiries
  const [inquiries, setInquiries] = useState([]);

  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');

  // State for notification count
  const [notificationCount, setNotificationCount] = useState(0);

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  // Calculate unread notifications
  useEffect(() => {
    const unreadReviews = reviews.filter(review => !review.read).length;
    const unreadInquiries = inquiries.filter(inquiry => !inquiry.read).length;
    setNotificationCount(unreadReviews + unreadInquiries);
  }, [reviews, inquiries]);

  // Handle profile creation
  const handleProfileCreation = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    setProfileExists(true);
    alert('Profile created successfully!');
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  // Handle profile field change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  // Handle expertise change (array field)
  const handleExpertiseChange = (e, index) => {
    const newExpertise = [...editedProfile.expertise];
    newExpertise[index] = e.target.value;
    setEditedProfile({
      ...editedProfile,
      expertise: newExpertise
    });
  };

  // Add new expertise
  const addExpertise = () => {
    setEditedProfile({
      ...editedProfile,
      expertise: [...editedProfile.expertise, '']
    });
  };

  // Remove expertise
  const removeExpertise = (index) => {
    const newExpertise = [...editedProfile.expertise];
    newExpertise.splice(index, 1);
    setEditedProfile({
      ...editedProfile,
      expertise: newExpertise
    });
  };

  // Handle locations change (array field)
  const handleLocationChange = (e, index) => {
    const newLocations = [...editedProfile.locations];
    newLocations[index] = e.target.value;
    setEditedProfile({
      ...editedProfile,
      locations: newLocations
    });
  };

  // Add new location
  const addLocation = () => {
    setEditedProfile({
      ...editedProfile,
      locations: [...editedProfile.locations, '']
    });
  };

  // Remove location
  const removeLocation = (index) => {
    const newLocations = [...editedProfile.locations];
    newLocations.splice(index, 1);
    setEditedProfile({
      ...editedProfile,
      locations: newLocations
    });
  };

  // Handle pricing change
  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      pricing: {
        ...editedProfile.pricing,
        [name]: parseInt(value)
      }
    });
  };

  // Handle contact change
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      contact: {
        ...editedProfile.contact,
        [name]: value
      }
    });
  };

  // Toggle availability for a date
  const toggleAvailability = (index) => {
    const newAvailability = [...availability];
    newAvailability[index].available = !newAvailability[index].available;
    setAvailability(newAvailability);
  };

  // Mark a review as read
  const markReviewAsRead = (id) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, read: true } : review
    ));
  };

  // Mark an inquiry as read
  const markInquiryAsRead = (id) => {
    setInquiries(inquiries.map(inquiry =>
      inquiry.id === id ? { ...inquiry, read: true } : inquiry
    ));
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  // Handle logout
  const handleLogout = () => {
    // Perform logout actions here, such as clearing session or local storage
    alert('You have been logged out.');
    // Redirect to login page or home page
    window.location.href = '/login'; // Adjust the URL as needed
  };

  return (
    <div className="guide-dashboard">
      <header className="dashboard-header">
        <h1>Guide Dashboard</h1>
        <div className="header-actions">
          <div className="notification-bell">
            <span className="bell-icon">🔔</span>
            {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <ul>
          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </li>
          <li
            className={activeTab === 'availability' ? 'active' : ''}
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </li>
          <li
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
            {reviews.filter(r => !r.read).length > 0 &&
              <span className="badge">{reviews.filter(r => !r.read).length}</span>
            }
          </li>
          <li
            className={activeTab === 'inquiries' ? 'active' : ''}
            onClick={() => setActiveTab('inquiries')}
          >
            Inquiries
            {inquiries.filter(i => !i.read).length > 0 &&
              <span className="badge">{inquiries.filter(i => !i.read).length}</span>
            }
          </li>
        </ul>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'profile' && (
          <section className="profile-section">
            {!profileExists ? (
              <div className="add-guide-section">
                <h2>Add Your Guide Profile</h2>
                <form className="profile-edit-form" onSubmit={handleProfileCreation}>
                  <div className="form-group">
                    <label htmlFor="profileImage">Profile Image URL</label>
                    <input
                      type="text"
                      id="profileImage"
                      name="profileImage"
                      value={editedProfile.profileImage}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={editedProfile.bio}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Expertise</label>
                    {editedProfile.expertise.map((expertise, index) => (
                      <div key={index} className="array-input">
                        <input
                          type="text"
                          value={expertise}
                          onChange={(e) => handleExpertiseChange(e, index)}
                        />
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => removeExpertise(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-button"
                      onClick={addExpertise}
                    >
                      + Add Expertise
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Available Locations</label>
                    {editedProfile.locations.map((location, index) => (
                      <div key={index} className="array-input">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => handleLocationChange(e, index)}
                        />
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => removeLocation(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-button"
                      onClick={addLocation}
                    >
                      + Add Location
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Pricing</label>
                    <div className="pricing-inputs">
                      <div>
                        <label htmlFor="hourly">Hourly ($)</label>
                        <input
                          type="number"
                          id="hourly"
                          name="hourly"
                          value={editedProfile.pricing.hourly}
                          onChange={handlePricingChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="daily">Daily ($)</label>
                        <input
                          type="number"
                          id="daily"
                          name="daily"
                          value={editedProfile.pricing.daily}
                          onChange={handlePricingChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="weekly">Weekly ($)</label>
                        <input
                          type="number"
                          id="weekly"
                          name="weekly"
                          value={editedProfile.pricing.weekly}
                          onChange={handlePricingChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Contact Information</label>
                    <div className="contact-inputs">
                      <div>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editedProfile.contact.email}
                          onChange={handleContactChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={editedProfile.contact.phone}
                          onChange={handleContactChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="facebook">Facebook</label>
                        <input
                          type="text"
                          id="facebook"
                          name="facebook"
                          value={editedProfile.contact.facebook}
                          onChange={handleContactChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="instagram">Instagram</label>
                        <input
                          type="text"
                          id="instagram"
                          name="instagram"
                          value={editedProfile.contact.instagram}
                          onChange={handleContactChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="save-button">Create Profile</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="profile-info">
                <div className="section-header">
                  <h2>My Profile</h2>
                  {!editMode && (
                    <button className="edit-button" onClick={() => setEditMode(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>

                {!editMode ? (
                  <div className="profile-info">
                    <div className="profile-image-container">
                      <img src={profile.profileImage} alt={profile.name} className="profile-image" />
                      <div className="profile-rating">
                        {renderStars(profile.rating)}
                        <span className="rating-text">{profile.rating} / 5</span>
                      </div>
                    </div>
                    <div className="profile-details">
                      <h3>{profile.name}</h3>
                      <p className="bio">{profile.bio}</p>

                      <div className="detail-section">
                        <h4>Expertise</h4>
                        <ul className="tags">
                          {profile.expertise.map((item, index) => (
                            <li key={index} className="tag">{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4>Available Locations</h4>
                        <ul className="tags">
                          {profile.locations.map((location, index) => (
                            <li key={index} className="tag">{location}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4>Pricing</h4>
                        <ul className="pricing-list">
                          <li><span>Hourly:</span> ${profile.pricing.hourly}</li>
                          <li><span>Daily:</span> ${profile.pricing.daily}</li>
                          <li><span>Weekly:</span> ${profile.pricing.weekly}</li>
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4>Contact Information</h4>
                        <ul className="contact-list">
                          <li><span>Email:</span> {profile.contact.email}</li>
                          <li><span>Phone:</span> {profile.contact.phone}</li>
                          <li><span>Facebook:</span> {profile.contact.facebook}</li>
                          <li><span>Instagram:</span> {profile.contact.instagram}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
                    <div className="form-group">
                      <label htmlFor="profileImage">Profile Image URL</label>
                      <input
                        type="text"
                        id="profileImage"
                        name="profileImage"
                        value={editedProfile.profileImage}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedProfile.name}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={editedProfile.bio}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Expertise</label>
                      {editedProfile.expertise.map((expertise, index) => (
                        <div key={index} className="array-input">
                          <input
                            type="text"
                            value={expertise}
                            onChange={(e) => handleExpertiseChange(e, index)}
                          />
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => removeExpertise(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-button"
                        onClick={addExpertise}
                      >
                        + Add Expertise
                      </button>
                    </div>

                    <div className="form-group">
                      <label>Available Locations</label>
                      {editedProfile.locations.map((location, index) => (
                        <div key={index} className="array-input">
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => handleLocationChange(e, index)}
                          />
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => removeLocation(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-button"
                        onClick={addLocation}
                      >
                        + Add Location
                      </button>
                    </div>

                    <div className="form-group">
                      <label>Pricing</label>
                      <div className="pricing-inputs">
                        <div>
                          <label htmlFor="hourly">Hourly ($)</label>
                          <input
                            type="number"
                            id="hourly"
                            name="hourly"
                            value={editedProfile.pricing.hourly}
                            onChange={handlePricingChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="daily">Daily ($)</label>
                          <input
                            type="number"
                            id="daily"
                            name="daily"
                            value={editedProfile.pricing.daily}
                            onChange={handlePricingChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="weekly">Weekly ($)</label>
                          <input
                            type="number"
                            id="weekly"
                            name="weekly"
                            value={editedProfile.pricing.weekly}
                            onChange={handlePricingChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Contact Information</label>
                      <div className="contact-inputs">
                        <div>
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={editedProfile.contact.email}
                            onChange={handleContactChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone">Phone</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={editedProfile.contact.phone}
                            onChange={handleContactChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="facebook">Facebook</label>
                          <input
                            type="text"
                            id="facebook"
                            name="facebook"
                            value={editedProfile.contact.facebook}
                            onChange={handleContactChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="instagram">Instagram</label>
                          <input
                            type="text"
                            id="instagram"
                            name="instagram"
                            value={editedProfile.contact.instagram}
                            onChange={handleContactChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="save-button">Save Profile</button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => {
                          setEditMode(false);
                          setEditedProfile({ ...profile });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </section>
        )}

        {activeTab === 'availability' && (
          <section className="availability-section">
            <div className="section-header">
              <h2>Manage Availability</h2>
            </div>
            <div className="availability-calendar">
              {availability.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${day.available ? 'available' : 'unavailable'}`}
                  onClick={() => toggleAvailability(index)}
                >
                  <span className="date">{day.date}</span>
                  <span className="status">{day.available ? 'Available' : 'Unavailable'}</span>
                </div>
              ))}
            </div>
            <div className="availability-legend">
              <div className="legend-item">
                <span className="legend-color available"></span>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <span className="legend-color unavailable"></span>
                <span>Unavailable</span>
              </div>
            </div>
            <button className="update-button">Update Availability</button>
          </section>
        )}

        {activeTab === 'reviews' && (
          <section className="reviews-section">
            <div className="section-header">
              <h2>Reviews & Ratings</h2>
            </div>
            <div className="overall-rating">
              <div className="rating-display">
                <span className="rating-number">{profile.rating}</span>
                <div className="stars">{renderStars(profile.rating)}</div>
              </div>
              <span className="total-reviews">Based on {reviews.length} reviews</span>
            </div>
            <div className="reviews-list">
              {reviews.map(review => (
                <div
                  key={review.id}
                  className={`review-card ${!review.read ? 'unread' : ''}`}
                  onClick={() => markReviewAsRead(review.id)}
                >
                  <div className="review-header">
                    <span className="traveler-name">{review.traveler}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  {!review.read && <span className="unread-badge">New</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'inquiries' && (
          <section className="inquiries-section">
            <div className="section-header">
              <h2>Traveler Inquiries</h2>
            </div>
            <div className="inquiries-list">
              {inquiries.map(inquiry => (
                <div
                  key={inquiry.id}
                  className={`inquiry-card ${!inquiry.read ? 'unread' : ''}`}
                  onClick={() => markInquiryAsRead(inquiry.id)}
                >
                  <div className="inquiry-header">
                    <span className="traveler-name">{inquiry.traveler}</span>
                    <span className="inquiry-date">{inquiry.date}</span>
                  </div>
                  <p className="inquiry-message">{inquiry.message}</p>
                  {!inquiry.read && <span className="unread-badge">New</span>}
                  <div className="inquiry-actions">
                    <button className="reply-button">Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 Travel Guide Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GuideDashboard;