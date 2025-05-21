// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/config';
// import '../styles/ItineraryForm.css';

// const ItineraryForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     numberOfTravelers: 1,
//     departureDate: '',
//     returnDate: '',
//     tourName: '',
//     descriptionItinerary: '',
//     tripTypes: {
//       natureAdventure: false,
//       cultureHistory: false,
//       foodCulinary: false,
//       wildlifeSafari: false,
//       relaxationWellness: false,
//       religiousSpiritual: false,
//       others: '',
//     },
//     budget: '',
//     currency: 'USD',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const CONVERSION_RATE = 134;
//   const getConvertedBudget = () => {
//     if (formData.currency === 'USD') {
//       return formData.budget;
//     }
//     return (parseFloat(formData.budget) / CONVERSION_RATE).toFixed(2);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Traveler Information
//     if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'This field is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'This field is required';
//     } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
//     }
//     if (formData.numberOfTravelers < 1) {
//       newErrors.numberOfTravelers = 'Group size must be at least 1';
//     }

//     // Travel Dates
//     if (!formData.departureDate) {
//       newErrors.departureDate = 'This field is required';
//     } else {
//       const departure = new Date(formData.departureDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (departure < today) {
//         newErrors.departureDate = 'Departure date cannot be in the past';
//       }
//     }
//     if (!formData.returnDate) {
//       newErrors.returnDate = 'This field is required';
//     } else if (formData.departureDate && formData.returnDate) {
//       const departure = new Date(formData.departureDate);
//       const returnDate = new Date(formData.returnDate);
//       if (returnDate <= departure) {
//         newErrors.returnDate = 'Return date must be after departure date';
//       }
//     }

//     // Destination Preferences
//     if (!formData.tourName.trim()) newErrors.tourName = 'This field is required';
//     if (!formData.descriptionItinerary.trim()) newErrors.descriptionItinerary = 'This field is required';

//     // Trip Type / Interests
//     const tripTypesSelected = Object.values(formData.tripTypes).some(
//       (value) => value === true || (typeof value === 'string' && value.trim() !== '')
//     );
//     if (!tripTypesSelected) {
//       newErrors.tripTypes = 'Please select at least one trip type or specify others';
//     }

//     // Budget
//     if (!formData.budget) {
//       newErrors.budget = 'This field is required';
//     } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
//       newErrors.budget = 'Budget must be a positive number';
//     }

//     console.log('Validation Errors:', newErrors);
//     return newErrors;
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let updatedFormData = { ...formData };

//     if (name.startsWith('tripTypes')) {
//       const field = name.split('.')[1];
//       updatedFormData = {
//         ...formData,
//         tripTypes: { ...formData.tripTypes, [field]: type === 'checkbox' ? checked : value },
//       };
//     } else if (name === 'currency') {
//       updatedFormData = { ...formData, currency: value };
//     } else {
//       updatedFormData = { ...formData, [name]: value };
//     }

//     setFormData(updatedFormData);

//     // Clear error for the field being edited
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       if (name.startsWith('tripTypes')) {
//         delete newErrors.tripTypes;
//       } else {
//         delete newErrors[name];
//       }
//       return newErrors;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       console.log('Errors set:', validationErrors);
//       return;
//     }

//     setLoading(true);
//     setErrors({});
//     setSuccess(false);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Authentication token not found');

//       const payload = {
//         ...formData,
//         budget: formData.currency === 'NRP' ? getConvertedBudget() : formData.budget,
//         currency: 'USD',
//       };

//       console.log('Submitting payload:', payload);

//       const res = await fetch(`${BASE_URL}/itineraries`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//         credentials: 'include',
//       });

//       const result = await res.json();
//       console.log('Response:', result);

//       if (res.ok) {
//         setSuccess(true);
//         // Reset the form after successful submission
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           numberOfTravelers: 1,
//           departureDate: '',
//           returnDate: '',
//           tourName: '',
//           descriptionItinerary: '',
//           tripTypes: {
//             natureAdventure: false,
//             cultureHistory: false,
//             foodCulinary: false,
//             wildlifeSafari: false,
//             relaxationWellness: false,
//             religiousSpiritual: false,
//             others: '',
//           },
//           budget: '',
//           currency: 'USD',
//         });
//       } else {
//         setErrors({ submit: result.message || 'Failed to submit itinerary' });
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       setErrors({ submit: err.message || 'Error submitting itinerary' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate('/about');
//   };

//   return (
//     <div className="itinerary-container">
//       <h1>Customize Your Nepal Itinerary</h1>
//       <form onSubmit={handleSubmit} className="itinerary-form">
//         {errors.submit && <div className="alert error">{errors.submit}</div>}
//         {success && (
//           <div className="alert success">
//             ✅ Itinerary has been created successfully! You can submit another itinerary below.
//           </div>
//         )}

//         {/* Traveler Information */}
//         <div className="form-section">
//           <h2>Traveler Information</h2>
//           <div className="form-group">
//             <label htmlFor="fullName">
//               Full Name <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.fullName}
//               aria-describedby={errors.fullName ? 'fullName-error' : undefined}
//             />
//             {errors.fullName && <span id="fullName-error" className="error-text">{errors.fullName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">
//               Email <span className="required">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.email}
//               aria-describedby={errors.email ? 'email-error' : undefined}
//             />
//             {errors.email && <span id="email-error" className="error-text">{errors.email}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">
//               Phone <span className="required">*</span>
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.phone}
//               aria-describedby={errors.phone ? 'phone-error' : undefined}
//             />
//             {errors.phone && <span id="phone-error" className="error-text">{errors.phone}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="numberOfTravelers">
//               Group-size <span className="required">*</span>
//             </label>
//             <input
//               type="number"
//               id="numberOfTravelers"
//               name="numberOfTravelers"
//               placeholder="e.g., 1"
//               value={formData.numberOfTravelers}
//               onChange={handleInputChange}
//               min="1"
//               required
//               aria-invalid={!!errors.numberOfTravelers}
//               aria-describedby={errors.numberOfTravelers ? 'numberOfTravelers-error' : undefined}
//             />
//             {errors.numberOfTravelers && (
//               <span id="numberOfTravelers-error" className="error-text">{errors.numberOfTravelers}</span>
//             )}
//           </div>
//         </div>

//         {/* Travel Dates */}
//         <div className="form-section">
//           <h2>Travel Dates</h2>
//           <div className="form-group">
//             <label htmlFor="departureDate">
//               Departure Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="departureDate"
//               name="departureDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.departureDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.departureDate}
//               aria-describedby={errors.departureDate ? 'departureDate-error' : undefined}
//             />
//             {errors.departureDate && (
//               <span id="departureDate-error" className="error-text">{errors.departureDate}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="returnDate">
//               Return Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="returnDate"
//               name="returnDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.returnDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.returnDate}
//               aria-describedby={errors.returnDate ? 'returnDate-error' : undefined}
//             />
//             {errors.returnDate && <span id="returnDate-error" className="error-text">{errors.returnDate}</span>}
//           </div>
//         </div>

//         {/* Destination Preferences */}
//         <div className="form-section">
//           <h2>Destination Preferences</h2>
//           <div className="form-group">
//             <label htmlFor="tourName">
//               Name of Tour <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="tourName"
//               name="tourName"
//               placeholder="Enter the name of your tour"
//               value={formData.tourName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.tourName}
//               aria-describedby={errors.tourName ? 'tourName-error' : undefined}
//             />
//             {errors.tourName && <span id="tourName-error" className="error-text">{errors.tourName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="descriptionItinerary">
//               Description and Itinerary <span className="required">*</span>
//             </label>
//             <textarea
//               id="descriptionItinerary"
//               name="descriptionItinerary"
//               placeholder="Provide a brief description and itinerary"
//               value={formData.descriptionItinerary}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.descriptionItinerary}
//               aria-describedby={errors.descriptionItinerary ? 'descriptionItinerary-error' : undefined}
//             />
//             {errors.descriptionItinerary && (
//               <span id="descriptionItinerary-error" className="error-text">{errors.descriptionItinerary}</span>
//             )}
//           </div>
//         </div>

//         {/* Trip Type / Interests */}
//         <div className="form-section">
//           <h2>Trip Type / Interests</h2>
//           {errors.tripTypes && <span className="error-text">{errors.tripTypes}</span>}
//           <div className="checkbox-group">
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.natureAdventure"
//                 checked={formData.tripTypes.natureAdventure}
//                 onChange={handleInputChange}
//               />
//               Nature & Adventure
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.cultureHistory"
//                 checked={formData.tripTypes.cultureHistory}
//                 onChange={handleInputChange}
//               />
//               Culture & History
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.foodCulinary"
//                 checked={formData.tripTypes.foodCulinary}
//                 onChange={handleInputChange}
//               />
//               Food & Culinary
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.wildlifeSafari"
//                 checked={formData.tripTypes.wildlifeSafari}
//                 onChange={handleInputChange}
//               />
//               Wildlife & Safari
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.relaxationWellness"
//                 checked={formData.tripTypes.relaxationWellness}
//                 onChange={handleInputChange}
//               />
//               Relaxation / Wellness
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.religiousSpiritual"
//                 checked={formData.tripTypes.religiousSpiritual}
//                 onChange={handleInputChange}
//               />
//               Religious / Spiritual
//             </label>
//             <div className="form-group">
//               <label htmlFor="tripTypes.others">Others</label>
//               <input
//                 type="text"
//                 id="tripTypes.others"
//                 name="tripTypes.others"
//                 placeholder="Specify other interests"
//                 value={formData.tripTypes.others}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Budget */}
//         <div className="form-section">
//           <h2>Budget</h2>
//           <div className="form-group budget-group">
//             <label htmlFor="budget">
//               Total Budget <span className="required">*</span>
//             </label>
//             <div className="budget-input-wrapper">
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleInputChange}
//                 className="currency-select"
//               >
//                 <option value="USD">USD</option>
//                 <option value="NRP">NRP</option>
//               </select>
//               <input
//                 type="number"
//                 id="budget"
//                 name="budget"
//                 placeholder={`e.g., ${formData.currency === 'USD' ? '1000' : '134000'}`}
//                 value={formData.budget}
//                 onChange={handleInputChange}
//                 required
//                 step="0.01"
//                 min="0"
//                 aria-invalid={!!errors.budget}
//                 aria-describedby={errors.budget ? 'budget-error' : undefined}
//               />
//             </div>
//             {formData.budget && !errors.budget && (
//               <p className="budget-conversion">
//                 {formData.currency === 'USD'
//                   ? `${(parseFloat(formData.budget) * CONVERSION_RATE).toFixed(2)} NRP`
//                   : `${getConvertedBudget()} USD`}
//               </p>
//             )}
//             {errors.budget && <span id="budget-error" className="error-text">{errors.budget}</span>}
//           </div>
//         </div>

//         {/* Review & Submit */}
//         <div className="form-section">
//           <h2>Review Your Itinerary</h2>
//           <div className="review-section">
//             <p><strong>Traveler:</strong> {formData.fullName}</p>
//             <p><strong>Contact:</strong> {formData.email}, {formData.phone}</p>
//             <p><strong>Group-size:</strong> {formData.numberOfTravelers}</p>
//             <p><strong>Dates:</strong> {formData.departureDate} to {formData.returnDate}</p>
//             <p><strong>Tour:</strong> {formData.tourName}</p>
//             <p><strong>Description and Itinerary:</strong> {formData.descriptionItinerary}</p>
//             <p>
//               <strong>Interests:</strong>{' '}
//               {Object.keys(formData.tripTypes)
//                 .filter((key) => formData.tripTypes[key] && key !== 'others')
//                 .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
//                 .join(', ')}
//               {formData.tripTypes.others ? `, ${formData.tripTypes.others}` : ''}
//             </p>
//             <p><strong>Budget:</strong> {formData.budget} {formData.currency}</p>
//           </div>
//           <div className="button-group">
//             <button type="button" className="back-button" onClick={handleBack}>
//               Back
//             </button>
//             <button type="submit" className="submit-button" disabled={loading}>
//               {loading ? <span className="spinner">🔄</span> : 'Submit Itinerary'}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ItineraryForm;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/config';
// import '../styles/ItineraryForm.css';

// const ItineraryForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     numberOfTravelers: 1,
//     departureDate: '',
//     returnDate: '',
//     tourName: '',
//     descriptionItinerary: '',
//     tripTypes: {
//       natureAdventure: false,
//       cultureHistory: false,
//       foodCulinary: false,
//       wildlifeSafari: false,
//       relaxationWellness: false,
//       religiousSpiritual: false,
//       others: '',
//     },
//     budget: '',
//     currency: 'USD',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [/*success*/, setSuccess] = useState(false);
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false); // New state for success dialog
//   const [userId, setUserId] = useState(null); // To store userId for redirection

//   const CONVERSION_RATE = 134;
//   const getConvertedBudget = () => {
//     if (formData.currency === 'USD') {
//       return formData.budget;
//     }
//     return (parseFloat(formData.budget) / CONVERSION_RATE).toFixed(2);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Traveler Information
//     if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'This field is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'This field is required';
//     } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
//     }
//     if (formData.numberOfTravelers < 1) {
//       newErrors.numberOfTravelers = 'Group size must be at least 1';
//     }

//     // Travel Dates
//     if (!formData.departureDate) {
//       newErrors.departureDate = 'This field is required';
//     } else {
//       const departure = new Date(formData.departureDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (departure < today) {
//         newErrors.departureDate = 'Departure date cannot be in the past';
//       }
//     }
//     if (!formData.returnDate) {
//       newErrors.returnDate = 'This field is required';
//     } else if (formData.departureDate && formData.returnDate) {
//       const departure = new Date(formData.departureDate);
//       const returnDate = new Date(formData.returnDate);
//       if (returnDate <= departure) {
//         newErrors.returnDate = 'Return date must be after departure date';
//       }
//     }

//     // Destination Preferences
//     if (!formData.tourName.trim()) newErrors.tourName = 'This field is required';
//     if (!formData.descriptionItinerary.trim()) newErrors.descriptionItinerary = 'This field is required';

//     // Trip Type / Interests
//     const tripTypesSelected = Object.values(formData.tripTypes).some(
//       (value) => value === true || (typeof value === 'string' && value.trim() !== '')
//     );
//     if (!tripTypesSelected) {
//       newErrors.tripTypes = 'Please select at least one trip type or specify others';
//     }

//     // Budget
//     if (!formData.budget) {
//       newErrors.budget = 'This field is required';
//     } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
//       newErrors.budget = 'Budget must be a positive number';
//     }

//     console.log('Validation Errors:', newErrors);
//     return newErrors;
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let updatedFormData = { ...formData };

//     if (name.startsWith('tripTypes')) {
//       const field = name.split('.')[1];
//       updatedFormData = {
//         ...formData,
//         tripTypes: { ...formData.tripTypes, [field]: type === 'checkbox' ? checked : value },
//       };
//     } else if (name === 'currency') {
//       updatedFormData = { ...formData, currency: value };
//     } else {
//       updatedFormData = { ...formData, [name]: value };
//     }

//     setFormData(updatedFormData);

//     // Clear error for the field being edited
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       if (name.startsWith('tripTypes')) {
//         delete newErrors.tripTypes;
//       } else {
//         delete newErrors[name];
//       }
//       return newErrors;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       console.log('Errors set:', validationErrors);
//       return;
//     }

//     setLoading(true);
//     setErrors({});
//     setSuccess(false);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Authentication token not found');

//       const payload = {
//         ...formData,
//         budget: formData.currency === 'NRP' ? getConvertedBudget() : formData.budget,
//         currency: formData.currency, // Store the original currency
//       };

//       console.log('Submitting payload:', payload);

//       const res = await fetch(`${BASE_URL}/itineraries`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//         credentials: 'include',
//       });

//       const result = await res.json();
//       console.log('Response:', result);

//       if (res.ok) {
//         setSuccess(true);
//         setShowSuccessDialog(true); // Show the success dialog
//         setUserId(result.itinerary.userId); // Store userId for redirection
//         // Reset the form after successful submission
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           numberOfTravelers: 1,
//           departureDate: '',
//           returnDate: '',
//           tourName: '',
//           descriptionItinerary: '',
//           tripTypes: {
//             natureAdventure: false,
//             cultureHistory: false,
//             foodCulinary: false,
//             wildlifeSafari: false,
//             relaxationWellness: false,
//             religiousSpiritual: false,
//             others: '',
//           },
//           budget: '',
//           currency: 'USD',
//         });
//       } else {
//         setErrors({ submit: result.message || 'Failed to submit itinerary' });
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       setErrors({ submit: err.message || 'Error submitting itinerary' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate('/about');
//   };

//   const handleViewItineraries = () => {
//     if (userId) {
//       navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
//     }
//   };

//   const handleCloseSuccessDialog = () => {
//     setShowSuccessDialog(false);
//     setSuccess(false);
//   };

//   return (
//     <div className="itinerary-container">
//       <h1>Customize Your Nepal Itinerary</h1>
//       <form onSubmit={handleSubmit} className="itinerary-form">
//         {errors.submit && <div className="alert error">{errors.submit}</div>}

//         {/* Traveler Information */}
//         <div className="form-section">
//           <h2>Traveler Information</h2>
//           <div className="form-group">
//             <label htmlFor="fullName">
//               Full Name <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.fullName}
//               aria-describedby={errors.fullName ? 'fullName-error' : undefined}
//             />
//             {errors.fullName && <span id="fullName-error" className="error-text">{errors.fullName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">
//               Email <span className="required">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.email}
//               aria-describedby={errors.email ? 'email-error' : undefined}
//             />
//             {errors.email && <span id="email-error" className="error-text">{errors.email}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">
//               Phone <span className="required">*</span>
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.phone}
//               aria-describedby={errors.phone ? 'phone-error' : undefined}
//             />
//             {errors.phone && <span id="phone-error" className="error-text">{errors.phone}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="numberOfTravelers">
//               Group-size <span className="required">*</span>
//             </label>
//             <input
//               type="number"
//               id="numberOfTravelers"
//               name="numberOfTravelers"
//               placeholder="e.g., 1"
//               value={formData.numberOfTravelers}
//               onChange={handleInputChange}
//               min="1"
//               required
//               aria-invalid={!!errors.numberOfTravelers}
//               aria-describedby={errors.numberOfTravelers ? 'numberOfTravelers-error' : undefined}
//             />
//             {errors.numberOfTravelers && (
//               <span id="numberOfTravelers-error" className="error-text">{errors.numberOfTravelers}</span>
//             )}
//           </div>
//         </div>

//         {/* Travel Dates */}
//         <div className="form-section">
//           <h2>Travel Dates</h2>
//           <div className="form-group">
//             <label htmlFor="departureDate">
//               Departure Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="departureDate"
//               name="departureDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.departureDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.departureDate}
//               aria-describedby={errors.departureDate ? 'departureDate-error' : undefined}
//             />
//             {errors.departureDate && (
//               <span id="departureDate-error" className="error-text">{errors.departureDate}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="returnDate">
//               Return Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="returnDate"
//               name="returnDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.returnDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.returnDate}
//               aria-describedby={errors.returnDate ? 'returnDate-error' : undefined}
//             />
//             {errors.returnDate && <span id="returnDate-error" className="error-text">{errors.returnDate}</span>}
//           </div>
//         </div>

//         {/* Destination Preferences */}
//         <div className="form-section">
//           <h2>Destination Preferences</h2>
//           <div className="form-group">
//             <label htmlFor="tourName">
//               Name of Tour <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="tourName"
//               name="tourName"
//               placeholder="Enter the name of your tour"
//               value={formData.tourName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.tourName}
//               aria-describedby={errors.tourName ? 'tourName-error' : undefined}
//             />
//             {errors.tourName && <span id="tourName-error" className="error-text">{errors.tourName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="descriptionItinerary">
//               Description and Itinerary <span className="required">*</span>
//             </label>
//             <textarea
//               id="descriptionItinerary"
//               name="descriptionItinerary"
//               placeholder="Provide a brief description and itinerary"
//               value={formData.descriptionItinerary}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.descriptionItinerary}
//               aria-describedby={errors.descriptionItinerary ? 'descriptionItinerary-error' : undefined}
//             />
//             {errors.descriptionItinerary && (
//               <span id="descriptionItinerary-error" className="error-text">{errors.descriptionItinerary}</span>
//             )}
//           </div>
//         </div>

//         {/* Trip Type / Interests */}
//         <div className="form-section">
//           <h2>Trip Type / Interests</h2>
//           {errors.tripTypes && <span className="error-text">{errors.tripTypes}</span>}
//           <div className="checkbox-group">
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.natureAdventure"
//                 checked={formData.tripTypes.natureAdventure}
//                 onChange={handleInputChange}
//               />
//               Nature & Adventure
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.cultureHistory"
//                 checked={formData.tripTypes.cultureHistory}
//                 onChange={handleInputChange}
//               />
//               Culture & History
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.foodCulinary"
//                 checked={formData.tripTypes.foodCulinary}
//                 onChange={handleInputChange}
//               />
//               Food & Culinary
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.wildlifeSafari"
//                 checked={formData.tripTypes.wildlifeSafari}
//                 onChange={handleInputChange}
//               />
//               Wildlife & Safari
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.relaxationWellness"
//                 checked={formData.tripTypes.relaxationWellness}
//                 onChange={handleInputChange}
//               />
//               Relaxation / Wellness
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.religiousSpiritual"
//                 checked={formData.tripTypes.religiousSpiritual}
//                 onChange={handleInputChange}
//               />
//               Religious / Spiritual
//             </label>
//             <div className="form-group">
//               <label htmlFor="tripTypes.others">Others</label>
//               <input
//                 type="text"
//                 id="tripTypes.others"
//                 name="tripTypes.others"
//                 placeholder="Specify other interests"
//                 value={formData.tripTypes.others}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Budget */}
//         <div className="form-section">
//           <h2>Budget</h2>
//           <div className="form-group budget-group">
//             <label htmlFor="budget">
//               Total Budget <span className="required">*</span>
//             </label>
//             <div className="budget-input-wrapper">
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleInputChange}
//                 className="currency-select"
//               >
//                 <option value="USD">USD</option>
//                 <option value="NRP">NRP</option>
//               </select>
//               <input
//                 type="number"
//                 id="budget"
//                 name="budget"
//                 placeholder={`e.g., ${formData.currency === 'USD' ? '1000' : '134000'}`}
//                 value={formData.budget}
//                 onChange={handleInputChange}
//                 required
//                 step="0.01"
//                 min="0"
//                 aria-invalid={!!errors.budget}
//                 aria-describedby={errors.budget ? 'budget-error' : undefined}
//               />
//             </div>
//             {formData.budget && !errors.budget && (
//               <p className="budget-conversion">
//                 {formData.currency === 'USD'
//                   ? `${(parseFloat(formData.budget) * CONVERSION_RATE).toFixed(2)} NRP`
//                   : `${getConvertedBudget()} USD`}
//               </p>
//             )}
//             {errors.budget && <span id="budget-error" className="error-text">{errors.budget}</span>}
//           </div>
//         </div>

//         {/* Review & Submit */}
//         <div className="form-section">
//           <h2>Review Your Itinerary</h2>
//           <div className="review-section">
//             <p><strong>Traveler:</strong> {formData.fullName}</p>
//             <p><strong>Contact:</strong> {formData.email}, {formData.phone}</p>
//             <p><strong>Group-size:</strong> {formData.numberOfTravelers}</p>
//             <p><strong>Dates:</strong> {formData.departureDate} to {formData.returnDate}</p>
//             <p><strong>Tour:</strong> {formData.tourName}</p>
//             <p><strong>Description and Itinerary:</strong> {formData.descriptionItinerary}</p>
//             <p>
//               <strong>Interests:</strong>{' '}
//               {Object.keys(formData.tripTypes)
//                 .filter((key) => formData.tripTypes[key] && key !== 'others')
//                 .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
//                 .join(', ')}
//               {formData.tripTypes.others ? `, ${formData.tripTypes.others}` : ''}
//             </p>
//             <p><strong>Budget:</strong> {formData.budget} {formData.currency}</p>
//           </div>
//           <div className="button-group">
//             <button type="button" className="back-button" onClick={handleBack}>
//               Back
//             </button>
//             <button type="submit" className="submit-button" disabled={loading}>
//               {loading ? <span className="spinner">🔄</span> : 'Submit Itinerary'}
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Success Dialog */}
//       {showSuccessDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <div className="dialog-header">
//               <h3>Itinerary Created</h3>
//               <button className="close-button" onClick={handleCloseSuccessDialog}>❌</button>
//             </div>
//             <div className="dialog-content">
//               <div className="alert success">
//                 ✅ Itinerary "{formData.tourName}" has been created successfully!
//               </div>
//               <p>Would you like to view your itinerary history, or continue creating another itinerary?</p>
//             </div>
//             <div className="dialog-footer">
//               <button className="dialog-button cancel" onClick={handleCloseSuccessDialog}>
//                 Create Another
//               </button>
//               <button className="dialog-button confirm" onClick={handleViewItineraries}>
//                 View Itineraries
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryForm;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/config';
// import '../styles/ItineraryForm.css';

// const ItineraryForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     numberOfTravelers: 1,
//     departureDate: '',
//     returnDate: '',
//     tourName: '',
//     descriptionItinerary: '',
//     tripTypes: {
//       natureAdventure: false,
//       cultureHistory: false,
//       foodCulinary: false,
//       wildlifeSafari: false,
//       relaxationWellness: false,
//       religiousSpiritual: false,
//       others: '',
//     },
//     budget: '',
//     currency: 'USD',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [/*success*/, setSuccess] = useState(false);
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [userId, setUserId] = useState(null);

//   const CONVERSION_RATE = 134;

//   const validateForm = () => {
//     const newErrors = {};

//     // Traveler Information
//     if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'This field is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'This field is required';
//     } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
//     }
//     if (formData.numberOfTravelers < 1) {
//       newErrors.numberOfTravelers = 'Group size must be at least 1';
//     }

//     // Travel Dates
//     if (!formData.departureDate) {
//       newErrors.departureDate = 'This field is required';
//     } else {
//       const departure = new Date(formData.departureDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (departure < today) {
//         newErrors.departureDate = 'Departure date cannot be in the past';
//       }
//     }
//     if (!formData.returnDate) {
//       newErrors.returnDate = 'This field is required';
//     } else if (formData.departureDate && formData.returnDate) {
//       const departure = new Date(formData.departureDate);
//       const returnDate = new Date(formData.returnDate);
//       if (returnDate <= departure) {
//         newErrors.returnDate = 'Return date must be after departure date';
//       }
//     }

//     // Destination Preferences
//     if (!formData.tourName.trim()) newErrors.tourName = 'This field is required';
//     if (!formData.descriptionItinerary.trim()) newErrors.descriptionItinerary = 'This field is required';

//     // Trip Type / Interests
//     const tripTypesSelected = Object.values(formData.tripTypes).some(
//       (value) => value === true || (typeof value === 'string' && value.trim() !== '')
//     );
//     if (!tripTypesSelected) {
//       newErrors.tripTypes = 'Please select at least one trip type or specify others';
//     }

//     // Budget
//     if (!formData.budget) {
//       newErrors.budget = 'This field is required';
//     } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
//       newErrors.budget = 'Budget must be a positive number';
//     }

//     console.log('Validation Errors:', newErrors);
//     return newErrors;
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let updatedFormData = { ...formData };

//     if (name.startsWith('tripTypes')) {
//       const field = name.split('.')[1];
//       updatedFormData = {
//         ...formData,
//         tripTypes: { ...formData.tripTypes, [field]: type === 'checkbox' ? checked : value },
//       };
//     } else if (name === 'currency') {
//       updatedFormData = { ...formData, currency: value };
//     } else {
//       updatedFormData = { ...formData, [name]: value };
//     }

//     setFormData(updatedFormData);

//     // Clear error for the field being edited
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       if (name.startsWith('tripTypes')) {
//         delete newErrors.tripTypes;
//       } else {
//         delete newErrors[name];
//       }
//       return newErrors;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       console.log('Errors set:', validationErrors);
//       return;
//     }

//     setLoading(true);
//     setErrors({});
//     setSuccess(false);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Authentication token not found');

//       const payload = {
//         ...formData,
//         budget: parseFloat(formData.budget), // Send the budget as entered, without conversion
//         currency: formData.currency,
//       };

//       console.log('Submitting payload:', payload);

//       const res = await fetch(`${BASE_URL}/itineraries`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//         credentials: 'include',
//       });

//       const result = await res.json();
//       console.log('Response:', result);

//       if (res.ok) {
//         setSuccess(true);
//         setShowSuccessDialog(true);
//         setUserId(result.itinerary.userId);
//         // Reset the form after successful submission
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           numberOfTravelers: 1,
//           departureDate: '',
//           returnDate: '',
//           tourName: '',
//           descriptionItinerary: '',
//           tripTypes: {
//             natureAdventure: false,
//             cultureHistory: false,
//             foodCulinary: false,
//             wildlifeSafari: false,
//             relaxationWellness: false,
//             religiousSpiritual: false,
//             others: '',
//           },
//           budget: '',
//           currency: 'USD',
//         });
//       } else {
//         setErrors({ submit: result.message || 'Failed to submit itinerary' });
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       setErrors({ submit: err.message || 'Error submitting itinerary' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate('/about');
//   };

//   const handleViewItineraries = () => {
//     if (userId) {
//       navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
//     }
//   };

//   const handleCloseSuccessDialog = () => {
//     setShowSuccessDialog(false);
//     setSuccess(false);
//   };

//   return (
//     <div className="itinerary-container">
//       <h1>Customize Your Nepal Itinerary</h1>
//       <form onSubmit={handleSubmit} className="itinerary-form">
//         {errors.submit && <div className="alert error">{errors.submit}</div>}

//         {/* Traveler Information */}
//         <div className="form-section">
//           <h2>Traveler Information</h2>
//           <div className="form-group">
//             <label htmlFor="fullName">
//               Full Name <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.fullName}
//               aria-describedby={errors.fullName ? 'fullName-error' : undefined}
//             />
//             {errors.fullName && <span id="fullName-error" className="error-text">{errors.fullName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">
//               Email <span className="required">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.email}
//               aria-describedby={errors.email ? 'email-error' : undefined}
//             />
//             {errors.email && <span id="email-error" className="error-text">{errors.email}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">
//               Phone <span className="required">*</span>
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.phone}
//               aria-describedby={errors.phone ? 'phone-error' : undefined}
//             />
//             {errors.phone && <span id="phone-error" className="error-text">{errors.phone}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="numberOfTravelers">
//               Group-size <span className="required">*</span>
//             </label>
//             <input
//               type="number"
//               id="numberOfTravelers"
//               name="numberOfTravelers"
//               placeholder="e.g., 1"
//               value={formData.numberOfTravelers}
//               onChange={handleInputChange}
//               min="1"
//               required
//               aria-invalid={!!errors.numberOfTravelers}
//               aria-describedby={errors.numberOfTravelers ? 'numberOfTravelers-error' : undefined}
//             />
//             {errors.numberOfTravelers && (
//               <span id="numberOfTravelers-error" className="error-text">{errors.numberOfTravelers}</span>
//             )}
//           </div>
//         </div>

//         {/* Travel Dates */}
//         <div className="form-section">
//           <h2>Travel Dates</h2>
//           <div className="form-group">
//             <label htmlFor="departureDate">
//               Departure Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="departureDate"
//               name="departureDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.departureDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.departureDate}
//               aria-describedby={errors.departureDate ? 'departureDate-error' : undefined}
//             />
//             {errors.departureDate && (
//               <span id="departureDate-error" className="error-text">{errors.departureDate}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="returnDate">
//               Return Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="returnDate"
//               name="returnDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.returnDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.returnDate}
//               aria-describedby={errors.returnDate ? 'returnDate-error' : undefined}
//             />
//             {errors.returnDate && <span id="returnDate-error" className="error-text">{errors.returnDate}</span>}
//           </div>
//         </div>

//         {/* Destination Preferences */}
//         <div className="form-section">
//           <h2>Destination Preferences</h2>
//           <div className="form-group">
//             <label htmlFor="tourName">
//               Name of Tour <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="tourName"
//               name="tourName"
//               placeholder="Enter the name of your tour"
//               value={formData.tourName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.tourName}
//               aria-describedby={errors.tourName ? 'tourName-error' : undefined}
//             />
//             {errors.tourName && <span id="tourName-error" className="error-text">{errors.tourName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="descriptionItinerary">
//               Description and Itinerary <span className="required">*</span>
//             </label>
//             <textarea
//               id="descriptionItinerary"
//               name="descriptionItinerary"
//               placeholder="Provide a brief description and itinerary"
//               value={formData.descriptionItinerary}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.descriptionItinerary}
//               aria-describedby={errors.descriptionItinerary ? 'descriptionItinerary-error' : undefined}
//             />
//             {errors.descriptionItinerary && (
//               <span id="descriptionItinerary-error" className="error-text">{errors.descriptionItinerary}</span>
//             )}
//           </div>
//         </div>

//         {/* Trip Type / Interests */}
//         <div className="form-section">
//           <h2>Trip Type / Interests</h2>
//           {errors.tripTypes && <span className="error-text">{errors.tripTypes}</span>}
//           <div className="checkbox-group">
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.natureAdventure"
//                 checked={formData.tripTypes.natureAdventure}
//                 onChange={handleInputChange}
//               />
//               Nature & Adventure
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.cultureHistory"
//                 checked={formData.tripTypes.cultureHistory}
//                 onChange={handleInputChange}
//               />
//               Culture & History
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.foodCulinary"
//                 checked={formData.tripTypes.foodCulinary}
//                 onChange={handleInputChange}
//               />
//               Food & Culinary
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.wildlifeSafari"
//                 checked={formData.tripTypes.wildlifeSafari}
//                 onChange={handleInputChange}
//               />
//               Wildlife & Safari
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.relaxationWellness"
//                 checked={formData.tripTypes.relaxationWellness}
//                 onChange={handleInputChange}
//               />
//               Relaxation / Wellness
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.religiousSpiritual"
//                 checked={formData.tripTypes.religiousSpiritual}
//                 onChange={handleInputChange}
//               />
//               Religious / Spiritual
//             </label>
//             <div className="form-group">
//               <label htmlFor="tripTypes.others">Others</label>
//               <input
//                 type="text"
//                 id="tripTypes.others"
//                 name="tripTypes.others"
//                 placeholder="Specify other interests"
//                 value={formData.tripTypes.others}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Budget */}
//         <div className="form-section">
//           <h2>Budget</h2>
//           <div className="form-group budget-group">
//             <label htmlFor="budget">
//               Total Budget <span className="required">*</span>
//             </label>
//             <div className="budget-input-wrapper">
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleInputChange}
//                 className="currency-select"
//               >
//                 <option value="USD">USD</option>
//                 <option value="NRP">NRP</option>
//               </select>
//               <input
//                 type="number"
//                 id="budget"
//                 name="budget"
//                 placeholder={`e.g., ${formData.currency === 'USD' ? '1000' : '134000'}`}
//                 value={formData.budget}
//                 onChange={handleInputChange}
//                 required
//                 step="0.01"
//                 min="0"
//                 aria-invalid={!!errors.budget}
//                 aria-describedby={errors.budget ? 'budget-error' : undefined}
//               />
//             </div>
//             {formData.budget && !errors.budget && (
//               <p className="budget-conversion">
//                 {formData.currency === 'USD'
//                   ? `${(parseFloat(formData.budget) * CONVERSION_RATE).toFixed(2)} NRP`
//                   : `${(parseFloat(formData.budget) / CONVERSION_RATE).toFixed(2)} USD`}
//               </p>
//             )}
//             {errors.budget && <span id="budget-error" className="error-text">{errors.budget}</span>}
//           </div>
//         </div>

//         {/* Review & Submit */}
//         <div className="form-section">
//           <h2>Review Your Itinerary</h2>
//           <div className="review-section">
//             <p><strong>Traveler:</strong> {formData.fullName}</p>
//             <p><strong>Contact:</strong> {formData.email}, {formData.phone}</p>
//             <p><strong>Group-size:</strong> {formData.numberOfTravelers}</p>
//             <p><strong>Dates:</strong> {formData.departureDate} to {formData.returnDate}</p>
//             <p><strong>Tour:</strong> {formData.tourName}</p>
//             <p><strong>Description and Itinerary:</strong> {formData.descriptionItinerary}</p>
//             <p>
//               <strong>Interests:</strong>{' '}
//               {Object.keys(formData.tripTypes)
//                 .filter((key) => formData.tripTypes[key] && key !== 'others')
//                 .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
//                 .join(', ')}
//               {formData.tripTypes.others ? `, ${formData.tripTypes.others}` : ''}
//             </p>
//             <p><strong>Budget:</strong> {formData.budget} {formData.currency}</p>
//           </div>
//           <div className="button-group">
//             <button type="button" className="back-button" onClick={handleBack}>
//               Back
//             </button>
//             <button type="submit" className="submit-button" disabled={loading}>
//               {loading ? <span className="spinner">🔄</span> : 'Submit Itinerary'}
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Success Dialog */}
//       {showSuccessDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <div className="dialog-header">
//               <h3>Itinerary Created</h3>
//               <button className="close-button" onClick={handleCloseSuccessDialog}>❌</button>
//             </div>
//             <div className="dialog-content">
//               <div className="alert success">
//                 ✅ Itinerary "{formData.tourName}" has been created successfully!
//               </div>
//               <p>Would you like to view your itinerary history, or continue creating another itinerary?</p>
//             </div>
//             <div className="dialog-footer">
//               <button className="dialog-button cancel" onClick={handleCloseSuccessDialog}>
//                 Create Another
//               </button>
//               <button className="dialog-button confirm" onClick={handleViewItineraries}>
//                 View Itineraries
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryForm;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/config';
// import '../styles/ItineraryForm.css';

// const ItineraryForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     numberOfTravelers: 1,
//     departureDate: '',
//     returnDate: '',
//     tourName: '',
//     descriptionItinerary: '',
//     tripTypes: {
//       natureAdventure: false,
//       cultureHistory: false,
//       foodCulinary: false,
//       wildlifeSafari: false,
//       relaxationWellness: false,
//       religiousSpiritual: false,
//       others: '',
//     },
//     budget: '',
//     currency: 'USD',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [/*success*/, setSuccess] = useState(false);
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [userId, setUserId] = useState(null);

//   const CONVERSION_RATE = 134;

//   const validateForm = () => {
//     const newErrors = {};

//     // Traveler Information
//     if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'This field is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'This field is required';
//     } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
//     }
//     if (formData.numberOfTravelers < 1) {
//       newErrors.numberOfTravelers = 'Group size must be at least 1';
//     }

//     // Travel Dates
//     if (!formData.departureDate) {
//       newErrors.departureDate = 'This field is required';
//     } else {
//       const departure = new Date(formData.departureDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (departure < today) {
//         newErrors.departureDate = 'Departure date cannot be in the past';
//       }
//     }
//     if (!formData.returnDate) {
//       newErrors.returnDate = 'This field is required';
//     } else if (formData.departureDate && formData.returnDate) {
//       const departure = new Date(formData.departureDate);
//       const returnDate = new Date(formData.returnDate);
//       if (returnDate <= departure) {
//         newErrors.returnDate = 'Return date must be after departure date';
//       }
//     }

//     // Destination Preferences
//     if (!formData.tourName.trim()) newErrors.tourName = 'This field is required';
//     if (!formData.descriptionItinerary.trim()) newErrors.descriptionItinerary = 'This field is required';

//     // Trip Type / Interests
//     const tripTypesSelected = Object.values(formData.tripTypes).some(
//       (value) => value === true || (typeof value === 'string' && value.trim() !== '')
//     );
//     if (!tripTypesSelected) {
//       newErrors.tripTypes = 'Please select at least one trip type or specify others';
//     }

//     // Budget
//     if (!formData.budget) {
//       newErrors.budget = 'This field is required';
//     } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
//       newErrors.budget = 'Budget must be a positive number';
//     }

//     console.log('Validation Errors:', newErrors);
//     return newErrors;
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let updatedFormData = { ...formData };

//     if (name.startsWith('tripTypes')) {
//       const field = name.split('.')[1];
//       updatedFormData = {
//         ...formData,
//         tripTypes: { ...formData.tripTypes, [field]: type === 'checkbox' ? checked : value },
//       };
//     } else if (name === 'currency') {
//       updatedFormData = { ...formData, currency: value };
//     } else {
//       updatedFormData = { ...formData, [name]: value };
//     }

//     setFormData(updatedFormData);

//     // Clear error for the field being edited
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       if (name.startsWith('tripTypes')) {
//         delete newErrors.tripTypes;
//       } else {
//         delete newErrors[name];
//       }
//       return newErrors;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       console.log('Errors set:', validationErrors);
//       return;
//     }

//     setLoading(true);
//     setErrors({});
//     setSuccess(false);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Authentication token not found');

//       const payload = {
//         ...formData,
//         budget: parseFloat(formData.budget),
//         currency: formData.currency,
//       };

//       console.log('Submitting payload:', payload);

//       const res = await fetch(`${BASE_URL}/itineraries`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//         credentials: 'include',
//       });

//       const result = await res.json();
//       console.log('Response:', result);

//       if (res.ok) {
//         setSuccess(true);
//         setShowSuccessDialog(true);
//         // Safely set userId from the response, assuming it might be at result.data.userId or result.userId
//         setUserId(result.itinerary?.userId || result.data?.userId || result.userId || null);
//         // Reset the form after successful submission
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           numberOfTravelers: 1,
//           departureDate: '',
//           returnDate: '',
//           tourName: '',
//           descriptionItinerary: '',
//           tripTypes: {
//             natureAdventure: false,
//             cultureHistory: false,
//             foodCulinary: false,
//             wildlifeSafari: false,
//             relaxationWellness: false,
//             religiousSpiritual: false,
//             others: '',
//           },
//           budget: '',
//           currency: 'USD',
//         });
//       } else {
//         setErrors({ submit: result.message || 'Failed to submit itinerary' });
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       setErrors({ submit: err.message || 'Error submitting itinerary' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate('/about');
//   };

//   const handleViewItineraries = () => {
//     if (userId) {
//       navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
//     } else {
//       navigate('/TravelerProfile', { state: { activeTab: 2 } });
//     }
//   };

//   const handleCloseSuccessDialog = () => {
//     setShowSuccessDialog(false);
//     setSuccess(false);
//   };

//   return (
//     <div className="itinerary-container">
//       <h1>Customize Your Nepal Itinerary</h1>
//       <form onSubmit={handleSubmit} className="itinerary-form">
//         {errors.submit && <div className="alert error">{errors.submit}</div>}

//         {/* Traveler Information */}
//         <div className="form-section">
//           <h2>Traveler Information</h2>
//           <div className="form-group">
//             <label htmlFor="fullName">
//               Full Name <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.fullName}
//               aria-describedby={errors.fullName ? 'fullName-error' : undefined}
//             />
//             {errors.fullName && <span id="fullName-error" className="error-text">{errors.fullName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">
//               Email <span className="required">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.email}
//               aria-describedby={errors.email ? 'email-error' : undefined}
//             />
//             {errors.email && <span id="email-error" className="error-text">{errors.email}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">
//               Phone <span className="required">*</span>
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.phone}
//               aria-describedby={errors.phone ? 'phone-error' : undefined}
//             />
//             {errors.phone && <span id="phone-error" className="error-text">{errors.phone}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="numberOfTravelers">
//               Group-size <span className="required">*</span>
//             </label>
//             <input
//               type="number"
//               id="numberOfTravelers"
//               name="numberOfTravelers"
//               placeholder="e.g., 1"
//               value={formData.numberOfTravelers}
//               onChange={handleInputChange}
//               min="1"
//               required
//               aria-invalid={!!errors.numberOfTravelers}
//               aria-describedby={errors.numberOfTravelers ? 'numberOfTravelers-error' : undefined}
//             />
//             {errors.numberOfTravelers && (
//               <span id="numberOfTravelers-error" className="error-text">{errors.numberOfTravelers}</span>
//             )}
//           </div>
//         </div>

//         {/* Travel Dates */}
//         <div className="form-section">
//           <h2>Travel Dates</h2>
//           <div className="form-group">
//             <label htmlFor="departureDate">
//               Departure Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="departureDate"
//               name="departureDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.departureDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.departureDate}
//               aria-describedby={errors.departureDate ? 'departureDate-error' : undefined}
//             />
//             {errors.departureDate && (
//               <span id="departureDate-error" className="error-text">{errors.departureDate}</span>
//             )}
//           </div>
//           <div className="form-group">
//             <label htmlFor="returnDate">
//               Return Date <span className="required">*</span>
//             </label>
//             <input
//               type="date"
//               id="returnDate"
//               name="returnDate"
//               placeholder="mm/dd/yyyy"
//               value={formData.returnDate}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.returnDate}
//               aria-describedby={errors.returnDate ? 'returnDate-error' : undefined}
//             />
//             {errors.returnDate && <span id="returnDate-error" className="error-text">{errors.returnDate}</span>}
//           </div>
//         </div>

//         {/* Destination Preferences */}
//         <div className="form-section">
//           <h2>Destination Preferences</h2>
//           <div className="form-group">
//             <label htmlFor="tourName">
//               Name of Tour <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="tourName"
//               name="tourName"
//               placeholder="Enter the name of your tour"
//               value={formData.tourName}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.tourName}
//               aria-describedby={errors.tourName ? 'tourName-error' : undefined}
//             />
//             {errors.tourName && <span id="tourName-error" className="error-text">{errors.tourName}</span>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="descriptionItinerary">
//               Description and Itinerary <span className="required">*</span>
//             </label>
//             <textarea
//               id="descriptionItinerary"
//               name="descriptionItinerary"
//               placeholder="Provide a brief description and itinerary"
//               value={formData.descriptionItinerary}
//               onChange={handleInputChange}
//               required
//               aria-invalid={!!errors.descriptionItinerary}
//               aria-describedby={errors.descriptionItinerary ? 'descriptionItinerary-error' : undefined}
//             />
//             {errors.descriptionItinerary && (
//               <span id="descriptionItinerary-error" className="error-text">{errors.descriptionItinerary}</span>
//             )}
//           </div>
//         </div>

//         {/* Trip Type / Interests */}
//         <div className="form-section">
//           <h2>Trip Type / Interests</h2>
//           {errors.tripTypes && <span className="error-text">{errors.tripTypes}</span>}
//           <div className="checkbox-group">
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.natureAdventure"
//                 checked={formData.tripTypes.natureAdventure}
//                 onChange={handleInputChange}
//               />
//               Nature & Adventure
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.cultureHistory"
//                 checked={formData.tripTypes.cultureHistory}
//                 onChange={handleInputChange}
//               />
//               Culture & History
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.foodCulinary"
//                 checked={formData.tripTypes.foodCulinary}
//                 onChange={handleInputChange}
//               />
//               Food & Culinary
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.wildlifeSafari"
//                 checked={formData.tripTypes.wildlifeSafari}
//                 onChange={handleInputChange}
//               />
//               Wildlife & Safari
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.relaxationWellness"
//                 checked={formData.tripTypes.relaxationWellness}
//                 onChange={handleInputChange}
//               />
//               Relaxation / Wellness
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="tripTypes.religiousSpiritual"
//                 checked={formData.tripTypes.religiousSpiritual}
//                 onChange={handleInputChange}
//               />
//               Religious / Spiritual
//             </label>
//             <div className="form-group">
//               <label htmlFor="tripTypes.others">Others</label>
//               <input
//                 type="text"
//                 id="tripTypes.others"
//                 name="tripTypes.others"
//                 placeholder="Specify other interests"
//                 value={formData.tripTypes.others}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Budget */}
//         <div className="form-section">
//           <h2>Budget</h2>
//           <div className="form-group budget-group">
//             <label htmlFor="budget">
//               Total Budget <span className="required">*</span>
//             </label>
//             <div className="budget-input-wrapper">
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleInputChange}
//                 className="currency-select"
//               >
//                 <option value="USD">USD</option>
//                 <option value="NRP">NRP</option>
//               </select>
//               <input
//                 type="number"
//                 id="budget"
//                 name="budget"
//                 placeholder={`e.g., ${formData.currency === 'USD' ? '1000' : '134000'}`}
//                 value={formData.budget}
//                 onChange={handleInputChange}
//                 required
//                 step="0.01"
//                 min="0"
//                 aria-invalid={!!errors.budget}
//                 aria-describedby={errors.budget ? 'budget-error' : undefined}
//               />
//             </div>
//             {formData.budget && !errors.budget && (
//               <p className="budget-conversion">
//                 {formData.currency === 'USD'
//                   ? `${(parseFloat(formData.budget) * CONVERSION_RATE).toFixed(2)} NRP`
//                   : `${(parseFloat(formData.budget) / CONVERSION_RATE).toFixed(2)} USD`}
//               </p>
//             )}
//             {errors.budget && <span id="budget-error" className="error-text">{errors.budget}</span>}
//           </div>
//         </div>

//         {/* Review & Submit */}
//         <div className="form-section">
//           <h2>Review Your Itinerary</h2>
//           <div className="review-section">
//             <p><strong>Traveler:</strong> {formData.fullName}</p>
//             <p><strong>Contact:</strong> {formData.email}, {formData.phone}</p>
//             <p><strong>Group-size:</strong> {formData.numberOfTravelers}</p>
//             <p><strong>Dates:</strong> {formData.departureDate} to {formData.returnDate}</p>
//             <p><strong>Tour:</strong> {formData.tourName}</p>
//             <p><strong>Description and Itinerary:</strong> {formData.descriptionItinerary}</p>
//             <p>
//               <strong>Interests:</strong>{' '}
//               {Object.keys(formData.tripTypes)
//                 .filter((key) => formData.tripTypes[key] && key !== 'others')
//                 .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
//                 .join(', ')}
//               {formData.tripTypes.others ? `, ${formData.tripTypes.others}` : ''}
//             </p>
//             <p><strong>Budget:</strong> {formData.budget} {formData.currency}</p>
//           </div>
//           <div className="button-group">
//             <button type="button" className="back-button" onClick={handleBack}>
//               Back
//             </button>
//             <button type="submit" className="submit-button" disabled={loading}>
//               {loading ? <span className="spinner">🔄</span> : 'Submit Itinerary'}
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Success Dialog */}
//       {showSuccessDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <div className="dialog-header">
//               <h3>Itinerary Created</h3>
//               <button className="close-button" onClick={handleCloseSuccessDialog}>❌</button>
//             </div>
//             <div className="dialog-content">
//               <div className="alert success">
//                 ✅ Itinerary "{formData.tourName}" has been created successfully!
//               </div>
//               <p>Would you like to view your itinerary history, or continue creating another itinerary?</p>
//             </div>
//             <div className="dialog-footer">
//               <button className="dialog-button cancel" onClick={handleCloseSuccessDialog}>
//                 Create Another
//               </button>
//               <button className="dialog-button confirm" onClick={handleViewItineraries}>
//                 View Itineraries
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryForm;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import '../styles/ItineraryForm.css';

const ItineraryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numberOfTravelers: 1,
    departureDate: '',
    returnDate: '',
    tourName: '',
    descriptionItinerary: '',
    tripTypes: {
      natureAdventure: false,
      cultureHistory: false,
      foodCulinary: false,
      wildlifeSafari: false,
      relaxationWellness: false,
      religiousSpiritual: false,
      others: '',
    },
    budget: '',
    currency: 'USD',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [userId, setUserId] = useState(null);

  const CONVERSION_RATE = 134;

  // Fetch userId from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!token || !user || !user._id) {
      navigate("/login", { state: { message: "Please log in to create an itinerary." } });
    } else {
      setUserId(user._id);
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Traveler Information
    if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'This field is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }
    if (formData.numberOfTravelers < 1) {
      newErrors.numberOfTravelers = 'Group size must be at least 1';
    }

    // Travel Dates
    if (!formData.departureDate) {
      newErrors.departureDate = 'This field is required';
    } else {
      const departure = new Date(formData.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (departure < today) {
        newErrors.departureDate = 'Departure date cannot be in the past';
      }
    }
    if (!formData.returnDate) {
      newErrors.returnDate = 'This field is required';
    } else if (formData.departureDate && formData.returnDate) {
      const departure = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);
      if (returnDate <= departure) {
        newErrors.returnDate = 'Return date must be after departure date';
      }
    }

    // Destination Preferences
    if (!formData.tourName.trim()) newErrors.tourName = 'This field is required';
    if (!formData.descriptionItinerary.trim()) newErrors.descriptionItinerary = 'This field is required';

    // Trip Type / Interests
    const tripTypesSelected = Object.values(formData.tripTypes).some(
      (value) => value === true || (typeof value === 'string' && value.trim() !== '')
    );
    if (!tripTypesSelected) {
      newErrors.tripTypes = 'Please select at least one trip type or specify others';
    }

    // Budget
    if (!formData.budget) {
      newErrors.budget = 'This field is required';
    } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }

    console.log('Validation Errors:', newErrors);
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFormData = { ...formData };

    if (name.startsWith('tripTypes')) {
      const field = name.split('.')[1];
      updatedFormData = {
        ...formData,
        tripTypes: { ...formData.tripTypes, [field]: type === 'checkbox' ? checked : value },
      };
    } else if (name === 'currency') {
      updatedFormData = { ...formData, currency: value };
    } else {
      updatedFormData = { ...formData, [name]: value };
    }

    setFormData(updatedFormData);

    // Clear error for the field being edited
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name.startsWith('tripTypes')) {
        delete newErrors.tripTypes;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log('Errors set:', validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate("/login", { state: { message: "Session expired. Please log in again." } });
        return;
      }

      const payload = {
        ...formData,
        budget: parseFloat(formData.budget),
        currency: formData.currency,
        userId: userId, // Include userId in the payload
      };

      console.log('Submitting payload:', payload);

      const res = await fetch(`${BASE_URL}/itineraries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const result = await res.json();
      console.log('Response:', result);

      if (res.ok) {
        setSuccess(true);
        setShowSuccessDialog(true);
        setUserId(result.itinerary?.userId || result.data?.userId || result.userId || userId);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          numberOfTravelers: 1,
          departureDate: '',
          returnDate: '',
          tourName: '',
          descriptionItinerary: '',
          tripTypes: {
            natureAdventure: false,
            cultureHistory: false,
            foodCulinary: false,
            wildlifeSafari: false,
            relaxationWellness: false,
            religiousSpiritual: false,
            others: '',
          },
          budget: '',
          currency: 'USD',
        });
      } else {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { state: { message: "Session expired. Please log in again." } });
        } else {
          setErrors({ submit: result.message || 'Failed to submit itinerary' });
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ submit: err.message || 'Error submitting itinerary' });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/about');
  };

  const handleViewItineraries = () => {
    if (userId) {
      navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
    } else {
      navigate('/TravelerProfile', { state: { activeTab: 2 } });
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setSuccess(false);
  };

  return (
    <div className="itinerary-container">
      <h1>Customize Your Nepal Itinerary</h1>
      <form onSubmit={handleSubmit} className="itinerary-form">
        {errors.submit && <div className="alert error">{errors.submit}</div>}

        {/* Traveler Information */}
        <div className="form-section">
          <h2>Traveler Information</h2>
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && <span id="fullName-error" className="error-text">{errors.fullName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <span id="email-error" className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">
              Phone <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && <span id="phone-error" className="error-text">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="numberOfTravelers">
              Group-size <span className="required">*</span>
            </label>
            <input
              type="number"
              id="numberOfTravelers"
              name="numberOfTravelers"
              placeholder="e.g., 1"
              value={formData.numberOfTravelers}
              onChange={handleInputChange}
              min="1"
              required
              aria-invalid={!!errors.numberOfTravelers}
              aria-describedby={errors.numberOfTravelers ? 'numberOfTravelers-error' : undefined}
            />
            {errors.numberOfTravelers && (
              <span id="numberOfTravelers-error" className="error-text">{errors.numberOfTravelers}</span>
            )}
          </div>
        </div>

        {/* Travel Dates */}
        <div className="form-section">
          <h2>Travel Dates</h2>
          <div className="form-group">
            <label htmlFor="departureDate">
              Departure Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              placeholder="mm/dd/yyyy"
              value={formData.departureDate}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.departureDate}
              aria-describedby={errors.departureDate ? 'departureDate-error' : undefined}
            />
            {errors.departureDate && (
              <span id="departureDate-error" className="error-text">{errors.departureDate}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="returnDate">
              Return Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              placeholder="mm/dd/yyyy"
              value={formData.returnDate}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.returnDate}
              aria-describedby={errors.returnDate ? 'returnDate-error' : undefined}
            />
            {errors.returnDate && <span id="returnDate-error" className="error-text">{errors.returnDate}</span>}
          </div>
        </div>

        {/* Destination Preferences */}
        <div className="form-section">
          <h2>Destination Preferences</h2>
          <div className="form-group">
            <label htmlFor="tourName">
              Name of Tour <span className="required">*</span>
            </label>
            <input
              type="text"
              id="tourName"
              name="tourName"
              placeholder="Enter the name of your tour"
              value={formData.tourName}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.tourName}
              aria-describedby={errors.tourName ? 'tourName-error' : undefined}
            />
            {errors.tourName && <span id="tourName-error" className="error-text">{errors.tourName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="descriptionItinerary">
              Description and Itinerary <span className="required">*</span>
            </label>
            <textarea
              id="descriptionItinerary"
              name="descriptionItinerary"
              placeholder="Provide a brief description and itinerary"
              value={formData.descriptionItinerary}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.descriptionItinerary}
              aria-describedby={errors.descriptionItinerary ? 'descriptionItinerary-error' : undefined}
            />
            {errors.descriptionItinerary && (
              <span id="descriptionItinerary-error" className="error-text">{errors.descriptionItinerary}</span>
            )}
          </div>
        </div>

        {/* Trip Type / Interests */}
        <div className="form-section">
          <h2>Trip Type / Interests</h2>
          {errors.tripTypes && <span className="error-text">{errors.tripTypes}</span>}
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="tripTypes.natureAdventure"
                checked={formData.tripTypes.natureAdventure}
                onChange={handleInputChange}
              />
              Nature & Adventure
            </label>
            <label>
              <input
                type="checkbox"
                name="tripTypes.cultureHistory"
                checked={formData.tripTypes.cultureHistory}
                onChange={handleInputChange}
              />
              Culture & History
            </label>
            <label>
              <input
                type="checkbox"
                name="tripTypes.foodCulinary"
                checked={formData.tripTypes.foodCulinary}
                onChange={handleInputChange}
              />
              Food & Culinary
            </label>
            <label>
              <input
                type="checkbox"
                name="tripTypes.wildlifeSafari"
                checked={formData.tripTypes.wildlifeSafari}
                onChange={handleInputChange}
              />
              Wildlife & Safari
            </label>
            <label>
              <input
                type="checkbox"
                name="tripTypes.relaxationWellness"
                checked={formData.tripTypes.relaxationWellness}
                onChange={handleInputChange}
              />
              Relaxation / Wellness
            </label>
            <label>
              <input
                type="checkbox"
                name="tripTypes.religiousSpiritual"
                checked={formData.tripTypes.religiousSpiritual}
                onChange={handleInputChange}
              />
              Religious / Spiritual
            </label>
            <div className="form-group">
              <label htmlFor="tripTypes.others">Others</label>
              <input
                type="text"
                id="tripTypes.others"
                name="tripTypes.others"
                placeholder="Specify other interests"
                value={formData.tripTypes.others}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="form-section">
          <h2>Budget</h2>
          <div className="form-group budget-group">
            <label htmlFor="budget">
              Total Budget <span className="required">*</span>
            </label>
            <div className="budget-input-wrapper">
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="currency-select"
              >
                <option value="USD">USD</option>
                <option value="NRP">NRP</option>
              </select>
              <input
                type="number"
                id="budget"
                name="budget"
                placeholder={`e.g., ${formData.currency === 'USD' ? '1000' : '134000'}`}
                value={formData.budget}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? 'budget-error' : undefined}
              />
            </div>
            {formData.budget && !errors.budget && (
              <p className="budget-conversion">
                {formData.currency === 'USD'
                  ? `${(parseFloat(formData.budget) * CONVERSION_RATE).toFixed(2)} NRP`
                  : `${(parseFloat(formData.budget) / CONVERSION_RATE).toFixed(2)} USD`}
              </p>
            )}
            {errors.budget && <span id="budget-error" className="error-text">{errors.budget}</span>}
          </div>
        </div>

        {/* Review & Submit */}
        <div className="form-section">
          <h2>Review Your Itinerary</h2>
          <div className="review-section">
            <p><strong>Traveler:</strong> {formData.fullName}</p>
            <p><strong>Contact:</strong> {formData.email}, {formData.phone}</p>
            <p><strong>Group-size:</strong> {formData.numberOfTravelers}</p>
            <p><strong>Dates:</strong> {formData.departureDate} to {formData.returnDate}</p>
            <p><strong>Tour:</strong> {formData.tourName}</p>
            <p><strong>Description and Itinerary:</strong> {formData.descriptionItinerary}</p>
            <p>
              <strong>Interests:</strong>{' '}
              {Object.keys(formData.tripTypes)
                .filter((key) => formData.tripTypes[key] && key !== 'others')
                .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
                .join(', ')}
              {formData.tripTypes.others ? `, ${formData.tripTypes.others}` : ''}
            </p>
            <p><strong>Budget:</strong> {formData.budget} {formData.currency}</p>
          </div>
          <div className="button-group">
            <button type="button" className="back-button" onClick={handleBack}>
              Back
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? <span className="spinner">🔄</span> : 'Submit Itinerary'}
            </button>
          </div>
        </div>
      </form>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h3>Itinerary Created</h3>
              <button className="close-button" onClick={handleCloseSuccessDialog}>❌</button>
            </div>
            <div className="dialog-content">
              <div className="alert success">
                ✅ Itinerary "{formData.tourName}" has been created successfully!
              </div>
              <p>Would you like to view your itinerary history, or continue creating another itinerary?</p>
            </div>
            <div className="dialog-footer">
              <button className="dialog-button cancel" onClick={handleCloseSuccessDialog}>
                Create Another
              </button>
              <button className="dialog-button confirm" onClick={handleViewItineraries}>
                View Itineraries
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryForm;