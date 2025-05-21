// // import React from 'react';
// // import { Eye } from 'lucide-react';

// // const ItineraryManagementTab = ({ itineraries, loading, currentItinerary, setCurrentItinerary, handleAcceptItinerary, handleDeclineItinerary, showViewItineraryModal, toggleModal }) => {
// //   if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
// //   if (!itineraries || itineraries.length === 0) return <div className="p-6 text-gray-500">No data</div>;

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Itinerary Management</h2>
// //       <div className="overflow-x-auto shadow-md rounded-lg">
// //         <table className="min-w-full bg-white border border-gray-200 rounded-lg">
// //           <thead>
// //             <tr className="bg-orange-500 text-white text-left">
// //               <th className="py-3 px-6 font-medium">Itinerary ID</th>
// //               <th className="py-3 px-6 font-medium">Tour</th>
// //               <th className="py-3 px-6 font-medium">Submitted By</th>
// //               <th className="py-3 px-6 font-medium">Status</th>
// //               <th className="py-3 px-6 font-medium">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {itineraries.map((itinerary, index) => (
// //               <tr
// //                 key={itinerary._id}
// //                 className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}
// //               >
// //                 <td className="py-4 px-6 text-gray-700">{`#${itinerary._id.slice(-6)}`}</td>
// //                 <td className="py-4 px-6 text-gray-700">{itinerary.tourTitle}</td>
// //                 <td className="py-4 px-6 text-gray-700">{itinerary.submittedBy}</td>
// //                 <td className="py-4 px-6">
// //                   <span
// //                     className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
// //                       itinerary.status === 'accepted'
// //                         ? 'bg-green-100 text-green-800'
// //                         : itinerary.status === 'declined'
// //                         ? 'bg-red-100 text-red-800'
// //                         : 'bg-yellow-100 text-yellow-800'
// //                     }`}
// //                   >
// //                     {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
// //                   </span>
// //                 </td>
// //                 <td className="py-4 px-6 flex space-x-3">
// //                   <button
// //                     onClick={() => {
// //                       setCurrentItinerary(itinerary);
// //                       toggleModal('showViewItinerary', true);
// //                     }}
// //                     className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition"
// //                     disabled={!itineraries.length}
// //                   >
// //                     <Eye size={14} className="mr-1" />
// //                     View
// //                   </button>
// //                   <button
// //                     className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
// //                       itinerary.status !== 'pending' ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
// //                     }`}
// //                     style={
// //                       itinerary.status !== 'pending'
// //                         ? { backgroundColor: '#86efac', cursor: 'not-allowed', color: '#fff' }
// //                         : { backgroundColor: '#10b981', color: '#fff' }
// //                     }
// //                     onClick={() => handleAcceptItinerary(itinerary._id)}
// //                     disabled={itinerary.status !== 'pending'}
// //                   >
// //                     Accept
// //                   </button>
// //                   <button
// //                     className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
// //                       itinerary.status !== 'pending' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
// //                     }`}
// //                     style={
// //                       itinerary.status !== 'pending'
// //                         ? { backgroundColor: '#fca5a5', cursor: 'not-allowed', color: '#fff' }
// //                         : { backgroundColor: '#ef4444', color: '#fff' }
// //                     }
// //                     onClick={() => handleDeclineItinerary(itinerary._id)}
// //                     disabled={itinerary.status !== 'pending'}
// //                   >
// //                     Decline
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {showViewItineraryModal && currentItinerary && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
// //             <h3 className="text-xl font-semibold mb-4 text-gray-800">Itinerary Details</h3>
// //             <div className="space-y-3 text-gray-700">
// //               <p>
// //                 <strong className="font-medium">Itinerary ID:</strong> #{currentItinerary._id.slice(-6)}
// //               </p>
// //               <p>
// //                 <strong className="font-medium">Tour:</strong> {currentItinerary.tourTitle}
// //               </p>
// //               <p>
// //                 <strong className="font-medium">Submitted By:</strong> {currentItinerary.submittedBy}
// //               </p>
// //               <p>
// //                 <strong className="font-medium">Status:</strong>{' '}
// //                 <span
// //                   className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
// //                     currentItinerary.status === 'accepted'
// //                       ? 'bg-green-100 text-green-800'
// //                       : currentItinerary.status === 'declined'
// //                       ? 'bg-red-100 text-red-800'
// //                       : 'bg-yellow-100 text-yellow-800'
// //                   }`}
// //                 >
// //                   {currentItinerary.status.charAt(0).toUpperCase() + currentItinerary.status.slice(1)}
// //                 </span>
// //               </p>
// //               <p>
// //                 <strong className="font-medium">Details:</strong> {currentItinerary.details}
// //               </p>
// //             </div>
// //             <div className="mt-6 flex justify-end">
// //               <button
// //                 className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 btn-hover-scale smooth-transition"
// //                 style={{ backgroundColor: '#f97316', color: '#fff', padding: '8px 16px', borderRadius: '6px' }}
// //                 onClick={() => toggleModal('showViewItinerary', false)}
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ItineraryManagementTab;


// import React from 'react';
// import { Eye, CheckCircle, XCircle } from 'lucide-react';

// const ItineraryManagementTab = ({ itineraries, loading, currentItinerary, setCurrentItinerary, handleAcceptItinerary, handleDeclineItinerary, showViewItineraryModal, toggleModal }) => {
//   if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
//   if (!itineraries || itineraries.length === 0) return <div className="p-6 text-gray-500">No data</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Itinerary Management</h2>
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
//                     className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
//                       itinerary.status !== 'pending' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
//                     }`}
//                     style={
//                       itinerary.status !== 'pending'
//                         ? { backgroundColor: '#fca5a5', cursor: 'not-allowed', color: '#fff' }
//                         : { backgroundColor: '#ef4444', color: '#fff' }
//                     }
//                     onClick={() => handleDeclineItinerary(itinerary._id)}
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
//           <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-105">
//             <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight border-b pb-3 border-gray-200">Itinerary Details</h3>
//             <div className="space-y-5 text-gray-700">
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/3">Itinerary ID:</strong>
//                 <span className="text-gray-600">{`#${currentItinerary._id.slice(-6)}`}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/3">Tour:</strong>
//                 <span className="text-gray-600">{currentItinerary.tourTitle}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/3">Submitted By:</strong>
//                 <span className="text-gray-600">{currentItinerary.submittedBy}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/3">Status:</strong>
//                 <span
//                   className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
//               <div className="flex flex-col space-y-2">
//                 <strong className="font-semibold text-gray-800">Details:</strong>
//                 <p className="text-gray-600 bg-gray-50 p-4 rounded-lg shadow-sm overflow-auto max-h-48">{currentItinerary.details}</p>
//               </div>
//             </div>
//             <div className="mt-8 flex justify-end">
//               <button
//                 className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-md"
//                 onClick={() => toggleModal('showViewItinerary', false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryManagementTab;



// import React from 'react';
// import { Eye, CheckCircle, XCircle } from 'lucide-react';

// const ItineraryManagementTab = ({ itineraries, loading, currentItinerary, setCurrentItinerary, handleAcceptItinerary, handleDeclineItinerary, showViewItineraryModal, toggleModal }) => {
//   if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
//   if (!itineraries || itineraries.length === 0) return <div className="p-6 text-gray-500">No data</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Itinerary Management</h2>
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
//                     className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
//                       itinerary.status !== 'pending' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
//                     }`}
//                     style={
//                       itinerary.status !== 'pending'
//                         ? { backgroundColor: '#fca5a5', cursor: 'not-allowed', color: '#fff' }
//                         : { backgroundColor: '#ef4444', color: '#fff' }
//                     }
//                     onClick={() => handleDeclineItinerary(itinerary._id)}
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
//           <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 hover:scale-105">
//             <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight border-b pb-3 border-gray-200">Itinerary Details</h3>
//             <div className="space-y-6 text-gray-700">
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Itinerary ID:</strong>
//                 <span className="text-gray-600">{`#${currentItinerary._id.slice(-6)}`}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Tour:</strong>
//                 <span className="text-gray-600">{currentItinerary.tourTitle}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Submitted By:</strong>
//                 <span className="text-gray-600">{currentItinerary.submittedBy}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Status:</strong>
//                 <span
//                   className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Full Name:</strong>
//                 <span className="text-gray-600">{currentItinerary.fullName || 'N/A'}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Email:</strong>
//                 <span className="text-gray-600">{currentItinerary.email || 'N/A'}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Phone:</strong>
//                 <span className="text-gray-600">{currentItinerary.phone || 'N/A'}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Number of Travelers:</strong>
//                 <span className="text-gray-600">{currentItinerary.numberOfTravelers || 'N/A'}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Departure Date:</strong>
//                 <span className="text-gray-600">{currentItinerary.departureDate || 'N/A'}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Return Date:</strong>
//                 <span className="text-gray-600">{currentItinerary.returnDate || 'N/A'}</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Description:</strong>
//                 <p className="text-gray-600 bg-gray-50 p-4 rounded-lg shadow-sm overflow-auto max-h-48">
//                   {currentItinerary.descriptionItinerary || 'No details provided'}
//                 </p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Trip Types:</strong>
//                 <span className="text-gray-600">
//                   {currentItinerary.tripTypes
//                     ? Object.keys(currentItinerary.tripTypes)
//                         .filter((key) => currentItinerary.tripTypes[key] && key !== 'others')
//                         .map((key) => key.replace(/([A-Z])/g, ' $1').trim())
//                         .join(', ') +
//                       (currentItinerary.tripTypes.others ? `, ${currentItinerary.tripTypes.others}` : '')
//                     : 'N/A'}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <strong className="font-semibold text-gray-800 w-1/4">Budget:</strong>
//                 <span className="text-gray-600">
//                   {currentItinerary.budget
//                     ? `${currentItinerary.budget} ${currentItinerary.currency || 'USD'}`
//                     : 'N/A'}
//                 </span>
//               </div>
//             </div>
//             <div className="mt-8 flex justify-end">
//               <button
//                 className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-md"
//                 onClick={() => toggleModal('showViewItinerary', false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryManagementTab;


import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ItineraryManagementTab = ({ itineraries, loading, currentItinerary, setCurrentItinerary, handleAcceptItinerary, handleDeclineItinerary, showViewItineraryModal, toggleModal }) => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!itineraries || itineraries.length === 0) return <div className="p-6 text-gray-500">No data</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Itinerary Management</h2>
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
                    className={`px-2 py-1 rounded flex items-center text-sm btn-hover-scale smooth-transition ${
                      itinerary.status !== 'pending' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                    }`}
                    style={
                      itinerary.status !== 'pending'
                        ? { backgroundColor: '#fca5a5', cursor: 'not-allowed', color: '#fff' }
                        : { backgroundColor: '#ef4444', color: '#fff' }
                    }
                    onClick={() => handleDeclineItinerary(itinerary._id)}
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
                <p className="text-gray-900">{currentItinerary.departureDate || 'N/A'}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-medium text-gray-500">Return Date</p>
                <p className="text-gray-900">{currentItinerary.returnDate || 'N/A'}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
                className="text-orange-500 font-medium flex items-center hover:text-orange-700 transition-colors duration-200"
              >
                {showAdditionalDetails ? 'Hide Additional Details' : 'Show Additional Details'}
                {showAdditionalDetails ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
              </button>
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
                </div>
              )}
            </div>
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
    </div>
  );
};

export default ItineraryManagementTab;