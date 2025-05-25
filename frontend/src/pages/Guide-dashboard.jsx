// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import '../styles/guide-dashboard.css';
// // import { BASE_URL } from '../utils/config';

// // const GuideDashboard = () => {
// //   const navigate = useNavigate();
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [availability, setAvailability] = useState([]);
// //   const [newAvailability, setNewAvailability] = useState({
// //     startDate: '',
// //     endDate: '',
// //     status: 'available'
// //   });

// //   // useEffect(() => {
// //   //   const loadProfileAndReviews = async () => {
// //   //     try {
// //   //       const token = localStorage.getItem('token');
// //   //       const profileResponse = await fetch(`${BASE_URL}/guides/user/profile`, {
// //   //         headers: { 'Authorization': `Bearer ${token}` },
// //   //         credentials: 'include',
// //   //       });

// //   //       if (profileResponse.ok) {
// //   //         const profileResult = await profileResponse.json();
// //   //         if (profileResult.success && profileResult.data) {
// //   //           setProfile(profileResult.data);
// //   //           setEditedProfile(profileResult.data);
// //   //           setProfileComplete(true);
// //   //           setEditMode(false);

// //   //           const reviewsResponse = await fetch(`${BASE_URL}/guide-reviews/guide/${profileResult.data._id}`);
// //   //           if (reviewsResponse.ok) {
// //   //             const reviewsResult = await reviewsResponse.json();
// //   //             if (reviewsResult.success) {
// //   //               setReviews(reviewsResult.data.map(review => ({
// //   //                 id: review._id,
// //   //                 traveler: review.travelerId?.username || 'Anonymous',
// //   //                 rating: review.rating,
// //   //                 date: new Date(review.createdAt).toISOString().split('T')[0],
// //   //                 comment: review.comment,
// //   //                 read: review.read,
// //   //                 travelerPhoto: review.travelerId?.photo || '',
// //   //               })));
// //   //             }
// //   //           }

// //   //           // Fetch availability
// //   //           const availabilityResponse = await fetch(`${BASE_URL}/guides/user/availability`, {
// //   //             headers: { 'Authorization': `Bearer ${token}` },
// //   //             credentials: 'include',
// //   //           });
// //   //           if (availabilityResponse.ok) {
// //   //             const availabilityResult = await availabilityResponse.json();
// //   //             if (availabilityResult.success) {
// //   //               setAvailability(availabilityResult.data);
// //   //             }
// //   //           }
// //   //         }
// //   //       }
// //   //     } catch (error) {
// //   //       console.error('Load failed:', error);
// //   //       alert(`Failed to load data: ${error.message}`);
// //   //       navigate('/login');
// //   //     } finally {
// //   //       setIsLoading(false);
// //   //     }
// //   //   };

// //   //   loadProfileAndReviews();
// //   // }, [navigate]);

// //   useEffect(() => {
// //   const loadProfileAndReviews = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         navigate('/login');
// //         return;
// //       }

// //       const profileResponse = await fetch(`${BASE_URL}/guides/user/profile`, {
// //         headers: { 'Authorization': `Bearer ${token}` },
// //         credentials: 'include',
// //       });

// //       if (profileResponse.ok) {
// //         const profileResult = await profileResponse.json();
// //         if (profileResult.success && profileResult.data) {
// //           setProfile(profileResult.data);
// //           setEditedProfile(profileResult.data);
// //           setProfileComplete(true);
// //           setEditMode(false);

// //           const reviewsResponse = await fetch(`${BASE_URL}/guide-reviews/guide/${profileResult.data._id}`);
// //           if (reviewsResponse.ok) {
// //             const reviewsResult = await reviewsResponse.json();
// //             if (reviewsResult.success) {
// //               setReviews(reviewsResult.data.map(review => ({
// //                 id: review._id,
// //                 traveler: review.travelerId?.username || 'Anonymous',
// //                 rating: review.rating,
// //                 date: new Date(review.createdAt).toISOString().split('T')[0],
// //                 comment: review.comment,
// //                 read: review.read,
// //                 travelerPhoto: review.travelerId?.photo || '',
// //               })));
// //             }
// //           }

// //           const availabilityResponse = await fetch(`${BASE_URL}/guides/user/availability`, {
// //             headers: { 'Authorization': `Bearer ${token}` },
// //             credentials: 'include',
// //           });

// //           if (!availabilityResponse.ok) {
// //             const errorData = await availabilityResponse.json();
// //             console.error('Availability fetch error:', errorData);
// //             throw new Error(errorData.message || 'Failed to fetch availability');
// //           }

// //           const availabilityResult = await availabilityResponse.json();
// //           if (availabilityResult.success) {
// //             setAvailability(availabilityResult.data);
// //           } else {
// //             throw new Error(availabilityResult.message || 'Failed to load availability data');
// //           }
// //         }
// //       } else {
// //         throw new Error('Failed to load profile');
// //       }
// //     } catch (error) {
// //       console.error('Load failed:', error.message);
// //       alert(`Failed to load data: ${error.message}`);
// //       if (error.message.includes('not authorized') || error.message.includes('Token is invalid')) {
// //         localStorage.removeItem('token');
// //         navigate('/login');
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   loadProfileAndReviews();
// // }, [navigate]);

// //   const [profile, setProfile] = useState({
// //     name: '',
// //     bio: '',
// //     expertise: [],
// //     locations: [],
// //     languages: ["English"],
// //     pricing: { hourly: 0, daily: 0, weekly: 0 },
// //     contact: { email: '', phone: '', instagram: '', facebook: '', linkedin: '' },
// //     rating: 0,
// //     profileImage: null,
// //   });

// //   const [profileComplete, setProfileComplete] = useState(false);
// //   const [reviews, setReviews] = useState([]);
// //   const [activeTab, setActiveTab] = useState('profile');
// //   const [notificationCount, setNotificationCount] = useState(0);
// //   const [editMode, setEditMode] = useState(!profileComplete);
// //   const [editedProfile, setEditedProfile] = useState({
// //     ...profile,
// //     pricing: { hourly: 0, daily: 0, weekly: 0 },
// //     contact: { email: '', phone: '', instagram: '', facebook: '', linkedin: '' },
// //   });
// //   const [imagePreview, setImagePreview] = useState(null);

// //   const handleLanguageChange = (e, index) => {
// //     const newLanguages = [...editedProfile.languages];
// //     newLanguages[index] = e.target.value;
// //     setEditedProfile({ ...editedProfile, languages: newLanguages });
// //   };

// //   const addLanguage = () => {
// //     setEditedProfile({ ...editedProfile, languages: [...editedProfile.languages, ''] });
// //   };

// //   const removeLanguage = (index) => {
// //     const newLanguages = [...editedProfile.languages];
// //     newLanguages.splice(index, 1);
// //     setEditedProfile({ ...editedProfile, languages: newLanguages });
// //   };

// //   const compressImage = async (file, maxWidth = 800, quality = 0.7) => {
// //     return new Promise((resolve) => {
// //       const reader = new FileReader();
// //       reader.onload = (event) => {
// //         const img = new Image();
// //         img.onload = () => {
// //           const canvas = document.createElement('canvas');
// //           const scale = Math.min(maxWidth / img.width, 1);
// //           canvas.width = img.width * scale;
// //           canvas.height = img.height * scale;
// //           const ctx = canvas.getContext('2d');
// //           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
// //           canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
// //         };
// //         img.src = event.target.result;
// //       };
// //       reader.readAsDataURL(file);
// //     });
// //   };

// //   const convertToBase64 = (file) => {
// //     return new Promise((resolve, reject) => {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file);
// //       reader.onload = () => resolve(reader.result);
// //       reader.onerror = error => reject(error);
// //     });
// //   };

// //   const handleProfileUpdate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (!editedProfile.bio || !editedProfile.contact.email) {
// //         throw new Error('Please fill all required fields');
// //       }

// //       const profileToSave = {
// //         ...editedProfile,
// //         profileImage: editedProfile.profileImage instanceof File
// //           ? await convertToBase64(await compressImage(editedProfile.profileImage))
// //           : editedProfile.profileImage,
// //       };

// //       const response = await fetch(`${BASE_URL}/guides`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //         },
// //         credentials: 'include',
// //         body: JSON.stringify(profileToSave),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to save profile');
// //       }

// //       const profileResponse = await fetch(`${BASE_URL}/guides/user/profile`, {
// //         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
// //         credentials: 'include',
// //       });

// //       if (profileResponse.ok) {
// //         const profileResult = await profileResponse.json();
// //         if (profileResult.success && profileResult.data) {
// //           setProfile(profileResult.data);
// //           setEditedProfile(profileResult.data);
// //           setProfileComplete(true);
// //           setEditMode(false);
// //           alert('Profile saved!');
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Update failed:', error);
// //       alert(`Save failed: ${error.message}`);
// //       if (error.message.includes('401')) {
// //         localStorage.removeItem('token');
// //         navigate('/login');
// //       }
// //     }
// //   };

// //   const handleAvailabilityChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewAvailability({ ...newAvailability, [name]: value });
// //   };

// //   const handleAvailabilitySubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(`${BASE_URL}/guides/availability`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`,
// //         },
// //         credentials: 'include',
// //         body: JSON.stringify(newAvailability),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to save availability');
// //       }

// //       const result = await response.json();
// //       if (result.success) {
// //         setAvailability([...availability, result.data]);
// //         setNewAvailability({
// //           startDate: '',
// //           endDate: '',
// //           status: 'available'
// //         });
// //         alert('Availability saved!');
// //       }
// //     } catch (error) {
// //       console.error('Failed to save availability:', error);
// //       alert(`Save failed: ${error.message}`);
// //     }
// //   };

// //   useEffect(() => {
// //     const unreadReviews = reviews.filter(review => !review.read).length;
// //     setNotificationCount(unreadReviews);
// //   }, [reviews]);

// //   useEffect(() => {
// //     const isComplete = (
// //       editedProfile.bio &&
// //       editedProfile.expertise.length > 0 &&
// //       editedProfile.locations.length > 0 &&
// //       editedProfile.contact.email &&
// //       editedProfile.profileImage
// //     );
// //     setProfileComplete(isComplete);
// //   }, [editedProfile]);

// //   const formatSocialLink = (platform, username) => {
// //     if (!username) return null;
// //     const cleanedUsername = username.replace(/^@/, '').trim();
// //     switch (platform) {
// //       case 'instagram':
// //         return `https://instagram.com/${cleanedUsername}`;
// //       case 'facebook':
// //         return `https://facebook.com/${cleanedUsername}`;
// //       case 'linkedin':
// //         if (cleanedUsername.startsWith('in/') || cleanedUsername.startsWith('company/')) {
// //           return `https://linkedin.com/${cleanedUsername}`;
// //         }
// //         return `https://linkedin.com/in/${cleanedUsername}`;
// //       default:
// //         return null;
// //     }
// //   };

// //   const handleProfileChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditedProfile({ ...editedProfile, [name]: value });
// //   };

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setEditedProfile({ ...editedProfile, profileImage: file });
// //         setImagePreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleExpertiseChange = (e, index) => {
// //     const newExpertise = [...editedProfile.expertise];
// //     newExpertise[index] = e.target.value;
// //     setEditedProfile({ ...editedProfile, expertise: newExpertise });
// //   };

// //   const addExpertise = () => {
// //     setEditedProfile({ ...editedProfile, expertise: [...editedProfile.expertise, ''] });
// //   };

// //   const removeExpertise = (index) => {
// //     const newExpertise = [...editedProfile.expertise];
// //     newExpertise.splice(index, 1);
// //     setEditedProfile({ ...editedProfile, expertise: newExpertise });
// //   };

// //   const handleLocationChange = (e, index) => {
// //     const newLocations = [...editedProfile.locations];
// //     newLocations[index] = e.target.value;
// //     setEditedProfile({ ...editedProfile, locations: newLocations });
// //   };

// //   const addLocation = () => {
// //     setEditedProfile({ ...editedProfile, locations: [...editedProfile.locations, ''] });
// //   };

// //   const removeLocation = (index) => {
// //     const newLocations = [...editedProfile.locations];
// //     newLocations.splice(index, 1);
// //     setEditedProfile({ ...editedProfile, locations: newLocations });
// //   };

// //   const handlePricingChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditedProfile({
// //       ...editedProfile,
// //       pricing: { ...editedProfile.pricing, [name]: parseInt(value) },
// //     });
// //   };

// //   const handleContactChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditedProfile({
// //       ...editedProfile,
// //       contact: { ...editedProfile.contact, [name]: value },
// //     });
// //   };

// //   const markReviewAsRead = async (id) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(`${BASE_URL}/guide-reviews/${id}/read`, {
// //         method: 'PUT',
// //         headers: { 'Authorization': `Bearer ${token}` },
// //         credentials: 'include',
// //       });

// //       if (response.ok) {
// //         setReviews(reviews.map(review =>
// //           review.id === id ? { ...review, read: true } : review
// //         ));
// //       }
// //     } catch (error) {
// //       console.error('Failed to mark review as read:', error);
// //     }
// //   };

// //   const renderStars = (rating) => {
// //     const stars = [];
// //     for (let i = 1; i <= 5; i++) {
// //       stars.push(
// //         <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
// //           ★
// //         </span>
// //       );
// //     }
// //     return stars;
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     navigate('/login');
// //   };

// //   if (isLoading) {
// //     return <div className="loading-spinner">Loading profile...</div>;
// //   }

// //   return (
// //     <div className="guide-dashboard">
// //       <header className="dashboard-header">
// //         <h1>Guide Dashboard</h1>
// //         <div className="header-actions">
// //           <div className="notification-bell">
// //             <span className="bell-icon">🔔</span>
// //             {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
// //           </div>
// //           <button className="logout-button" onClick={handleLogout}>
// //             <span className="logout-icon">🚪</span> Logout
// //           </button>
// //         </div>
// //       </header>

// //       <nav className="dashboard-nav">
// //         <ul>
// //           <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
// //             {profileComplete ? 'Profile' : 'Complete Profile'}
// //           </li>
// //           {profileComplete && (
// //             <>
// //               <li className={activeTab === 'availability' ? 'active' : ''} onClick={() => setActiveTab('availability')}>
// //                 Availability
// //               </li>
// //               <li className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
// //                 Reviews
// //                 {reviews.filter(r => !r.read).length > 0 && (
// //                   <span className="badge">{reviews.filter(r => !r.read).length}</span>
// //                 )}
// //               </li>
// //             </>
// //           )}
// //         </ul>
// //       </nav>

// //       <main className="dashboard-content">
// //         {activeTab === 'profile' && (
// //           <section className="profile-section">
// //             <div className="section-header">
// //               <h2>{profileComplete ? 'My Profile' : 'Complete Your Profile'}</h2>
// //               {profileComplete && !editMode && (
// //                 <button className="edit-button" onClick={() => setEditMode(true)}>
// //                   Edit Profile
// //                 </button>
// //               )}
// //             </div>

// //             {!editMode && profileComplete ? (
// //               <div className="profile-info">
// //                 <div className="profile-image-container">
// //                   {profile.profileImage ? (
// //                     <img
// //                       src={typeof profile.profileImage === 'string' ? profile.profileImage : URL.createObjectURL(profile.profileImage)}
// //                       alt={profile.name}
// //                       className="profile-image"
// //                     />
// //                   ) : (
// //                     <div className="profile-image-placeholder">
// //                       {profile.name.charAt(0).toUpperCase()}
// //                     </div>
// //                   )}
// //                   <div className="profile-rating">
// //                     {renderStars(profile.rating)}
// //                     <span className="rating-text">{profile.rating} / 5</span>
// //                   </div>
// //                 </div>
// //                 <div className="profile-details">
// //                   <h3>{profile.name}</h3>
// //                   <p className="bio">{profile.bio}</p>
// //                   <div className="detail-section">
// //                     <h4>Expertise</h4>
// //                     <ul className="tags">
// //                       {profile.expertise.map((item, index) => (
// //                         <li key={index} className="tag">{item}</li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                   <div className="detail-section">
// //                     <h4>Available Locations</h4>
// //                     <ul className="tags">
// //                       {profile.locations.map((location, index) => (
// //                         <li key={index} className="tag">{location}</li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                   <div className="detail-section">
// //                     <h4>Pricing</h4>
// //                     <ul className="pricing-list">
// //                       <li><span>Hourly:</span> ${profile.pricing.hourly}</li>
// //                       <li><span>Daily:</span> ${profile.pricing.daily}</li>
// //                       <li><span>Weekly:</span> ${profile.pricing.weekly}</li>
// //                     </ul>
// //                   </div>
// //                   <div className="detail-section">
// //                     <h4>Contact Information</h4>
// //                     <p className="contact-note">Travelers will contact you through these channels:</p>
// //                     <ul className="contact-list">
// //                       <li><span>Email:</span> <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
// //                       {profile.contact.phone && (
// //                         <li><span>Phone:</span> <a href={`tel:${profile.contact.phone.replace(/[^0-9+]/g, '')}`}>{profile.contact.phone}</a></li>
// //                       )}
// //                       {profile.contact.instagram && (
// //                         <li><span>Instagram:</span> <a href={formatSocialLink('instagram', profile.contact.instagram)} target="_blank" rel="noopener noreferrer">{profile.contact.instagram}</a></li>
// //                       )}
// //                       {profile.contact.facebook && (
// //                         <li><span>Facebook:</span> <a href={formatSocialLink('facebook', profile.contact.facebook)} target="_blank" rel="noopener noreferrer">{profile.contact.facebook}</a></li>
// //                       )}
// //                       {profile.contact.linkedin && (
// //                         <li><span>LinkedIn:</span> <a href={formatSocialLink('linkedin', profile.contact.linkedin)} target="_blank" rel="noopener noreferrer">{profile.contact.linkedin}</a></li>
// //                       )}
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
// //                 <div className="form-group">
// //                   <h4>Profile Photo</h4>
// //                   <div className="image-upload-container">
// //                     <div className="image-preview">
// //                       {imagePreview ? (
// //                         <img src={imagePreview} alt="Preview" className="preview-image" />
// //                       ) : (
// //                         <div className="upload-placeholder">
// //                           <span>Upload Photo</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                     <input
// //                       type="file"
// //                       id="profileImage"
// //                       name="profileImage"
// //                       accept="image/*"
// //                       onChange={handleImageUpload}
// //                       required={!profileComplete}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="form-group">
// //                   <h4>Name</h4>
// //                   <input
// //                     type="text"
// //                     id="name"
// //                     name="name"
// //                     value={editedProfile.name}
// //                     onChange={handleProfileChange}
// //                     required
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <h4>Bio</h4>
// //                   <textarea
// //                     id="bio"
// //                     name="bio"
// //                     value={editedProfile.bio}
// //                     onChange={handleProfileChange}
// //                     placeholder="Tell travelers about yourself and your experience"
// //                     required
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <h4>Expertise</h4>
// //                   {editedProfile.expertise.length === 0 && (
// //                     <p className="form-hint">Add at least one area of expertise</p>
// //                   )}
// //                   {editedProfile.expertise.map((expertise, index) => (
// //                     <div key={index} className="array-input">
// //                       <input
// //                         type="text"
// //                         value={expertise}
// //                         onChange={(e) => handleExpertiseChange(e, index)}
// //                         required
// //                       />
// //                       <button type="button" className="remove-button" onClick={() => removeExpertise(index)}>
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                   <button type="button" className="add-button" onClick={addExpertise}>
// //                     + Add Expertise
// //                   </button>
// //                 </div>

// //                 <div className="form-group">
// //                   <h4>Available Locations</h4>
// //                   {editedProfile.locations.length === 0 && (
// //                     <p className="form-hint">Add at least one location where you guide</p>
// //                   )}
// //                   {editedProfile.locations.map((location, index) => (
// //                     <div key={index} className="array-input">
// //                       <input
// //                         type="text"
// //                         value={location}
// //                         onChange={(e) => handleLocationChange(e, index)}
// //                         required
// //                       />
// //                       <button type="button" className="remove-button" onClick={() => removeLocation(index)}>
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                   <button type="button" className="add-button" onClick={addLocation}>
// //                     + Add Location
// //                   </button>
// //                 </div>

// //                 <div className="form-group">
// //                   <h4>Languages</h4>
// //                   {editedProfile.languages.map((language, index) => (
// //                     <div key={index} className="array-input">
// //                       <input
// //                         type="text"
// //                         value={language}
// //                         onChange={(e) => handleLanguageChange(e, index)}
// //                         required
// //                       />
// //                       <button type="button" className="remove-button" onClick={() => removeLanguage(index)}>
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                   <button type="button" className="add-button" onClick={addLanguage}>
// //                     + Add Language
// //                   </button>
// //                 </div>

// //                 <div className="form-group">
// //                   <h4>Pricing</h4>
// //                   <div className="pricing-inputs">
// //                     <div className="input-wrapper">
// //                       <label htmlFor="hourly">Hourly ($)</label>
// //                       <input
// //                         type="number"
// //                         id="hourly"
// //                         name="hourly"
// //                         value={editedProfile.pricing?.hourly ?? 0}
// //                         onChange={handlePricingChange}
// //                         min="0"
// //                         required
// //                       />
// //                     </div>
// //                     <div className="input-wrapper">
// //                       <label htmlFor="daily">Daily ($)</label>
// //                       <input
// //                         type="number"
// //                         id="daily"
// //                         name="daily"
// //                         value={editedProfile.pricing?.daily ?? 0}
// //                         onChange={handlePricingChange}
// //                         min="0"
// //                         required
// //                       />
// //                     </div>
// //                     <div className="input-wrapper">
// //                       <label htmlFor="weekly">Weekly ($)</label>
// //                       <input
// //                         type="number"
// //                         id="weekly"
// //                         name="weekly"
// //                         value={editedProfile.pricing?.weekly ?? 0}
// //                         onChange={handlePricingChange}
// //                         min="0"
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="form-group">
// //                   <h4>Contact Information</h4>
// //                   <p className="form-hint">Travelers will use these to contact you</p>
// //                   <div className="contact-inputs">
// //                     <div className="input-wrapper">
// //                       <label htmlFor="email">Email*</label>
// //                       <input
// //                         type="email"
// //                         id="email"
// //                         name="email"
// //                         value={editedProfile.contact?.email ?? ''}
// //                         onChange={handleContactChange}
// //                         required
// //                       />
// //                     </div>
// //                     <div className="input-wrapper">
// //                       <label htmlFor="phone">Phone number</label>
// //                       <input
// //                         type="text"
// //                         id="phone"
// //                         name="phone"
// //                         value={editedProfile.contact?.phone ?? ''}
// //                         onChange={handleContactChange}
// //                       />
// //                     </div>
// //                     <div className="input-wrapper">
// //                       <label htmlFor="instagram">Instagram</label>
// //                       <input
// //                         type="text"
// //                         id="instagram"
// //                         name="instagram"
// //                         value={editedProfile.contact?.instagram ?? ''}
// //                         onChange={handleContactChange}
// //                         placeholder="@username"
// //                       />
// //                     </div>
// //                     <div className="input-wrapper">
// //                       <label htmlFor="facebook">Facebook</label>
// //                       <input
// //                         type="text"
// //                         id="facebook"
// //                         name="facebook"
// //                         value={editedProfile.contact?.facebook ?? ''}
// //                         onChange={handleContactChange}
// //                         placeholder="username or profile URL"
// //                       />
// //                     </div>
// //                     <div className="input-wrapper">
// //                       <label htmlFor="linkedin">LinkedIn</label>
// //                       <input
// //                         type="text"
// //                         id="linkedin"
// //                         name="linkedin"
// //                         value={editedProfile.contact?.linkedin ?? ''}
// //                         onChange={handleContactChange}
// //                         placeholder="in/username or company/name"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="form-actions">
// //                   <button
// //                     type="submit"
// //                     className="save-button"
// //                     disabled={!profileComplete && !editedProfile.profileImage}
// //                   >
// //                     {profileComplete ? 'Save Profile' : 'Complete Profile'}
// //                   </button>
// //                   {profileComplete && (
// //                     <button
// //                       type="button"
// //                       className="cancel-button"
// //                       onClick={() => {
// //                         setEditMode(false);
// //                         setEditedProfile({ ...profile });
// //                       }}
// //                     >
// //                       Cancel
// //                     </button>
// //                   )}
// //                 </div>
// //               </form>
// //             )}
// //           </section>
// //         )}

// //         {activeTab === 'availability' && profileComplete && (
// //           <section className="availability-section">
// //             <div className="section-header">
// //               <h2>Manage Availability</h2>
// //             </div>
            
// //             <div className="availability-info">
// //               <p>Travelers will contact you directly via your provided contact information to check availability and book your services.</p>
// //               <p>Keep your calendar updated to avoid scheduling conflicts.</p>
// //             </div>

// //             <form className="availability-form" onSubmit={handleAvailabilitySubmit}>
// //               <div className="form-group">
// //                 <h4>Add New Availability Period</h4>
// //                 <div className="availability-inputs">
// //                   <div className="input-wrapper">
// //                     <label htmlFor="startDate">Start Date</label>
// //                     <input
// //                       type="date"
// //                       id="startDate"
// //                       name="startDate"
// //                       value={newAvailability.startDate}
// //                       onChange={handleAvailabilityChange}
// //                       required
// //                     />
// //                   </div>
// //                   <div className="input-wrapper">
// //                     <label htmlFor="endDate">End Date</label>
// //                     <input
// //                       type="date"
// //                       id="endDate"
// //                       name="endDate"
// //                       value={newAvailability.endDate}
// //                       onChange={handleAvailabilityChange}
// //                       required
// //                     />
// //                   </div>
// //                   <div className="input-wrapper">
// //                     <label htmlFor="status">Status</label>
// //                     <select
// //                       id="status"
// //                       name="status"
// //                       value={newAvailability.status}
// //                       onChange={handleAvailabilityChange}
// //                     >
// //                       <option value="available">Available</option>
// //                       <option value="unavailable">Unavailable</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <button type="submit" className="save-button">
// //                   Add Availability
// //                 </button>
// //               </div>
// //             </form>

// //             <div className="availability-list">
// //               <h4>Your Availability</h4>
// //               {availability.length > 0 ? (
// //                 <ul className="availability-items">
// //                   {availability.map((period, index) => (
// //                     <li key={index} className={`availability-item ${period.status}`}>
// //                       <span className="period">
// //                         {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
// //                       </span>
// //                       <span className={`status ${period.status}`}>
// //                         {period.status.charAt(0).toUpperCase() + period.status.slice(1)}
// //                       </span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p>No availability periods set yet.</p>
// //               )}
// //             </div>
// //           </section>
// //         )}

// //         {activeTab === 'reviews' && profileComplete && (
// //           <section className="reviews-section">
// //             <div className="section-header">
// //               <h2>Reviews & Ratings</h2>
// //             </div>
// //             {reviews.length > 0 ? (
// //               <>
// //                 <div className="overall-rating">
// //                   <div className="rating-display">
// //                     <span className="rating-number">{profile.rating}</span>
// //                     <div className="stars">{renderStars(profile.rating)}</div>
// //                   </div>
// //                   <span className="total-reviews">Based on {reviews.length} reviews</span>
// //                 </div>
// //                 <div className="reviews-list">
// //                   {reviews.map(review => (
// //                     <div
// //                       key={review.id}
// //                       className={`review-card ${!review.read ? 'unread' : ''}`}
// //                       onClick={() => markReviewAsRead(review.id)}
// //                     >
// //                       <div className="review-header">
// //                         <span className="traveler-name">{review.traveler}</span>
// //                         <span className="review-date">{review.date}</span>
// //                       </div>
// //                       <div className="review-rating">
// //                         {renderStars(review.rating)}
// //                       </div>
// //                       <p className="review-comment">{review.comment}</p>
// //                       {!review.read && <span className="unread-badge">New</span>}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="no-reviews">
// //                 <p>You don't have any reviews yet.</p>
// //               </div>
// //             )}
// //           </section>
// //         )}
// //       </main>

// //       <footer className="dashboard-footer">
// //         <p>© 2025 Guidedai. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default GuideDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/guide-dashboard.css';
// import { BASE_URL } from '../utils/config';

// const GuideDashboard = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [availability, setAvailability] = useState([]);
//   const [newAvailability, setNewAvailability] = useState({
//     startDate: '',
//     endDate: '',
//     status: 'available'
//   });
//   const [profile, setProfile] = useState({
//     name: '',
//     bio: '',
//     expertise: [],
//     locations: [],
//     languages: ['English'],
//     pricing: { hourly: 0, daily: 0, weekly: 0 },
//     contact: { email: '', phone: '', instagram: '', facebook: '', linkedin: '' },
//     rating: 0,
//     profileImage: null,
//   });
//   const [profileComplete, setProfileComplete] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [activeTab, setActiveTab] = useState('profile');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [editMode, setEditMode] = useState(false); // Initialize as false, will adjust based on profile fetch
//   const [editedProfile, setEditedProfile] = useState({
//     name: '',
//     bio: '',
//     expertise: [],
//     locations: [],
//     languages: ['English'],
//     pricing: { hourly: 0, daily: 0, weekly: 0 },
//     contact: { email: '', phone: '', instagram: '', facebook: '', linkedin: '' },
//     profileImage: null,
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [profileMissing, setProfileMissing] = useState(false); // New state to track if profile is missing

//   useEffect(() => {
//     const loadProfileAndReviews = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const profileResponse = await fetch(`${BASE_URL}/guides/user/profile`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//           credentials: 'include',
//         });

//         if (profileResponse.ok) {
//           const profileResult = await profileResponse.json();
//           if (profileResult.success && profileResult.data) {
//             setProfile(profileResult.data);
//             setEditedProfile(profileResult.data);
//             setProfileComplete(true);
//             setEditMode(false);

//             const reviewsResponse = await fetch(`${BASE_URL}/guide-reviews/guide/${profileResult.data._id}`);
//             if (reviewsResponse.ok) {
//               const reviewsResult = await reviewsResponse.json();
//               if (reviewsResult.success) {
//                 setReviews(reviewsResult.data.map(review => ({
//                   id: review._id,
//                   traveler: review.travelerId?.username || 'Anonymous',
//                   rating: review.rating,
//                   date: new Date(review.createdAt).toISOString().split('T')[0],
//                   comment: review.comment,
//                   read: review.read,
//                   travelerPhoto: review.travelerId?.photo || '',
//                 })));
//               }
//             }

//             const availabilityResponse = await fetch(`${BASE_URL}/guides/user/availability`, {
//               headers: { 'Authorization': `Bearer ${token}` },
//               credentials: 'include',
//             });

//             if (!availabilityResponse.ok) {
//               const errorData = await availabilityResponse.json();
//               console.error('Availability fetch error:', errorData);
//               throw new Error(errorData.message || 'Failed to fetch availability');
//             }

//             const availabilityResult = await availabilityResponse.json();
//             if (availabilityResult.success) {
//               setAvailability(availabilityResult.data);
//             } else {
//               throw new Error(availabilityResult.message || 'Failed to load availability data');
//             }
//           }
//         } else if (profileResponse.status === 404) {
//           setProfileMissing(true);
//           setEditMode(true); // Force edit mode to create profile
//         } else {
//           throw new Error('Failed to load profile');
//         }
//       } catch (error) {
//         console.error('Load failed:', error.message);
//         alert(`Failed to load data: ${error.message}`);
//         if (error.message.includes('not authorized') || error.message.includes('Token is invalid')) {
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadProfileAndReviews();
//   }, [navigate]);

//   const handleLanguageChange = (e, index) => {
//     const newLanguages = [...editedProfile.languages];
//     newLanguages[index] = e.target.value;
//     setEditedProfile({ ...editedProfile, languages: newLanguages });
//   };

//   const addLanguage = () => {
//     setEditedProfile({ ...editedProfile, languages: [...editedProfile.languages, ''] });
//   };

//   const removeLanguage = (index) => {
//     const newLanguages = [...editedProfile.languages];
//     newLanguages.splice(index, 1);
//     setEditedProfile({ ...editedProfile, languages: newLanguages });
//   };

//   const compressImage = async (file, maxWidth = 800, quality = 0.7) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const scale = Math.min(maxWidth / img.width, 1);
//           canvas.width = img.width * scale;
//           canvas.height = img.height * scale;
//           const ctx = canvas.getContext('2d');
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//           canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
//         };
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       if (!editedProfile.bio || !editedProfile.contact.email) {
//         throw new Error('Please fill all required fields');
//       }

//       const profileToSave = {
//         ...editedProfile,
//         profileImage: editedProfile.profileImage instanceof File
//           ? await convertToBase64(await compressImage(editedProfile.profileImage))
//           : editedProfile.profileImage,
//       };

//       const response = await fetch(`${BASE_URL}/guides`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         credentials: 'include',
//         body: JSON.stringify(profileToSave),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save profile');
//       }

//       const profileResponse = await fetch(`${BASE_URL}/guides/user/profile`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//         credentials: 'include',
//       });

//       if (profileResponse.ok) {
//         const profileResult = await profileResponse.json();
//         if (profileResult.success && profileResult.data) {
//           setProfile(profileResult.data);
//           setEditedProfile(profileResult.data);
//           setProfileComplete(true);
//           setEditMode(false);
//           setProfileMissing(false); // Profile is now created
//           alert('Profile saved!');
//         }
//       }
//     } catch (error) {
//       console.error('Update failed:', error);
//       alert(`Save failed: ${error.message}`);
//       if (error.message.includes('401')) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     }
//   };

//   const handleAvailabilityChange = (e) => {
//     const { name, value } = e.target;
//     setNewAvailability({ ...newAvailability, [name]: value });
//   };

//   const handleAvailabilitySubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${BASE_URL}/guides/availability`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         credentials: 'include',
//         body: JSON.stringify(newAvailability),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save availability');
//       }

//       const result = await response.json();
//       if (result.success) {
//         setAvailability([...availability, result.data]);
//         setNewAvailability({
//           startDate: '',
//           endDate: '',
//           status: 'available'
//         });
//         alert('Availability saved!');
//       }
//     } catch (error) {
//       console.error('Failed to save availability:', error);
//       alert(`Save failed: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     const unreadReviews = reviews.filter(review => !review.read).length;
//     setNotificationCount(unreadReviews);
//   }, [reviews]);

//   useEffect(() => {
//     const isComplete = (
//       editedProfile.bio &&
//       editedProfile.expertise.length > 0 &&
//       editedProfile.locations.length > 0 &&
//       editedProfile.contact.email &&
//       editedProfile.profileImage
//     );
//     setProfileComplete(isComplete);
//   }, [editedProfile]);

//   const formatSocialLink = (platform, username) => {
//     if (!username) return null;
//     const cleanedUsername = username.replace(/^@/, '').trim();
//     switch (platform) {
//       case 'instagram':
//         return `https://instagram.com/${cleanedUsername}`;
//       case 'facebook':
//         return `https://facebook.com/${cleanedUsername}`;
//       case 'linkedin':
//         if (cleanedUsername.startsWith('in/') || cleanedUsername.startsWith('company/')) {
//           return `https://linkedin.com/${cleanedUsername}`;
//         }
//         return `https://linkedin.com/in/${cleanedUsername}`;
//       default:
//         return null;
//     }
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProfile({ ...editedProfile, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditedProfile({ ...editedProfile, profileImage: file });
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleExpertiseChange = (e, index) => {
//     const newExpertise = [...editedProfile.expertise];
//     newExpertise[index] = e.target.value;
//     setEditedProfile({ ...editedProfile, expertise: newExpertise });
//   };

//   const addExpertise = () => {
//     setEditedProfile({ ...editedProfile, expertise: [...editedProfile.expertise, ''] });
//   };

//   const removeExpertise = (index) => {
//     const newExpertise = [...editedProfile.expertise];
//     newExpertise.splice(index, 1);
//     setEditedProfile({ ...editedProfile, expertise: newExpertise });
//   };

//   const handleLocationChange = (e, index) => {
//     const newLocations = [...editedProfile.locations];
//     newLocations[index] = e.target.value;
//     setEditedProfile({ ...editedProfile, locations: newLocations });
//   };

//   const addLocation = () => {
//     setEditedProfile({ ...editedProfile, locations: [...editedProfile.locations, ''] });
//   };

//   const removeLocation = (index) => {
//     const newLocations = [...editedProfile.locations];
//     newLocations.splice(index, 1);
//     setEditedProfile({ ...editedProfile, locations: newLocations });
//   };

//   const handlePricingChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProfile({
//       ...editedProfile,
//       pricing: { ...editedProfile.pricing, [name]: parseInt(value) },
//     });
//   };

//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProfile({
//       ...editedProfile,
//       contact: { ...editedProfile.contact, [name]: value },
//     });
//   };

//   const markReviewAsRead = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${BASE_URL}/guide-reviews/${id}/read`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}` },
//         credentials: 'include',
//       });

//       if (response.ok) {
//         setReviews(reviews.map(review =>
//           review.id === id ? { ...review, read: true } : review
//         ));
//       }
//     } catch (error) {
//       console.error('Failed to mark review as read:', error);
//     }
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   if (isLoading) {
//     return <div className="loading-spinner">Loading profile...</div>;
//   }

//   return (
//     <div className="guide-dashboard">
//       <header className="dashboard-header">
//         <h1>Guide Dashboard</h1>
//         <div className="header-actions">
//           <div className="notification-bell">
//             <span className="bell-icon">🔔</span>
//             {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
//           </div>
//           <button className="logout-button" onClick={handleLogout}>
//             <span className="logout-icon">🚪</span> Logout
//           </button>
//         </div>
//       </header>

//       <nav className="dashboard-nav">
//         <ul>
//           <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
//             {profileComplete ? 'Profile' : 'Complete Profile'}
//           </li>
//           {profileComplete && (
//             <>
//               <li className={activeTab === 'availability' ? 'active' : ''} onClick={() => setActiveTab('availability')}>
//                 Availability
//               </li>
//               <li className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
//                 Reviews
//                 {reviews.filter(r => !r.read).length > 0 && (
//                   <span className="badge">{reviews.filter(r => !r.read).length}</span>
//                 )}
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       <main className="dashboard-content">
//         <>
//           {profileMissing || !profileComplete ? (
//             <section className="profile-section">
//               <div className="section-header">
//                 <h2>Complete Your Profile</h2>
//               </div>
//               <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
//                 <div className="form-group">
//                   <h4>Profile Photo</h4>
//                   <div className="image-upload-container">
//                     <div className="image-preview">
//                       {imagePreview ? (
//                         <img src={imagePreview} alt="Preview" className="preview-image" />
//                       ) : (
//                         <div className="upload-placeholder">
//                           <span>Upload Photo</span>
//                         </div>
//                       )}
//                     </div>
//                     <input
//                       type="file"
//                       id="profileImage"
//                       name="profileImage"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <h4>Name</h4>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={editedProfile.name}
//                     onChange={handleProfileChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <h4>Bio</h4>
//                   <textarea
//                     id="bio"
//                     name="bio"
//                     value={editedProfile.bio}
//                     onChange={handleProfileChange}
//                     placeholder="Tell travelers about yourself and your experience"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <h4>Expertise</h4>
//                   {editedProfile.expertise.length === 0 && (
//                     <p className="form-hint">Add at least one area of expertise</p>
//                   )}
//                   {editedProfile.expertise.map((expertise, index) => (
//                     <div key={index} className="array-input">
//                       <input
//                         type="text"
//                         value={expertise}
//                         onChange={(e) => handleExpertiseChange(e, index)}
//                         required
//                       />
//                       <button type="button" className="remove-button" onClick={() => removeExpertise(index)}>
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                   <button type="button" className="add-button" onClick={addExpertise}>
//                     + Add Expertise
//                   </button>
//                 </div>

//                 <div className="form-group">
//                   <h4>Available Locations</h4>
//                   {editedProfile.locations.length === 0 && (
//                     <p className="form-hint">Add at least one location where you guide</p>
//                   )}
//                   {editedProfile.locations.map((location, index) => (
//                     <div key={index} className="array-input">
//                       <input
//                         type="text"
//                         value={location}
//                         onChange={(e) => handleLocationChange(e, index)}
//                         required
//                       />
//                       <button type="button" className="remove-button" onClick={() => removeLocation(index)}>
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                   <button type="button" className="add-button" onClick={addLocation}>
//                     + Add Location
//                   </button>
//                 </div>

//                 <div className="form-group">
//                   <h4>Languages</h4>
//                   {editedProfile.languages.map((language, index) => (
//                     <div key={index} className="array-input">
//                       <input
//                         type="text"
//                         value={language}
//                         onChange={(e) => handleLanguageChange(e, index)}
//                         required
//                       />
//                       <button type="button" className="remove-button" onClick={() => removeLanguage(index)}>
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                   <button type="button" className="add-button" onClick={addLanguage}>
//                     + Add Language
//                   </button>
//                 </div>

//                 <div className="form-group">
//                   <h4>Pricing</h4>
//                   <div className="pricing-inputs">
//                     <div className="input-wrapper">
//                       <label htmlFor="hourly">Hourly ($)</label>
//                       <input
//                         type="number"
//                         id="hourly"
//                         name="hourly"
//                         value={editedProfile.pricing?.hourly ?? 0}
//                         onChange={handlePricingChange}
//                         min="0"
//                         required
//                       />
//                     </div>
//                     <div className="input-wrapper">
//                       <label htmlFor="daily">Daily ($)</label>
//                       <input
//                         type="number"
//                         id="daily"
//                         name="daily"
//                         value={editedProfile.pricing?.daily ?? 0}
//                         onChange={handlePricingChange}
//                         min="0"
//                         required
//                       />
//                     </div>
//                     <div className="input-wrapper">
//                       <label htmlFor="weekly">Weekly ($)</label>
//                       <input
//                         type="number"
//                         id="weekly"
//                         name="weekly"
//                         value={editedProfile.pricing?.weekly ?? 0}
//                         onChange={handlePricingChange}
//                         min="0"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <h4>Contact Information</h4>
//                   <p className="form-hint">Travelers will use these to contact you</p>
//                   <div className="contact-inputs">
//                     <div className="input-wrapper">
//                       <label htmlFor="email">Email*</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={editedProfile.contact?.email ?? ''}
//                         onChange={handleContactChange}
//                         required
//                       />
//                     </div>
//                     <div className="input-wrapper">
//                       <label htmlFor="phone">Phone number</label>
//                       <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         value={editedProfile.contact?.phone ?? ''}
//                         onChange={handleContactChange}
//                       />
//                     </div>
//                     <div className="input-wrapper">
//                       <label htmlFor="instagram">Instagram</label>
//                       <input
//                         type="text"
//                         id="instagram"
//                         name="instagram"
//                         value={editedProfile.contact?.instagram ?? ''}
//                         onChange={handleContactChange}
//                         placeholder="@username"
//                       />
//                     </div>
//                     <div className="input-wrapper">
//                       <label htmlFor="facebook">Facebook</label>
//                       <input
//                         type="text"
//                         id="facebook"
//                         name="facebook"
//                         value={editedProfile.contact?.facebook ?? ''}
//                         onChange={handleContactChange}
//                         placeholder="username or profile URL"
//                       />
//                     </div>
//                     <div className="input-wrapper">
//                       <label htmlFor="linkedin">LinkedIn</label>
//                       <input
//                         type="text"
//                         id="linkedin"
//                         name="linkedin"
//                         value={editedProfile.contact?.linkedin ?? ''}
//                         onChange={handleContactChange}
//                         placeholder="in/username or company/name"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <button type="submit" className="save-button">
//                     Complete Profile
//                   </button>
//                 </div>
//               </form>
//             </section>
//           ) : (
//             <>
//               {activeTab === 'profile' && (
//                 <section className="profile-section">
//                   <div className="section-header">
//                     <h2>My Profile</h2>
//                     {!editMode && (
//                       <button className="edit-button" onClick={() => setEditMode(true)}>
//                         Edit Profile
//                       </button>
//                     )}
//                   </div>

//                   {!editMode ? (
//                     <div className="profile-info">
//                       <div className="profile-image-container">
//                         {profile.profileImage ? (
//                           <img
//                             src={typeof profile.profileImage === 'string' ? profile.profileImage : URL.createObjectURL(profile.profileImage)}
//                             alt={profile.name}
//                             className="profile-image"
//                           />
//                         ) : (
//                           <div className="profile-image-placeholder">
//                             {profile.name.charAt(0).toUpperCase()}
//                           </div>
//                         )}
//                         <div className="profile-rating">
//                           {renderStars(profile.rating)}
//                           <span className="rating-text">{profile.rating} / 5</span>
//                         </div>
//                       </div>
//                       <div className="profile-details">
//                         <h3>{profile.name}</h3>
//                         <p className="bio">{profile.bio}</p>
//                         <div className="detail-section">
//                           <h4>Expertise</h4>
//                           <ul className="tags">
//                             {profile.expertise.map((item, index) => (
//                               <li key={index} className="tag">{item}</li>
//                             ))}
//                           </ul>
//                         </div>
//                         <div className="detail-section">
//                           <h4>Available Locations</h4>
//                           <ul className="tags">
//                             {profile.locations.map((location, index) => (
//                               <li key={index} className="tag">{location}</li>
//                             ))}
//                           </ul>
//                         </div>
//                         <div className="detail-section">
//                           <h4>Pricing</h4>
//                           <ul className="pricing-list">
//                             <li><span>Hourly:</span> ${profile.pricing.hourly}</li>
//                             <li><span>Daily:</span> ${profile.pricing.daily}</li>
//                             <li><span>Weekly:</span> ${profile.pricing.weekly}</li>
//                           </ul>
//                         </div>
//                         <div className="detail-section">
//                           <h4>Contact Information</h4>
//                           <p className="contact-note">Travelers will contact you through these channels:</p>
//                           <ul className="contact-list">
//                             <li><span>Email:</span> <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
//                             {profile.contact.phone && (
//                               <li><span>Phone:</span> <a href={`tel:${profile.contact.phone.replace(/[^0-9+]/g, '')}`}>{profile.contact.phone}</a></li>
//                             )}
//                             {profile.contact.instagram && (
//                               <li><span>Instagram:</span> <a href={formatSocialLink('instagram', profile.contact.instagram)} target="_blank" rel="noopener noreferrer">{profile.contact.instagram}</a></li>
//                             )}
//                             {profile.contact.facebook && (
//                               <li><span>Facebook:</span> <a href={formatSocialLink('facebook', profile.contact.facebook)} target="_blank" rel="noopener noreferrer">{profile.contact.facebook}</a></li>
//                             )}
//                             {profile.contact.linkedin && (
//                               <li><span>LinkedIn:</span> <a href={formatSocialLink('linkedin', profile.contact.linkedin)} target="_blank" rel="noopener noreferrer">{profile.contact.linkedin}</a></li>
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
//                       <div className="form-group">
//                         <h4>Profile Photo</h4>
//                         <div className="image-upload-container">
//                           <div className="image-preview">
//                             {imagePreview ? (
//                               <img src={imagePreview} alt="Preview" className="preview-image" />
//                             ) : (
//                               <div className="upload-placeholder">
//                                 <span>Upload Photo</span>
//                               </div>
//                             )}
//                           </div>
//                           <input
//                             type="file"
//                             id="profileImage"
//                             name="profileImage"
//                             accept="image/*"
//                             onChange={handleImageUpload}
//                             required={!profileComplete}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <h4>Name</h4>
//                         <input
//                           type="text"
//                           id="name"
//                           name="name"
//                           value={editedProfile.name}
//                           onChange={handleProfileChange}
//                           required
//                         />
//                       </div>

//                       <div className="form-group">
//                         <h4>Bio</h4>
//                         <textarea
//                           id="bio"
//                           name="bio"
//                           value={editedProfile.bio}
//                           onChange={handleProfileChange}
//                           placeholder="Tell travelers about yourself and your experience"
//                           required
//                         />
//                       </div>

//                       <div className="form-group">
//                         <h4>Expertise</h4>
//                         {editedProfile.expertise.length === 0 && (
//                           <p className="form-hint">Add at least one area of expertise</p>
//                         )}
//                         {editedProfile.expertise.map((expertise, index) => (
//                           <div key={index} className="array-input">
//                             <input
//                               type="text"
//                               value={expertise}
//                               onChange={(e) => handleExpertiseChange(e, index)}
//                               required
//                             />
//                             <button type="button" className="remove-button" onClick={() => removeExpertise(index)}>
//                               ×
//                             </button>
//                           </div>
//                         ))}
//                         <button type="button" className="add-button" onClick={addExpertise}>
//                           + Add Expertise
//                         </button>
//                       </div>

//                       <div className="form-group">
//                         <h4>Available Locations</h4>
//                         {editedProfile.locations.length === 0 && (
//                           <p className="form-hint">Add at least one location where you guide</p>
//                         )}
//                         {editedProfile.locations.map((location, index) => (
//                           <div key={index} className="array-input">
//                             <input
//                               type="text"
//                               value={location}
//                               onChange={(e) => handleLocationChange(e, index)}
//                               required
//                             />
//                             <button type="button" className="remove-button" onClick={() => removeLocation(index)}>
//                               ×
//                             </button>
//                           </div>
//                         ))}
//                         <button type="button" className="add-button" onClick={addLocation}>
//                           + Add Location
//                         </button>
//                       </div>

//                       <div className="form-group">
//                         <h4>Languages</h4>
//                         {editedProfile.languages.map((language, index) => (
//                           <div key={index} className="array-input">
//                             <input
//                               type="text"
//                               value={language}
//                               onChange={(e) => handleLanguageChange(e, index)}
//                               required
//                             />
//                             <button type="button" className="remove-button" onClick={() => removeLanguage(index)}>
//                               ×
//                             </button>
//                           </div>
//                         ))}
//                         <button type="button" className="add-button" onClick={addLanguage}>
//                           + Add Language
//                         </button>
//                       </div>

//                       <div className="form-group">
//                         <h4>Pricing</h4>
//                         <div className="pricing-inputs">
//                           <div className="input-wrapper">
//                             <label htmlFor="hourly">Hourly ($)</label>
//                             <input
//                               type="number"
//                               id="hourly"
//                               name="hourly"
//                               value={editedProfile.pricing?.hourly ?? 0}
//                               onChange={handlePricingChange}
//                               min="0"
//                               required
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <label htmlFor="daily">Daily ($)</label>
//                             <input
//                               type="number"
//                               id="daily"
//                               name="daily"
//                               value={editedProfile.pricing?.daily ?? 0}
//                               onChange={handlePricingChange}
//                               min="0"
//                               required
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <label htmlFor="weekly">Weekly ($)</label>
//                             <input
//                               type="number"
//                               id="weekly"
//                               name="weekly"
//                               value={editedProfile.pricing?.weekly ?? 0}
//                               onChange={handlePricingChange}
//                               min="0"
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <h4>Contact Information</h4>
//                         <p className="form-hint">Travelers will use these to contact you</p>
//                         <div className="contact-inputs">
//                           <div className="input-wrapper">
//                             <label htmlFor="email">Email*</label>
//                             <input
//                               type="email"
//                               id="email"
//                               name="email"
//                               value={editedProfile.contact?.email ?? ''}
//                               onChange={handleContactChange}
//                               required
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <label htmlFor="phone">Phone number</label>
//                             <input
//                               type="text"
//                               id="phone"
//                               name="phone"
//                               value={editedProfile.contact?.phone ?? ''}
//                               onChange={handleContactChange}
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <label htmlFor="instagram">Instagram</label>
//                             <input
//                               type="text"
//                               id="instagram"
//                               name="instagram"
//                               value={editedProfile.contact?.instagram ?? ''}
//                               onChange={handleContactChange}
//                               placeholder="@username"
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <label htmlFor="facebook">Facebook</label>
//                             <input
//                               type="text"
//                               id="facebook"
//                               name="facebook"
//                               value={editedProfile.contact?.facebook ?? ''}
//                               onChange={handleContactChange}
//                               placeholder="username or profile URL"
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <label htmlFor="linkedin">LinkedIn</label>
//                             <input
//                               type="text"
//                               id="linkedin"
//                               name="linkedin"
//                               value={editedProfile.contact?.linkedin ?? ''}
//                               onChange={handleContactChange}
//                               placeholder="in/username or company/name"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="form-actions">
//                         <button
//                           type="submit"
//                           className="save-button"
//                           disabled={!profileComplete && !editedProfile.profileImage}
//                         >
//                           {profileComplete ? 'Save Profile' : 'Complete Profile'}
//                         </button>
//                         {profileComplete && (
//                           <button
//                             type="button"
//                             className="cancel-button"
//                             onClick={() => {
//                               setEditMode(false);
//                               setEditedProfile({ ...profile });
//                             }}
//                           >
//                             Cancel
//                           </button>
//                         )}
//                       </div>
//                     </form>
//                   )}
//                 </section>
//               )}
//               {activeTab === 'availability' && profileComplete && (
//                 <section className="availability-section">
//                   <div className="section-header">
//                     <h2>Manage Availability</h2>
//                   </div>
                  
//                   <div className="availability-info">
//                     <p>Travelers will contact you directly via your provided contact information to check availability and book your services.</p>
//                     <p>Keep your calendar updated to avoid scheduling conflicts.</p>
//                   </div>

//                   <form className="availability-form" onSubmit={handleAvailabilitySubmit}>
//                     <div className="form-group">
//                       <h4>Add New Availability Period</h4>
//                       <div className="availability-inputs">
//                         <div className="input-wrapper">
//                           <label htmlFor="startDate">Start Date</label>
//                           <input
//                             type="date"
//                             id="startDate"
//                             name="startDate"
//                             value={newAvailability.startDate}
//                             onChange={handleAvailabilityChange}
//                             required
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <label htmlFor="endDate">End Date</label>
//                           <input
//                             type="date"
//                             id="endDate"
//                             name="endDate"
//                             value={newAvailability.endDate}
//                             onChange={handleAvailabilityChange}
//                             required
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <label htmlFor="status">Status</label>
//                           <select
//                             id="status"
//                             name="status"
//                             value={newAvailability.status}
//                             onChange={handleAvailabilityChange}
//                           >
//                             <option value="available">Available</option>
//                             <option value="unavailable">Unavailable</option>
//                           </select>
//                         </div>
//                       </div>
//                       <button type="submit" className="save-button">
//                         Add Availability
//                       </button>
//                     </div>
//                   </form>

//                   <div className="availability-list">
//                     <h4>Your Availability</h4>
//                     {availability.length > 0 ? (
//                       <ul className="availability-items">
//                         {availability.map((period, index) => (
//                           <li key={index} className={`availability-item ${period.status}`}>
//                             <span className="period">
//                               {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
//                             </span>
//                             <span className={`status ${period.status}`}>
//                               {period.status.charAt(0).toUpperCase() + period.status.slice(1)}
//                             </span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p>No availability periods set yet.</p>
//                     )}
//                   </div>
//                 </section>
//               )}
//               {activeTab === 'reviews' && profileComplete && (
//                 <section className="reviews-section">
//                   <div className="section-header">
//                     <h2>Reviews & Ratings</h2>
//                   </div>
//                   {reviews.length > 0 ? (
//                     <>
//                       <div className="overall-rating">
//                         <div className="rating-display">
//                           <span className="rating-number">{profile.rating}</span>
//                           <div className="stars">{renderStars(profile.rating)}</div>
//                         </div>
//                         <span className="total-reviews">Based on {reviews.length} reviews</span>
//                       </div>
//                       <div className="reviews-list">
//                         {reviews.map(review => (
//                           <div
//                             key={review.id}
//                             className={`review-card ${!review.read ? 'unread' : ''}`}
//                             onClick={() => markReviewAsRead(review.id)}
//                           >
//                             <div className="review-header">
//                               <span className="traveler-name">{review.traveler}</span>
//                               <span className="review-date">{review.date}</span>
//                             </div>
//                             <div className="review-rating">
//                               {renderStars(review.rating)}
//                             </div>
//                             <p className="review-comment">{review.comment}</p>
//                             {!review.read && <span className="unread-badge">New</span>}
//                           </div>
//                         ))}
//                       </div>
//                     </>
//                   ) : (
//                     <div className="no-reviews">
//                       <p>You don't have any reviews yet.</p>
//                     </div>
//                   )}
//                 </section>
//               )}
//             </>
//           )}
//         </>
//       </main>

//       <footer className="dashboard-footer">
//         <p>© 2025 Guidedai. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default GuideDashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/guide-dashboard.css';
import { BASE_URL } from '../utils/config';

const GuideDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [availability, setAvailability] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    startDate: '',
    endDate: '',
    status: 'available'
  });
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    expertise: [],
    locations: [],
    languages: ['English'],
    pricing: { hourly: 0, daily: 0, weekly: 0 },
    contact: { email: '', phone: '', instagram: '', facebook: '', linkedin: '' },
    rating: 0,
    profileImage: null,
  });
  const [profileComplete, setProfileComplete] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationCount, setNotificationCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    bio: '',
    expertise: [],
    locations: [],
    languages: ['English'],
    pricing: { hourly: 0, daily: 0, weekly: 0 },
    contact: { email: '', phone: '', instagram: '', facebook: '', linkedin: '' },
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [profileMissing, setProfileMissing] = useState(false);

  useEffect(() => {
    const loadProfileAndReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const profileResponse = await fetch(`${BASE_URL}/guides/user/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include',
        });

        if (profileResponse.ok) {
          const profileResult = await profileResponse.json();
          if (profileResult.success && profileResult.data) {
            setProfile(profileResult.data);
            setEditedProfile(profileResult.data);
            setProfileComplete(true);
            setEditMode(false);

            const reviewsResponse = await fetch(`${BASE_URL}/guide-reviews/guide/${profileResult.data._id}`);
            if (reviewsResponse.ok) {
              const reviewsResult = await reviewsResponse.json();
              if (reviewsResult.success) {
                setReviews(reviewsResult.data.map(review => ({
                  id: review._id,
                  traveler: review.travelerId?.username || 'Anonymous',
                  rating: review.rating,
                  date: new Date(review.createdAt).toISOString().split('T')[0],
                  comment: review.comment,
                  read: review.read,
                  travelerPhoto: review.travelerId?.photo || '',
                })));
              }
            }

            const availabilityResponse = await fetch(`${BASE_URL}/guides/user/availability`, {
              headers: { 'Authorization': `Bearer ${token}` },
              credentials: 'include',
            });

            if (!availabilityResponse.ok) {
              const errorData = await availabilityResponse.json();
              console.error('Availability fetch error:', errorData);
              throw new Error(errorData.message || 'Failed to fetch availability');
            }

            const availabilityResult = await availabilityResponse.json();
            if (availabilityResult.success) {
              setAvailability(availabilityResult.data);
            } else {
              throw new Error(availabilityResult.message || 'Failed to load availability data');
            }
          }
        } else if (profileResponse.status === 404) {
          setProfileMissing(true);
          setEditMode(true);
        } else {
          throw new Error('Failed to load profile');
        }
      } catch (error) {
        console.error('Load failed:', error.message);
        alert(`Failed to load data: ${error.message}`);
        if (error.message.includes('not authorized') || error.message.includes('Token is invalid')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileAndReviews();
  }, [navigate]);

  const handleLanguageChange = (e, index) => {
    const newLanguages = [...editedProfile.languages];
    newLanguages[index] = e.target.value;
    setEditedProfile({ ...editedProfile, languages: newLanguages });
  };

  const addLanguage = () => {
    setEditedProfile({ ...editedProfile, languages: [...editedProfile.languages, ''] });
  };

  const removeLanguage = (index) => {
    const newLanguages = [...editedProfile.languages];
    newLanguages.splice(index, 1);
    setEditedProfile({ ...editedProfile, languages: newLanguages });
  };

  const compressImage = async (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = Math.min(maxWidth / img.width, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!editedProfile.bio || !editedProfile.contact.email) {
        throw new Error('Please fill all required fields');
      }

      const profileToSave = {
        ...editedProfile,
        profileImage: editedProfile.profileImage instanceof File
          ? await convertToBase64(await compressImage(editedProfile.profileImage))
          : editedProfile.profileImage,
      };

      const response = await fetch(`${BASE_URL}/guides`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(profileToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save profile');
      }

      const profileResponse = await fetch(`${BASE_URL}/guides/user/profile`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        credentials: 'include',
      });

      if (profileResponse.ok) {
        const profileResult = await profileResponse.json();
        if (profileResult.success && profileResult.data) {
          setProfile(profileResult.data);
          setEditedProfile(profileResult.data);
          setProfileComplete(true);
          setEditMode(false);
          setProfileMissing(false);
          alert('Profile saved!');
        }
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert(`Save failed: ${error.message}`);
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability({ ...newAvailability, [name]: value });
  };

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/guides/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(newAvailability),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save availability');
      }

      const result = await response.json();
      if (result.success) {
        setAvailability([...availability, result.data]);
        setNewAvailability({
          startDate: '',
          endDate: '',
          status: 'available'
        });
        alert('Availability saved!');
      }
    } catch (error) {
      console.error('Failed to save availability:', error);
      alert(`Save failed: ${error.message}`);
    }
  };

  const handleDeleteAvailability = async (id) => {
    if (window.confirm('Are you sure you want to delete this availability period?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/guides/availability/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete availability');
        }

        const result = await response.json();
        if (result.success) {
          setAvailability(availability.filter(item => item._id !== id));
          alert('Availability deleted successfully!');
        }
      } catch (error) {
        console.error('Failed to delete availability:', error);
        alert(`Delete failed: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const unreadReviews = reviews.filter(review => !review.read).length;
    setNotificationCount(unreadReviews);
  }, [reviews]);

  useEffect(() => {
    const isComplete = (
      editedProfile.bio &&
      editedProfile.expertise.length > 0 &&
      editedProfile.locations.length > 0 &&
      editedProfile.contact.email &&
      editedProfile.profileImage
    );
    setProfileComplete(isComplete);
  }, [editedProfile]);

  const formatSocialLink = (platform, username) => {
    if (!username) return null;
    const cleanedUsername = username.replace(/^@/, '').trim();
    switch (platform) {
      case 'instagram':
        return `https://instagram.com/${cleanedUsername}`;
      case 'facebook':
        return `https://facebook.com/${cleanedUsername}`;
      case 'linkedin':
        if (cleanedUsername.startsWith('in/') || cleanedUsername.startsWith('company/')) {
          return `https://linkedin.com/${cleanedUsername}`;
        }
        return `https://linkedin.com/in/${cleanedUsername}`;
      default:
        return null;
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, profileImage: file });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExpertiseChange = (e, index) => {
    const newExpertise = [...editedProfile.expertise];
    newExpertise[index] = e.target.value;
    setEditedProfile({ ...editedProfile, expertise: newExpertise });
  };

  const addExpertise = () => {
    setEditedProfile({ ...editedProfile, expertise: [...editedProfile.expertise, ''] });
  };

  const removeExpertise = (index) => {
    const newExpertise = [...editedProfile.expertise];
    newExpertise.splice(index, 1);
    setEditedProfile({ ...editedProfile, expertise: newExpertise });
  };

  const handleLocationChange = (e, index) => {
    const newLocations = [...editedProfile.locations];
    newLocations[index] = e.target.value;
    setEditedProfile({ ...editedProfile, locations: newLocations });
  };

  const addLocation = () => {
    setEditedProfile({ ...editedProfile, locations: [...editedProfile.locations, ''] });
  };

  const removeLocation = (index) => {
    const newLocations = [...editedProfile.locations];
    newLocations.splice(index, 1);
    setEditedProfile({ ...editedProfile, locations: newLocations });
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      pricing: { ...editedProfile.pricing, [name]: parseInt(value) },
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      contact: { ...editedProfile.contact, [name]: value },
    });
  };

  const markReviewAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/guide-reviews/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });

      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === id ? { ...review, read: true } : review
        ));
      }
    } catch (error) {
      console.error('Failed to mark review as read:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading profile...</div>;
  }

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
            <span className="logout-icon">🚪</span> Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <ul>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            {profileComplete ? 'Profile' : 'Complete Profile'}
          </li>
          {profileComplete && (
            <>
              <li className={activeTab === 'availability' ? 'active' : ''} onClick={() => setActiveTab('availability')}>
                Availability
              </li>
              <li className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
                Reviews
                {reviews.filter(r => !r.read).length > 0 && (
                  <span className="badge">{reviews.filter(r => !r.read).length}</span>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>

      <main className="dashboard-content">
        <>
          {profileMissing || !profileComplete ? (
            <section className="profile-section">
              <div className="section-header">
                <h2>Complete Your Profile</h2>
              </div>
              <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <h4>Profile Photo</h4>
                  <div className="image-upload-container">
                    <div className="image-preview">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="preview-image" />
                      ) : (
                        <div className="upload-placeholder">
                          <span>Upload Photo</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <h4>Name</h4>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleProfileChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <h4>Bio</h4>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell travelers about yourself and your experience"
                    required
                  />
                </div>

                <div className="form-group">
                  <h4>Expertise</h4>
                  {editedProfile.expertise.length === 0 && (
                    <p className="form-hint">Add at least one area of expertise</p>
                  )}
                  {editedProfile.expertise.map((expertise, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={expertise}
                        onChange={(e) => handleExpertiseChange(e, index)}
                        required
                      />
                      <button type="button" className="remove-button" onClick={() => removeExpertise(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-button" onClick={addExpertise}>
                    + Add Expertise
                  </button>
                </div>

                <div className="form-group">
                  <h4>Available Locations</h4>
                  {editedProfile.locations.length === 0 && (
                    <p className="form-hint">Add at least one location where you guide</p>
                  )}
                  {editedProfile.locations.map((location, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => handleLocationChange(e, index)}
                        required
                      />
                      <button type="button" className="remove-button" onClick={() => removeLocation(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-button" onClick={addLocation}>
                    + Add Location
                  </button>
                </div>

                <div className="form-group">
                  <h4>Languages</h4>
                  {editedProfile.languages.map((language, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => handleLanguageChange(e, index)}
                        required
                      />
                      <button type="button" className="remove-button" onClick={() => removeLanguage(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-button" onClick={addLanguage}>
                    + Add Language
                  </button>
                </div>

                <div className="form-group">
                  <h4>Pricing</h4>
                  <div className="pricing-inputs">
                    <div className="input-wrapper">
                      <label htmlFor="hourly">Hourly ($)</label>
                      <input
                        type="number"
                        id="hourly"
                        name="hourly"
                        value={editedProfile.pricing?.hourly ?? 0}
                        onChange={handlePricingChange}
                        min="0"
                        required
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="daily">Daily ($)</label>
                      <input
                        type="number"
                        id="daily"
                        name="daily"
                        value={editedProfile.pricing?.daily ?? 0}
                        onChange={handlePricingChange}
                        min="0"
                        required
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="weekly">Weekly ($)</label>
                      <input
                        type="number"
                        id="weekly"
                        name="weekly"
                        value={editedProfile.pricing?.weekly ?? 0}
                        onChange={handlePricingChange}
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <h4>Contact Information</h4>
                  <p className="form-hint">Travelers will use these to contact you</p>
                  <div className="contact-inputs">
                    <div className="input-wrapper">
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={editedProfile.contact?.email ?? ''}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="phone">Phone number</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={editedProfile.contact?.phone ?? ''}
                        onChange={handleContactChange}
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="instagram">Instagram</label>
                      <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={editedProfile.contact?.instagram ?? ''}
                        onChange={handleContactChange}
                        placeholder="@username"
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="facebook">Facebook</label>
                      <input
                        type="text"
                        id="facebook"
                        name="facebook"
                        value={editedProfile.contact?.facebook ?? ''}
                        onChange={handleContactChange}
                        placeholder="username or profile URL"
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="linkedin">LinkedIn</label>
                      <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={editedProfile.contact?.linkedin ?? ''}
                        onChange={handleContactChange}
                        placeholder="in/username or company/name"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Complete Profile
                  </button>
                </div>
              </form>
            </section>
          ) : (
            <>
              {activeTab === 'profile' && (
                <section className="profile-section">
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
                        {profile.profileImage ? (
                          <img
                            src={typeof profile.profileImage === 'string' ? profile.profileImage : URL.createObjectURL(profile.profileImage)}
                            alt={profile.name}
                            className="profile-image"
                          />
                        ) : (
                          <div className="profile-image-placeholder">
                            {profile.name.charAt(0).toUpperCase()}
                          </div>
                        )}
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
                          <p className="contact-note">Travelers will contact you through these channels:</p>
                          <ul className="contact-list">
                            <li><span>Email:</span> <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
                            {profile.contact.phone && (
                              <li><span>Phone:</span> <a href={`tel:${profile.contact.phone.replace(/[^0-9+]/g, '')}`}>{profile.contact.phone}</a></li>
                            )}
                            {profile.contact.instagram && (
                              <li><span>Instagram:</span> <a href={formatSocialLink('instagram', profile.contact.instagram)} target="_blank" rel="noopener noreferrer">{profile.contact.instagram}</a></li>
                            )}
                            {profile.contact.facebook && (
                              <li><span>Facebook:</span> <a href={formatSocialLink('facebook', profile.contact.facebook)} target="_blank" rel="noopener noreferrer">{profile.contact.facebook}</a></li>
                            )}
                            {profile.contact.linkedin && (
                              <li><span>LinkedIn:</span> <a href={formatSocialLink('linkedin', profile.contact.linkedin)} target="_blank" rel="noopener noreferrer">{profile.contact.linkedin}</a></li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
                      <div className="form-group">
                        <h4>Profile Photo</h4>
                        <div className="image-upload-container">
                          <div className="image-preview">
                            {imagePreview ? (
                              <img src={imagePreview} alt="Preview" className="preview-image" />
                            ) : (
                              <div className="upload-placeholder">
                                <span>Upload Photo</span>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required={!profileComplete}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <h4>Name</h4>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editedProfile.name}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <h4>Bio</h4>
                        <textarea
                          id="bio"
                          name="bio"
                          value={editedProfile.bio}
                          onChange={handleProfileChange}
                          placeholder="Tell travelers about yourself and your experience"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <h4>Expertise</h4>
                        {editedProfile.expertise.length === 0 && (
                          <p className="form-hint">Add at least one area of expertise</p>
                        )}
                        {editedProfile.expertise.map((expertise, index) => (
                          <div key={index} className="array-input">
                            <input
                              type="text"
                              value={expertise}
                              onChange={(e) => handleExpertiseChange(e, index)}
                              required
                            />
                            <button type="button" className="remove-button" onClick={() => removeExpertise(index)}>
                              ×
                            </button>
                          </div>
                        ))}
                        <button type="button" className="add-button" onClick={addExpertise}>
                          + Add Expertise
                        </button>
                      </div>

                      <div className="form-group">
                        <h4>Available Locations</h4>
                        {editedProfile.locations.length === 0 && (
                          <p className="form-hint">Add at least one location where you guide</p>
                        )}
                        {editedProfile.locations.map((location, index) => (
                          <div key={index} className="array-input">
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => handleLocationChange(e, index)}
                              required
                            />
                            <button type="button" className="remove-button" onClick={() => removeLocation(index)}>
                              ×
                            </button>
                          </div>
                        ))}
                        <button type="button" className="add-button" onClick={addLocation}>
                          + Add Location
                        </button>
                      </div>

                      <div className="form-group">
                        <h4>Languages</h4>
                        {editedProfile.languages.map((language, index) => (
                          <div key={index} className="array-input">
                            <input
                              type="text"
                              value={language}
                              onChange={(e) => handleLanguageChange(e, index)}
                              required
                            />
                            <button type="button" className="remove-button" onClick={() => removeLanguage(index)}>
                              ×
                            </button>
                          </div>
                        ))}
                        <button type="button" className="add-button" onClick={addLanguage}>
                          + Add Language
                        </button>
                      </div>

                      <div className="form-group">
                        <h4>Pricing</h4>
                        <div className="pricing-inputs">
                          <div className="input-wrapper">
                            <label htmlFor="hourly">Hourly ($)</label>
                            <input
                              type="number"
                              id="hourly"
                              name="hourly"
                              value={editedProfile.pricing?.hourly ?? 0}
                              onChange={handlePricingChange}
                              min="0"
                              required
                            />
                          </div>
                          <div className="input-wrapper">
                            <label htmlFor="daily">Daily ($)</label>
                            <input
                              type="number"
                              id="daily"
                              name="daily"
                              value={editedProfile.pricing?.daily ?? 0}
                              onChange={handlePricingChange}
                              min="0"
                              required
                            />
                          </div>
                          <div className="input-wrapper">
                            <label htmlFor="weekly">Weekly ($)</label>
                            <input
                              type="number"
                              id="weekly"
                              name="weekly"
                              value={editedProfile.pricing?.weekly ?? 0}
                              onChange={handlePricingChange}
                              min="0"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <h4>Contact Information</h4>
                        <p className="form-hint">Travelers will use these to contact you</p>
                        <div className="contact-inputs">
                          <div className="input-wrapper">
                            <label htmlFor="email">Email*</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={editedProfile.contact?.email ?? ''}
                              onChange={handleContactChange}
                              required
                            />
                          </div>
                          <div className="input-wrapper">
                            <label htmlFor="phone">Phone number</label>
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              value={editedProfile.contact?.phone ?? ''}
                              onChange={handleContactChange}
                            />
                          </div>
                          <div className="input-wrapper">
                            <label htmlFor="instagram">Instagram</label>
                            <input
                              type="text"
                              id="instagram"
                              name="instagram"
                              value={editedProfile.contact?.instagram ?? ''}
                              onChange={handleContactChange}
                              placeholder="@username"
                            />
                          </div>
                          <div className="input-wrapper">
                            <label htmlFor="facebook">Facebook</label>
                            <input
                              type="text"
                              id="facebook"
                              name="facebook"
                              value={editedProfile.contact?.facebook ?? ''}
                              onChange={handleContactChange}
                              placeholder="username or profile URL"
                            />
                          </div>
                          <div className="input-wrapper">
                            <label htmlFor="linkedin">LinkedIn</label>
                            <input
                              type="text"
                              id="linkedin"
                              name="linkedin"
                              value={editedProfile.contact?.linkedin ?? ''}
                              onChange={handleContactChange}
                              placeholder="in/username or company/name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-actions">
                        <button
                          type="submit"
                          className="save-button"
                          disabled={!profileComplete && !editedProfile.profileImage}
                        >
                          {profileComplete ? 'Save Profile' : 'Complete Profile'}
                        </button>
                        {profileComplete && (
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
                        )}
                      </div>
                    </form>
                  )}
                </section>
              )}
              {activeTab === 'availability' && profileComplete && (
                <section className="availability-section">
                  <div className="section-header">
                    <h2>Manage Availability</h2>
                  </div>
                  
                  <div className="availability-info">
                    <p>Travelers will contact you directly via your provided contact information to check availability and book your services.</p>
                    <p>Keep your calendar updated to avoid scheduling conflicts.</p>
                  </div>

                  <form className="availability-form" onSubmit={handleAvailabilitySubmit}>
                    <div className="form-group">
                      <h4>Add New Availability Period</h4>
                      <div className="availability-inputs">
                        <div className="input-wrapper">
                          <label htmlFor="startDate">Start Date</label>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={newAvailability.startDate}
                            onChange={handleAvailabilityChange}
                            required
                          />
                        </div>
                        <div className="input-wrapper">
                          <label htmlFor="endDate">End Date</label>
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={newAvailability.endDate}
                            onChange={handleAvailabilityChange}
                            required
                          />
                        </div>
                        <div className="input-wrapper">
                          <label htmlFor="status">Status</label>
                          <select
                            id="status"
                            name="status"
                            value={newAvailability.status}
                            onChange={handleAvailabilityChange}
                          >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="save-button">
                        Add Availability
                      </button>
                    </div>
                  </form>

                  <div className="availability-list">
                    <h4>Your Availability</h4>
                    {availability.length > 0 ? (
                      <ul className="availability-items">
                        {availability.map((period, index) => (
                          <li key={index} className={`availability-item ${period.status}`}>
                            <span className="period">
                              {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
                            </span>
                            <span className={`status ${period.status}`}>
                              {period.status.charAt(0).toUpperCase() + period.status.slice(1)}
                            </span>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteAvailability(period._id)}
                            >
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No availability periods set yet.</p>
                    )}
                  </div>
                </section>
              )}
              {activeTab === 'reviews' && profileComplete && (
                <section className="reviews-section">
                  <div className="section-header">
                    <h2>Reviews & Ratings</h2>
                  </div>
                  {reviews.length > 0 ? (
                    <>
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
                    </>
                  ) : (
                    <div className="no-reviews">
                      <p>You don't have any reviews yet.</p>
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </>
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 Guidedai. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GuideDashboard;