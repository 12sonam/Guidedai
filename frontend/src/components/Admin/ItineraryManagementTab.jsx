// import React, { useState } from 'react';
// import { Eye, ChevronDown, ChevronUp } from 'lucide-react';
// import PropTypes from 'prop-types';

// const ItineraryManagementTab = ({
//   itineraries,
//   loading,
//   error, 
//   currentItinerary,
//   setCurrentItinerary,
//   handleAcceptItinerary,
//   handleDeclineItinerary,
//   showViewItineraryModal,
//   toggleModal,
// }) => {
//   const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [feedback, setFeedback] = useState('');
//   const [feedbackError, setFeedbackError] = useState(null);
//   const [declineId, setDeclineId] = useState(null);
//   const [isDeclining, setIsDeclining] = useState(false); // Add loading state

//   if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
//   if (!itineraries || itineraries.length === 0) return <div className="p-6 text-gray-500">No data</div>;

//   const handleDeclineWithFeedback = async (itineraryId) => {
//     if (!feedback.trim()) {
//       setFeedbackError('Please provide feedback before declining.');
//       return;
//     }
//     setIsDeclining(true);
//     try {
//       await handleDeclineItinerary(itineraryId, feedback);
//       setShowFeedbackForm(false);
//       setFeedback('');
//       setDeclineId(null);
//       setFeedbackError(null);
//     } catch (err) {
//       setFeedbackError('Failed to decline itinerary. Please try again.');
//     } finally {
//       setIsDeclining(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Itinerary Management</h2>
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
//           {error}
//         </div>
//       )}
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//           <thead>
//             <tr className="bg-orange-500 text-white text-left">
//               <th className="py-3 px-6 font-medium">Itinerary ID</th>
//               <th className="py-3 px-6 font-medium">Tour</th>
//               <th className="py-3 px-6 font-medium">Submitted By</th>
//               <th className="py-3 px-6 font-medium">Status</th>
//               <th className="py-3 px-6 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {itineraries.map((itinerary, index) => (
//               <tr
//                 key={itinerary._id}
//                 className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}
//               >
//                 <td className="py-4 px-6 text-gray-700">{`#${itinerary._id.slice(-6)}`}</td>
//                 <td className="py-4 px-6 text-gray-700">{itinerary.tourTitle}</td>
//                 <td className="py-4 px-6 text-gray-700">{itinerary.submittedBy}</td>
//                 <td className="py-4 px-6">
//                   <span
//                     className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                       itinerary.status === 'accepted'
//                         ? 'bg-green-100 text-green-800'
//                         : itinerary.status === 'declined'
//                         ? 'bg-red-100 text-red-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}
//                   >
//                     {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
//                   </span>
//                 </td>
//                 <td className="py-4 px-6 flex space-x-3">
//                   <button
//                     onClick={() => {
//                       setCurrentItinerary(itinerary);
//                       toggleModal('showViewItinerary', true);
//                     }}
//                     className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg flex items-center text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={!itineraries.length}
//                   >
//                     <Eye size={16} className="mr-1.5" />
//                     View
//                   </button>
//                   <button
//                     className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
//                       itinerary.status !== 'pending' ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
//                     }`}
//                     style={
//                       itinerary.status !== 'pending'
//                         ? { backgroundColor: '#86efac', cursor: 'not-allowed', color: '#fff' }
//                         : { backgroundColor: '#10b981', color: '#fff' }
//                     }
//                     onClick={() => handleAcceptItinerary(itinerary._id)}
//                     disabled={itinerary.status !== 'pending'}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => {
//                       setDeclineId(itinerary._id);
//                       setShowFeedbackForm(true);
//                     }}
//                     className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
//                       itinerary.status !== 'pending' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
//                     }`}
//                     style={
//                       itinerary.status !== 'pending'
//                         ? { backgroundColor: '#fca5a5', cursor: 'not-allowed', color: '#fff' }
//                         : { backgroundColor: '#ef4444', color: '#fff' }
//                     }
//                     disabled={itinerary.status !== 'pending'}
//                   >
//                     Decline
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showViewItineraryModal && currentItinerary && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
//             <div className="border-b pb-4 mb-4">
//               <h3 className="text-xl font-semibold text-gray-900">Itinerary Details</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-gray-700">
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Itinerary ID</p>
//                 <p className="text-gray-900">{`#${currentItinerary._id.slice(-6)}`}</p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Tour</p>
//                 <p className="text-gray-900">{currentItinerary.tourTitle || 'N/A'}</p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Submitted By</p>
//                 <p className="text-gray-900">{currentItinerary.submittedBy || 'N/A'}</p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Status</p>
//                 <span
//                   className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                     currentItinerary.status === 'accepted'
//                       ? 'bg-green-100 text-green-700'
//                       : currentItinerary.status === 'declined'
//                       ? 'bg-red-100 text-red-700'
//                       : 'bg-yellow-100 text-yellow-700'
//                   }`}
//                 >
//                   {currentItinerary.status.charAt(0).toUpperCase() + currentItinerary.status.slice(1)}
//                 </span>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Full Name</p>
//                 <p className="text-gray-900">{currentItinerary.fullName || 'N/A'}</p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="text-gray-900">{currentItinerary.email || 'N/A'}</p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Phone</p>
//                 <p className="text-gray-900">{currentItinerary.phone || 'N/A'}</p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Number of Travelers</p>
//                 <p className="text-gray-900">{currentItinerary.numberOfTravelers || 'N/A'}</p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Departure Date</p>
//                 <p className="text-gray-900">
//                   {currentItinerary.departureDate
//                     ? new Date(currentItinerary.departureDate).toLocaleDateString()
//                     : 'N/A'}
//                 </p>
//               </div>
//               <div className="col-span-1">
//                 <p className="text-sm font-medium text-gray-500">Return Date</p>
//                 <p className="text-gray-900">
//                   {currentItinerary.returnDate
//                     ? new Date(currentItinerary.returnDate).toLocaleDateString()
//                     : 'N/A'}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
//                 className="text-orange-500 font-medium flex items-center hover:text-orange-700 transition-colors duration-200"
//               >
//                 {showAdditionalDetails ? 'Hide Additional Details' : 'Show Additional Details'}
//                 {showAdditionalDetails ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
//               </button>
//               {showAdditionalDetails && (
//                 <div className="mt-4 grid grid-cols-1 gap-4 text-gray-700">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Description</p>
//                     <p className="text-gray-900 bg-gray-50 p-3 rounded-md shadow-sm">
//                       {currentItinerary.descriptionItinerary || 'No details provided'}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Trip Types</p>
//                     <p className="text-gray-900">
//                       {currentItinerary.tripTypes
//                         ? Object.keys(currentItinerary.tripTypes)
//                             .filter((key) => currentItinerary.tripTypes[key] && key !== 'others')
//                             .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
//                             .join(', ') +
//                           (currentItinerary.tripTypes.others ? `, ${currentItinerary.tripTypes.others}` : '')
//                         : 'N/A'}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Budget</p>
//                     <p className="text-gray-900">
//                       {currentItinerary.budget
//                         ? `${currentItinerary.budget} ${currentItinerary.currency || 'USD'}`
//                         : 'N/A'}
//                     </p>
//                   </div>
//                   {currentItinerary.feedback && (
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">Previous Feedback</p>
//                       <p className="text-gray-900 bg-gray-50 p-3 rounded-md shadow-sm">
//                         {currentItinerary.feedback}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//             {/* Optional: Add Accept/Decline buttons in the modal (commented out)
//             {currentItinerary.status === 'pending' && (
//               <div className="mt-6 flex justify-start space-x-3">
//                 <button
//                   onClick={() => {
//                     handleAcceptItinerary(currentItinerary._id);
//                     toggleModal('showViewItinerary', false);
//                   }}
//                   className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => {
//                     setDeclineId(currentItinerary._id);
//                     setShowFeedbackForm(true);
//                   }}
//                   className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 >
//                   Decline
//                 </button>
//               </div>
//             )}
//             */}
//             <div className="mt-6 flex justify-end">
//               <button
//                 className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-md"
//                 onClick={() => toggleModal('showViewItinerary', false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showFeedbackForm && declineId && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Provide Feedback</h3>
//             <textarea
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               placeholder="Enter feedback for the traveler (e.g., required changes to make it acceptable)..."
//               className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               rows="4"
//             />
//             {feedbackError && (
//               <p className="text-sm text-red-600 mb-4">{feedbackError}</p>
//             )}
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => {
//                   setShowFeedbackForm(false);
//                   setFeedback('');
//                   setDeclineId(null);
//                   setFeedbackError(null);
//                 }}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
//                 disabled={isDeclining}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDeclineWithFeedback(declineId)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
//                 disabled={isDeclining}
//               >
//                 {isDeclining ? 'Submitting...' : 'Submit Decline with Feedback'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// ItineraryManagementTab.propTypes = {
//   itineraries: PropTypes.array.isRequired,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string, // Add error prop
//   currentItinerary: PropTypes.object,
//   setCurrentItinerary: PropTypes.func.isRequired,
//   handleAcceptItinerary: PropTypes.func.isRequired,
//   handleDeclineItinerary: PropTypes.func.isRequired,
//   showViewItineraryModal: PropTypes.bool.isRequired,
//   toggleModal: PropTypes.func.isRequired,
// };

// export default ItineraryManagementTab;


import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';
import PropTypes from 'prop-types';

const ItineraryManagementTab = ({
  itineraries,
  loading,
  error, 
  currentItinerary,
  setCurrentItinerary,
  handleAcceptItinerary,
  handleDeclineItinerary,
  showViewItineraryModal,
  toggleModal,
}) => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackError, setFeedbackError] = useState(null);
  const [declineId, setDeclineId] = useState(null);
  const [isDeclining, setIsDeclining] = useState(false); 

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!itineraries || itineraries.length === 0) return <div className="p-6 text-gray-500">No data</div>;

  const handleDeclineWithFeedback = async (itineraryId) => {
    if (!feedback.trim()) {
      setFeedbackError('Please provide feedback before declining.');
      return;
    }
    setIsDeclining(true);
    try {
      await handleDeclineItinerary(itineraryId, feedback);
      setShowFeedbackForm(false);
      setFeedback('');
      setDeclineId(null);
      setFeedbackError(null);
    } catch (err) {
      setFeedbackError('Failed to decline itinerary. Please try again.');
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Itinerary Management</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-orange-500 text-white text-left">
              <th className="py-3 px-6 font-medium">Itinerary ID</th>
              <th className="py-3 px-6 font-medium">Tour</th>
              <th className="py-3 px-6 font-medium">Submitted By</th>
              <th className="py-3 px-6 font-medium">Status</th>
              <th className="py-3 px-6 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itineraries.map((itinerary, index) => (
              <tr
                key={itinerary._id}
                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className="py-4 px-6 text-gray-700">{`#${itinerary._id.slice(-6)}`}</td>
                <td className="py-4 px-6 text-gray-700">{itinerary.tourTitle}</td>
                <td className="py-4 px-6 text-gray-700">{itinerary.submittedBy}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      itinerary.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : itinerary.status === 'declined'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 flex space-x-3">
                  <button
                    onClick={() => {
                      setCurrentItinerary(itinerary);
                      toggleModal('showViewItinerary', true);
                    }}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg flex items-center text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!itineraries.length}
                  >
                    <Eye size={16} className="mr-1.5" />
                    View
                  </button>
                  <button
                    className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
                      itinerary.status !== 'pending' ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                    }`}
                    style={
                      itinerary.status !== 'pending'
                        ? { backgroundColor: '#86efac', cursor: 'not-allowed', color: '#fff' }
                        : { backgroundColor: '#10b981', color: '#fff' }
                    }
                    onClick={() => handleAcceptItinerary(itinerary._id)}
                    disabled={itinerary.status !== 'pending'}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setDeclineId(itinerary._id);
                      setShowFeedbackForm(true);
                    }}
                    className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
                      itinerary.status !== 'pending' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                    }`}
                    style={
                      itinerary.status !== 'pending'
                        ? { backgroundColor: '#fca5a5', cursor: 'not-allowed', color: '#fff' }
                        : { backgroundColor: '#ef4444', color: '#fff' }
                    }
                    disabled={itinerary.status !== 'pending'}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showViewItineraryModal && currentItinerary && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Itinerary Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Itinerary ID</p>
                <p className="text-gray-900">{`#${currentItinerary._id.slice(-6)}`}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Tour</p>
                <p className="text-gray-900">{currentItinerary.tourTitle || 'N/A'}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Submitted By</p>
                <p className="text-gray-900">{currentItinerary.submittedBy || 'N/A'}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    currentItinerary.status === 'accepted'
                      ? 'bg-green-100 text-green-700'
                      : currentItinerary.status === 'declined'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {currentItinerary.status.charAt(0).toUpperCase() + currentItinerary.status.slice(1)}
                </span>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-gray-900">{currentItinerary.fullName || 'N/A'}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{currentItinerary.email || 'N/A'}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-gray-900">{currentItinerary.phone || 'N/A'}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Number of Travelers</p>
                <p className="text-gray-900">{currentItinerary.numberOfTravelers || 'N/A'}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Departure Date</p>
                <p className="text-gray-900">
                  {currentItinerary.departureDate
                    ? new Date(currentItinerary.departureDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Return Date</p>
                <p className="text-gray-900">
                  {currentItinerary.returnDate
                    ? new Date(currentItinerary.returnDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
                className="text-orange-500 font-medium flex items-center hover:text-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                {showAdditionalDetails ? 'Hide Additional Details' : 'Show Additional Details'}
                {showAdditionalDetails ? (
                  <ChevronUp size={16} className="ml-1 transition-transform duration-300 transform rotate-180" />
                ) : (
                  <ChevronDown size={16} className="ml-1 transition-transform duration-300" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showAdditionalDetails ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                {showAdditionalDetails && (
                  <div className="mt-4 grid grid-cols-1 gap-4 text-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-md shadow-sm">
                        {currentItinerary.descriptionItinerary || 'No details provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Trip Types</p>
                      <p className="text-gray-900">
                        {currentItinerary.tripTypes
                          ? Object.keys(currentItinerary.tripTypes)
                              .filter((key) => currentItinerary.tripTypes[key] && key !== 'others')
                              .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
                              .join(', ') +
                            (currentItinerary.tripTypes.others ? `, ${currentItinerary.tripTypes.others}` : '')
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Budget</p>
                      <p className="text-gray-900">
                        {currentItinerary.budget
                          ? `${currentItinerary.budget} ${currentItinerary.currency || 'USD'}`
                          : 'N/A'}
                      </p>
                    </div>
                    {currentItinerary.feedback && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Previous Feedback</p>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-md shadow-sm">
                          {currentItinerary.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!showAdditionalDetails && (
                <p className="text-sm text-gray-500 mt-2">
                  Preview: Description, Trip Types, Budget, and Feedback (if available). Click to expand for details.
                </p>
              )}
            </div>
            {/* Optional: Add Accept/Decline buttons in the modal (commented out)
            {currentItinerary.status === 'pending' && (
              <div className="mt-6 flex justify-start space-x-3">
                <button
                  onClick={() => {
                    handleAcceptItinerary(currentItinerary._id);
                    toggleModal('showViewItinerary', false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    setDeclineId(currentItinerary._id);
                    setShowFeedbackForm(true);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
            )}
            */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-md"
                onClick={() => toggleModal('showViewItinerary', false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showFeedbackForm && declineId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Provide Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter feedback for the traveler (e.g., required changes to make it acceptable)..."
              className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              rows="4"
            />
            {feedbackError && (
              <p className="text-sm text-red-600 mb-4">{feedbackError}</p>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowFeedbackForm(false);
                  setFeedback('');
                  setDeclineId(null);
                  setFeedbackError(null);
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                disabled={isDeclining}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeclineWithFeedback(declineId)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                disabled={isDeclining}
              >
                {isDeclining ? 'Submitting...' : 'Submit Decline with Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ItineraryManagementTab.propTypes = {
  itineraries: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  currentItinerary: PropTypes.object,
  setCurrentItinerary: PropTypes.func.isRequired,
  handleAcceptItinerary: PropTypes.func.isRequired,
  handleDeclineItinerary: PropTypes.func.isRequired,
  showViewItineraryModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ItineraryManagementTab;