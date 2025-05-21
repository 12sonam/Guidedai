// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Eye, Home, Users, Calendar, Briefcase, CreditCard, Star, LogOut, Menu, Edit, Trash2, UserPlus, Plus, Check, X, Map } from 'lucide-react';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import api from '../api/api';
// import '../styles/admin-dashboard.css';


// const AdminDashboard = () => {
//   // const token = localStorage.getItem("token");
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   // const [itemToDelete, /*setItemToDelete*/] = useState(null);
//   const [showViewBookingModal, setShowViewBookingModal] = useState(false);
//   const [showViewItineraryModal, setShowViewItineraryModal] = useState(false);

//   // State for all data
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     activeUsers: 0,
//     totalRevenue: 0,
//     avgRating: 0
//   });

//   const [chartData, setChartData] = useState({
//     revenueData: [],
//     bookingsData: [],
//     userTypeData: []
//   });

//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [itineraries, setItineraries] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   // Modal states
//   const [showAddUserModal, setShowAddUserModal] = useState(false);
//   const [showEditUserModal, setShowEditUserModal] = useState(false);
//   const [showAddTourModal, setShowAddTourModal] = useState(false);
//   const [showEditTourModal, setShowEditTourModal] = useState(false);
//   // const [showEditBookingModal, setShowEditBookingModal] = useState(false);

//   // Form states
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Traveler',
//     photo: ''
//   });

//   const [currentUser, setCurrentUser] = useState(null);
//   const [currentTour, setCurrentTour] = useState(null);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [currentItinerary, setCurrentItinerary] = useState(null);

//   const [newTour, setNewTour] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: '',
//     photo: '',
//     desc: '',
//     price: '',
//     maxGroupSize: '',
//     featured: false
//   });

//   // Booking table columns
//   const bookingColumns = [
//     { header: 'Booking ID', accessor: 'id' },
//     { header: 'Customer Name', accessor: 'fullName' },
//     { header: 'Email', accessor: 'userEmail' },
//     { header: 'Tour', accessor: 'tourName' },
//     { header: 'Guests', accessor: 'guestSize' },
//     { header: 'Phone', accessor: 'phone' },
//     { header: 'Booked Date', accessor: 'bookAt' },
//     { header: 'Payment Status', accessor: 'payment' },
//     { header: 'Price ($)', accessor: 'price' },
//   ];
  
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       // Fetch dashboard stats
//       const statsRes = await api.get('/admin/stats');
      
//       // Set dashboard stats
//       setDashboardStats({
//         totalUsers: statsRes.data.data.totalUsers,
//         totalGuides: statsRes.data.data.totalGuides,
//         totalTravelers: statsRes.data.data.totalTravelers,
//         totalTours: statsRes.data.data.totalTours,
//         totalBookings: statsRes.data.data.totalBookings,
//         totalReviews: statsRes.data.data.totalReviews,
//         totalRevenue: statsRes.data.data.totalRevenue,
//         avgRating: statsRes.data.data.avgRating
//       });
  
//       // Fetch recent bookings for the table
//       const bookingsRes = await api.get('/booking/admin/all');
//       const recentBookings = bookingsRes.data.data.slice(0, 5).map(booking => ({
//         ...booking,
//         id: `#${booking._id.slice(-6)}`,
//         date: new Date(booking.createdAt).toLocaleDateString(),
//         status: booking.payment === 'Paid' ? 'confirmed' : 'pending'
//       }));
//       setRecentBookings(recentBookings);
  
//       // Prepare chart data
//       const userTypeData = [
//         { name: 'Travelers', value: statsRes.data.data.totalTravelers },
//         { name: 'Guides', value: statsRes.data.data.totalGuides },
//         { name: 'Admins', value: statsRes.data.data.totalUsers - statsRes.data.data.totalTravelers - statsRes.data.data.totalGuides }
//       ];
  
//       // Generate revenue data (last 6 months)
//       const revenueData = [
//         { name: 'Jan', value: Math.floor(Math.random() * 5000) + 5000 },
//         { name: 'Feb', value: Math.floor(Math.random() * 5000) + 5000 },
//         { name: 'Mar', value: Math.floor(Math.random() * 5000) + 5000 },
//         { name: 'Apr', value: Math.floor(Math.random() * 5000) + 5000 },
//         { name: 'May', value: Math.floor(Math.random() * 5000) + 5000 },
//         { name: 'Jun', value: Math.floor(Math.random() * 5000) + 5000 }
//       ];
  
//       // Generate bookings data (last 6 months)
//       const bookingsData = [
//         { name: 'Jan', value: Math.floor(Math.random() * 50) + 30 },
//         { name: 'Feb', value: Math.floor(Math.random() * 50) + 30 },
//         { name: 'Mar', value: Math.floor(Math.random() * 50) + 30 },
//         { name: 'Apr', value: Math.floor(Math.random() * 50) + 30 },
//         { name: 'May', value: Math.floor(Math.random() * 50) + 30 },
//         { name: 'Jun', value: Math.floor(Math.random() * 50) + 30 }
//       ];
  
//       setChartData({
//         revenueData,
//         bookingsData,
//         userTypeData
//       });
  
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

// //   const handleDeleteClick = (id) => {
// //     setItemToDelete(id);
// //     setShowDeleteConfirm(true);
// // };

// // const confirmDelete = async () => {
// //     if (!itemToDelete) return;
    
// //     try {
// //         await api.delete(`/reviews/${itemToDelete}`);
// //         fetchReviews();
// //         setShowDeleteConfirm(false);
// //     } catch (err) {
// //         setError(err.response?.data?.message || 'Failed to delete review');
// //     }
// // };


//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/users');
//       setUsers(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch bookings 
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);

//       const res = await await api.get('/booking/admin/all');

  
//       const transformedBookings = res.data.data.map((booking) => ({
//         _id: booking._id,
//         id: `#${booking._id.slice(-6)}`,
//         fullName: booking.fullName || 'N/A',
//         userEmail: booking.userEmail || booking.userId?.email || 'N/A',
//         tourName: booking.tourName || 'N/A',
//         guestSize: booking.guestSize ?? 0,
//         phone: booking.phone || 'N/A',
//         bookAt: booking.bookAt,
//         payment: booking.payment || 'Pending',
//         price: booking.price ?? 0,
//       }));      
  
//       setBookings(transformedBookings);
//       setRecentBookings(transformedBookings.slice(0, 5)); //recent display 
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleDeleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         await api.delete(`/admin/bookings/${bookingId}`);
//         fetchBookings();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete booking');
//       }
//     }
//   };

//   // Fetch tours
//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/tours');
//       setTours(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch tours');
//     } finally {
//       setLoading(false);
//     }
//   };


//       const fetchItineraries = async () => {
//         try {
//           setLoading(true);
//           const res = await api.get('/itineraries');
//           const transformedItineraries = res.data.data.map((itinerary) => ({
//             ...itinerary,
//             tourTitle: itinerary.tourId?.title || 'N/A',
//             status: itinerary.status || 'Pending',
//             submittedBy: itinerary.userId?.username || 'Traveler'
//           }));
//           setItineraries(transformedItineraries);
//         } catch (err) {
//           setError(err.response?.data?.message || 'Failed to fetch itineraries');
//         } finally {
//           setLoading(false);
//         }
//       };

//       const handleAcceptItinerary = async (itineraryId) => {
//         try {
//           await api.put(`/itineraries/${itineraryId}/status`, { status: 'Accepted' });
//           fetchItineraries();
//         } catch (err) {
//           setError(err.response?.data?.message || 'Failed to accept itinerary');
//         }
//       };

//       const handleDeclineItinerary = async (itineraryId) => {
//         try {
//           await api.put(`/itineraries/${itineraryId}/status`, { status: 'Declined' });
//           fetchItineraries();
//         } catch (err) {
//           setError(err.response?.data?.message || 'Failed to decline itinerary');
//         }
//       };

//   // Fetch payments
//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/payments');
//       setPayments(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch reviews 
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/review'); 
  
//       const transformedReviews = res.data.data.map((review) => ({
//         _id: review._id,
//         id: `#${review._id.slice(-6)}`,
//         customer: review.userId?.username || 'Anonymous',
//         content: review.reviewText,
//         rating: review.rating,
//         date: new Date(review.createdAt).toLocaleDateString(),
//         tour: review.productId?.title || 'N/A',
//       }));
  
//       setReviews(transformedReviews);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Review actions
//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await api.delete(`/review/${reviewId}`);
//         fetchReviews();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete review');
//       }
//     }
//   };

//   // User actions
// const handleAddUser = async () => {
//   try {
//     const response = await api.post('/admin/users', {
//       username: newUser.username,
//       email: newUser.email,
//       password: newUser.password,
//       role: newUser.role,
//       photo: newUser.photo
//     });
    
//     setShowAddUserModal(false);
//     setNewUser({
//       username: '',
//       email: '',
//       password: '',
//       role: 'Traveler',
//       photo: ''
//     });
//     fetchUsers();
    
//     // Show success message
//     console.log('User created:', response.data);
//     setError(null);
//   } catch (err) {
//     setError(err.response?.data?.message || 'Failed to add user');
//     console.error('Error adding user:', err);
//   }
// };

// const handleUpdateUser = async () => {
//   try {
//     setLoading(true);
//     console.log('Current user data before submit:', currentUser);

//     // Prepare update data
//     const updateData = {
//       username: currentUser.username,
//       email: currentUser.email,
//       role: currentUser.role,
//       // status: currentUser.status || 'Active'
//     };

//     // Only include password if it's provided and matches confirmation
//     if (currentUser.newPassword && currentUser.confirmPassword) {
//       if (currentUser.newPassword !== currentUser.confirmPassword) {
//         throw new Error("Passwords do not match");
//       }
//       if (currentUser.newPassword.length < 6) {
//         throw new Error("Password must be at least 6 characters");
//       }
//       updateData.password = currentUser.newPassword;
//     }

//     console.log('Data being sent to API:', updateData);


//     const response = await api.put(`/admin/users/${currentUser._id}`, updateData);
//     console.log('API Response:', response.data);

//     if (response.data.success) {
//       setShowEditUserModal(false);
//       fetchUsers();
//       setError(null);
//     } else {
//       throw new Error(response.data.message || "Update failed");
//     }
//   } catch (err) {
//     console.error('Update error:', {
//       message: err.message,
//       response: err.response?.data,
//       stack: err.stack
//     });
//     setError(err.response?.data?.message || err.message || 'Failed to update user');
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete user');
//       }
//     }
//   };

//   // const handleUpdateStatus = async (userId, newStatus) => {
//   //   try {
//   //     await api.put(`/users/${userId}`, { status: newStatus });
//   //     fetchUsers();
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || 'Failed to update user status');
//   //   }
//   // };

//   // Tour actions
//   const handleAddTour = async () => {
//     try {
//       await api.post('/tours', newTour);
//       setShowAddTourModal(false);
//       setNewTour({
//         title: '',
//         city: '',
//         address: '',
//         distance: '',
//         photo: '',
//         desc: '',
//         price: '',
//         maxGroupSize: '',
//         featured: false
//       });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add tour');
//     }
//   };

//   const handleUpdateTour = async () => {
//     try {
//       await api.put(`/tours/${currentTour._id}`, currentTour);
//       setShowEditTourModal(false);
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update tour');
//     }
//   };

//   const handleDeleteTour = async (tourId) => {
//     if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
//       try {
//         await api.delete(`/tours/${tourId}`);
//         fetchTours();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete tour');
//       }
//     }
//   }

//   // Payment actions
//   const handleDeletePayment = async (paymentId) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/payments/${paymentId}`);
//         fetchPayments();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete payment');
//       }
//     }
//   };

//   useEffect(() => {
    
//     switch (activeTab) {
//       case 'Dashboard':
//         fetchDashboardData();
//         break;
//       case 'User Management':
//         fetchUsers();
//         break;
//       case 'Bookings':
//         fetchBookings();
//         break;
//       case 'Packages':
//         fetchTours();
//         break;
//       case 'Itineraries':
//         fetchItineraries();
//         break;
//       case 'Payments':
//         fetchPayments();
//         break;
//       case 'Reviews':
//         fetchReviews();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const renderStars = (rating) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, i) => (
//           <Star 
//             key={i} 
//             size={16} 
//             className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
//           />
//         ))}
//       </div>
//     );
//   };

//   // Render different content based on active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return renderDashboard();
//       case 'User Management':
//         return renderUserManagement();
//       case 'Bookings':
//         return renderBookingManagement();
//       case 'Packages':
//         return renderPackageManagement();
//       case 'Itineraries':
//         return renderItineraryManagement();
//       case 'Payments':
//         return renderPaymentManagement();
//       case 'Reviews':
//         return renderReviewManagement();
//       default:
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
//             <p className="text-gray-500">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//     //   {showDeleteConfirm && (
//     //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     //         <div className="bg-white rounded-lg p-6 w-full max-w-md">
//     //             <div className="flex justify-between items-center mb-4">
//     //                 <h3 className="text-lg font-semibold">Confirm Deletion</h3>
//     //                 <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-500 hover:text-gray-700">
//     //                     &times;
//     //                 </button>
//     //             </div>
//     //             <p className="mb-4">Are you sure you want to delete this review? This action cannot be undone.</p>
//     //             <div className="flex justify-end space-x-3">
//     //                 <button
//     //                     onClick={() => setShowDeleteConfirm(false)}
//     //                     className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//     //                 >
//     //                     Cancel
//     //                 </button>
//     //                 <button
//     //                     onClick={confirmDelete}
//     //                     className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//     //                 >
//     //                     Delete
//     //                 </button>
//     //             </div>
//     //         </div>
//     //     </div>
//     // )}

//   // Dashboard content
//   const renderDashboard = () => {
//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
        
//        {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg p-6 shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Bookings</p>
//                 <h3 className="text-3xl font-bold mt-1">{dashboardStats.totalBookings}</h3>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <Briefcase size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg p-6 shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Users</p>
//                 <h3 className="text-3xl font-bold mt-1">{dashboardStats.totalUsers}</h3>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <Users size={20} className="text-green-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg p-6 shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Revenue</p>
//                 <h3 className="text-3xl font-bold mt-1">${dashboardStats.totalRevenue.toLocaleString()}</h3>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <CreditCard size={20} className="text-purple-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg p-6 shadow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-500 text-sm">Avg. Rating</p>
//                 <h3 className="text-3xl font-bold mt-1">{dashboardStats.avgRating.toFixed(1)}</h3>
//               </div>
//               <div className="bg-yellow-100 p-3 rounded-lg">
//                 <Star size={20} className="text-yellow-600" />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-lg p-6 shadow">
//           <h3 className="text-lg font-semibold mb-4">Revenue Trend (Last 6 Months)</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData.revenueData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip 
//                 formatter={(value) => [`$${value}`, 'Revenue']}
//                 labelFormatter={(label) => `Month: ${label}`}
//               />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="value" 
//                 name="Revenue" 
//                 stroke="#3b82f6" 
//                 strokeWidth={2} 
//                 activeDot={{ r: 8 }} 
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
        
//         <div className="bg-white rounded-lg p-6 shadow">
//           <h3 className="text-lg font-semibold mb-4">Bookings Overview (Last 6 Months)</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData.bookingsData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip 
//                 formatter={(value) => [value, 'Bookings']}
//                 labelFormatter={(label) => `Month: ${label}`}
//               />
//               <Legend />
//               <Bar 
//                 dataKey="value" 
//                 name="Bookings" 
//                 fill="#3b82f6" 
//                 radius={[4, 4, 0, 0]} 
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg p-6 shadow lg:col-span-1">
//         <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={chartData.userTypeData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey="value"
//               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//             >
//               {chartData.userTypeData.map((entry, index) => (
//                 <Cell 
//                   key={`cell-${index}`} 
//                   fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} 
//                 />
//               ))}
//             </Pie>
//             <Tooltip 
//               formatter={(value, name) => [`${value} users`, name]}
//             />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//           <div className="bg-white rounded-lg p-6 shadow lg:col-span-2">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Recent Bookings</h3>
//             <button 
//               className="text-blue-600 text-sm hover:underline"
//               onClick={() => setActiveTab('Bookings')}
//             >
//               View All
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentBookings.map((booking) => (
//                   <tr key={booking._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{booking.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.fullName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.tourName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {booking.date}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                         ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
//                           'bg-yellow-100 text-yellow-800'}`}>
//                         {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${booking.price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         </div>
//       </div>
//     );
//   };

//   // User Management content
//     const renderUserManagement = () => {
//       return (
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold">User Management</h2>
//             <button 
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition"
//               onClick={() => setShowAddUserModal(true)}
//             >
//               <UserPlus size={16} className="mr-2" />
//               Add New User
//             </button>
//           </div>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {users.map((user) => (
//                     <tr key={user._id} className="hover:bg-gray-50">
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
//                             {user.username.charAt(0).toUpperCase()}
//                           </div>
//                           <div className="ml-3">
//                             <div className="text-sm font-medium text-gray-900">{user.username}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
//                             user.role === 'Guide' ? 'bg-blue-100 text-blue-800' : 
//                             'bg-green-100 text-green-800'}`}>
//                           {user.role}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-3">
//                         <button
//                             onClick={() => {
//                               setCurrentUser(user);
//                               setShowEditUserModal(true);
//                             }}
//                             className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm flex items-center transition-colors"
//                             title="Edit user"
//                           >
//                             <Edit size={14} className="mr-1" />
//                             Edit
//                           </button>
//                           <button
//                           onClick={() => handleDeleteUser(user._id)}
//                           className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm flex items-center transition-colors"
//                           title="Delete user"
//                         >
//                           <Trash2 size={14} className="mr-1" />
//                           Delete
//                         </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Add User Modal */}
//               {showAddUserModal && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100 border border-gray-200 dark:border-gray-700">
//                     {/* Modal Header */}
//                     <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6">
//                       <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/50"></div>
//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center space-x-3">
//                           <div className="p-2 rounded-lg bg-white/10">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                             </svg>
//                           </div>
//                           <div>
//                             <h3 className="text-xl font-bold text-black">Create New User</h3>
//                             <p className="text-blue-100 text-sm mt-1">Fill in the user details below</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Modal Body */}
//                     <div className="p-6 space-y-5">
//                       {/* Username Field */}
//                       <div className="group">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
//                           Username
//                         </label>
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                           <input
//                             type="text"
//                             className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 group-hover:border-blue-400"
//                             placeholder="Enter username"
//                             value={newUser.username}
//                             onChange={(e) => setNewUser({...newUser, username: e.target.value})}
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Email Field */}
//                       <div className="group">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
//                           Email Address
//                         </label>
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                               <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                               <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                             </svg>
//                           </div>
//                           <input
//                             type="email"
//                             className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 group-hover:border-blue-400"
//                             placeholder="email@example.com"
//                             value={newUser.email}
//                             onChange={(e) => setNewUser({...newUser, email: e.target.value})}
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Password Field */}
//                       <div className="group">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
//                           Password
//                         </label>
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                           <input
//                             type="password"
//                             className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 group-hover:border-blue-400"
//                             placeholder="••••••••"
//                             value={newUser.password}
//                             onChange={(e) => setNewUser({...newUser, password: e.target.value})}
//                             required
//                           />
//                         </div>
//                         <div className="flex items-center mt-2 text-xs text-gray-500">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
//                           </svg>
//                           Strong passwords improve account security
//                         </div>
//                       </div>

//                       {/* Role Field */}
//                       <div className="group">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
//                           User Role
//                         </label>
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                           <select
//                             className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white appearance-none transition-all duration-200 group-hover:border-blue-400"
//                             value={newUser.role}
//                             onChange={(e) => setNewUser({...newUser, role: e.target.value})}
//                             required
//                           >
//                             <option value="">Select role</option>
//                             <option value="Traveler">Traveler</option>
//                             <option value="Guide">Guide</option>
//                             <option value="Admin">Admin</option>
//                           </select>
//                           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="flex mt-2 space-x-2 overflow-x-auto">
//                           <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 whitespace-nowrap">Traveler</span>
//                           <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">Guide</span>
//                           <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 whitespace-nowrap">Admin: Full access</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Modal Footer */}
//                     <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
//                       <button
//                         onClick={() => setShowAddUserModal(false)}
//                         className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-black-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleAddUser}
//                         disabled={!newUser.username || !newUser.email || !newUser.password || !newUser.role}
//                         className={`px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-black-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
//                           !newUser.username || !newUser.email || !newUser.password || !newUser.role 
//                             ? 'bg-blue-400 cursor-not-allowed' 
//                             : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
//                         } flex items-center`}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                         </svg>
//                         Create User
//                       </button>
//                     </div>  
//                   </div>
//                 </div>
//               )}

//           {/* Edit User Modal */}
//           {showEditUserModal && currentUser && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-300">
//               {/* Modal Header */}
//               <div className="bg-blue-600 px-6 py-4 border-b border-blue-700">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 rounded-lg bg-white">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-white">Edit User Profile</h3>
//                       <p className="text-xs text-white">ID: {currentUser._id.substring(0, 8)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//           {/* Modal Body */}
//           <div className="p-6 overflow-y-auto max-h-[70vh] bg-gray-50">
//             {error && (
//               <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md text-sm flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 {error}
//               </div>
//             )}

//             <div className="space-y-6">
//               {/* User Avatar Section */}
//               <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
//                 <div className="relative">
//                   <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold text-black">
//                     {currentUser.username.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-900">{currentUser.username}</h4>
//                   <p className="text-sm text-gray-700">{currentUser.email}</p>
//                   <span className={`mt-2 inline-block px-2 py-1 text-xs font-bold rounded-full ${
//                     currentUser.role === 'Admin' ? 'bg-purple-600 text-white' :
//                     currentUser.role === 'Guide' ? 'bg-blue-600 text-white' :
//                     'bg-green-600 text-black'
//                   }`}>
//                     {currentUser.role}
//                   </span>
//                 </div>
//               </div>

//               {/* Form Fields */}
//               <div className="space-y-5">
//                 {/* Username Field */}
//                 <div>
//                   <label className="block text-sm font-bold text-gray-800 mb-2">Username</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-all shadow-sm"
//                       value={currentUser.username}
//                       onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
//                       required
//                     />
//                   </div>
//                 </div>

//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-all shadow-sm"
//                   value={currentUser.email}
//                   onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Role Field */}
//             <div>
//               <label className="block text-sm font-bold text-gray-800 mb-2">User Role</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <select
//                   className="w-full pl-10 pr-10 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 appearance-none transition-all shadow-sm"
//                   value={currentUser.role}
//                   onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
//                   required
//                 >
//                   <option value="Traveler">Traveler</option>
//                   <option value="Guide">Guide</option>
//                   <option value="Admin">Admin</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Password Section */}
//             <div className="pt-4 border-t-2 border-gray-300">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="text-sm font-bold text-gray-800 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                   Password Settings
//                 </h4>
//                 {currentUser.newPassword && (
//                   <span className="text-xs font-bold text-green-800 bg-green-200 px-2 py-1 rounded-full">
//                     New password set
//                   </span>
//                 )}
//               </div>
              
//               <div className="space-y-4 bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
//                 <div>
//                   <label className="block text-sm font-bold text-gray-800 mb-2">New Password</label>
//                   <div className="relative">
//                     <input
//                       type="password"
//                       className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-all shadow-sm"
//                       placeholder="••••••••"
//                       onChange={(e) => setCurrentUser({...currentUser, newPassword: e.target.value})}
//                     />
//                   </div>
//                 </div>
//                 {currentUser.newPassword && (
//                   <div>
//                     <label className="block text-sm font-bold text-gray-800 mb-2">Confirm Password</label>
//                     <div className="relative">
//                       <input
//                         type="password"
//                         className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-all shadow-sm"
//                         placeholder="••••••••"
//                         onChange={(e) => setCurrentUser({...currentUser, confirmPassword: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="mt-2 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
//                       </svg>
//                       <span className="text-xs font-medium text-gray-700">Passwords must match</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal Footer */}
//       <div className="bg-gray-100 px-6 py-4 flex justify-end space-x-3 border-t border-gray-300">
//         <button
//           onClick={() => {
//             setShowEditUserModal(false);
//             setCurrentUser(null);
//             setError(null);
//           }}
//           className="px-5 py-2.5 border-2 border-gray-400 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors shadow-sm"
//         >
//           Discard Changes
//         </button>
//         <button
//           onClick={handleUpdateUser}
//           disabled={loading || 
//             !currentUser.username || 
//             !currentUser.email || 
//             !currentUser.role ||
//             (currentUser.newPassword && !currentUser.confirmPassword) ||
//             (currentUser.newPassword && currentUser.newPassword !== currentUser.confirmPassword)
//           }
//           className={`px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-colors shadow-sm ${
//             loading ? 'bg-blue-400 cursor-not-allowed' : 
//             'bg-blue-600 hover:bg-blue-700'
//           } flex items-center`}
//         >
//           {loading ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Updating...
//             </>
//           ) : (
//             <>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               Save Changes
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//           </div>
//       );
//     };


// // Booking Management content 
// const renderBookingManagement = () => {
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Booking Management</h2>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow overflow-x-auto">
//           {bookings.length > 0 ? (
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {bookingColumns.map((column) => (
//                     <th 
//                       key={column.accessor}
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       {column.header}
//                     </th>
//                   ))}
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {bookings.map((booking) => (
//                   <tr key={booking._id} className="hover:bg-gray-50">
//                     {bookingColumns.map((column) => {
//                     const value = booking[column.accessor];

//                     return (
//                       <td 
//                         key={`${booking._id}-${column.accessor}`}
//                         className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
//                       >

//                         {column.accessor === 'payment' ? (
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                             ${value === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                             {value}
//                           </span>                          
//                         ) : column.accessor === 'bookAt' ? (
//                           new Date(value).toLocaleDateString()
//                         ) : (
//                           value || '—'
//                         )}
//                       </td>
//                     );
//                   })}

//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button 
//                           onClick={() => {
//                             setCurrentBooking(booking);
//                             setShowViewBookingModal(true);
//                           }}
//                           className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm"
//                         >
//                           <Eye size={14} className="mr-1" />
//                           View
//                         </button>
//                         <button 
//                           onClick={() => handleDeleteBooking(booking._id)}
//                           className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
//                         >
//                           <Trash2 size={14} className="mr-1" />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="p-6 text-center text-gray-500">
//               No bookings found
//             </div>
//           )}
//         </div>
//       )}

//       {/* View Booking Modal */}
//       {showViewBookingModal && currentBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Booking Details</h3>
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500">Booking ID</label>
//                   <p className="mt-1 text-sm text-gray-900">{currentBooking.id || '—'}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500">Booking Date</label>
//                   <p className="mt-1 text-sm text-gray-900">
//                     {currentBooking.createdAt ? new Date(currentBooking.createdAt).toLocaleDateString() : '—'}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="text-md font-medium text-gray-900 mb-3">Customer Information</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Full Name</label>
//                     <p className="mt-1 text-sm text-gray-900">{currentBooking.fullName || '—'}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Email</label>
//                     <p className="mt-1 text-sm text-gray-900">{currentBooking.userEmail || '—'}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Phone</label>
//                     <p className="mt-1 text-sm text-gray-900">{currentBooking.phone || '—'}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="text-md font-medium text-gray-900 mb-3">Tour Information</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Tour Name</label>
//                     <p className="mt-1 text-sm text-gray-900">{currentBooking.tourName || '—'}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Travel Date</label>
//                     <p className="mt-1 text-sm text-gray-900">
//                       {currentBooking.bookAt ? new Date(currentBooking.bookAt).toLocaleDateString() : '—'}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Guest Size</label>
//                     <p className="mt-1 text-sm text-gray-900">{currentBooking.guestSize || '—'}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Price</label>
//                     <p className="mt-1 text-sm text-gray-900">${currentBooking.price || '0'}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="text-md font-medium text-gray-900 mb-3">Payment Information</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Status</label>
//                     <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${currentBooking.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                       {currentBooking.payment || 'Pending'}
//                     </span>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500">Payment Method</label>
//                     <p className="mt-1 text-sm text-gray-900">{currentBooking.paymentMethod || '—'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setShowViewBookingModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
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

//   // Package Management content
//   const renderPackageManagement = () => {
//     return (
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Tour Package Management</h2>
//           <button 
//             onClick={() => setShowAddTourModal(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition"
//           >
//             <Plus size={16} className="mr-2" />
//             Add New Tour
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Title</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Group</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {tours.map((tour) => (
//                   <tr key={tour._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tour.title}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.city}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${tour.price}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tour.maxGroupSize}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                         ${tour.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                         {tour.featured ? 'Yes' : 'No'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button 
//                           onClick={() => {
//                             setCurrentTour(tour);
//                             setShowEditTourModal(true);
//                           }}
//                           className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm"
//                         >
//                           <Edit size={14} className="mr-1" />
//                           Edit
//                         </button>
//                         <button 
//                           onClick={() => handleDeleteTour(tour._id)}
//                           className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
//                         >
//                           <Trash2 size={14} className="mr-1" />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//           {showAddTourModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                   <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//                       <div className="flex justify-between items-center mb-4">
//                           <h3 className="text-xl font-bold text-gray-800">Add New Tour</h3>
//                           <button onClick={() => setShowAddTourModal(false)} className="text-gray-500 hover:text-gray-700">
//                               &times;
//                           </button>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
//                               <input
//                                   type="text"
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                                   value={newTour.title}
//                                   onChange={(e) => setNewTour({...newTour, title: e.target.value})}
//                                   required
//                               />
//                           </div>
                          
//                           <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
//                               <input
//                                   type="text"
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                                   value={newTour.city}
//                                   onChange={(e) => setNewTour({...newTour, city: e.target.value})}
//                                   required
//                               />
//                           </div>
                          
//                           <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
//                               <input
//                                   type="number"
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                                   value={newTour.price}
//                                   onChange={(e) => setNewTour({...newTour, price: e.target.value})}
//                                   required
//                               />
//                           </div>
                          
//                           <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Max Group Size*</label>
//                               <input
//                                   type="number"
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                                   value={newTour.maxGroupSize}
//                                   onChange={(e) => setNewTour({...newTour, maxGroupSize: e.target.value})}
//                                   required
//                               />
//                           </div>
                          
//                           <div className="md:col-span-2">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
//                               <textarea
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                                   rows="4"
//                                   value={newTour.desc}
//                                   onChange={(e) => setNewTour({...newTour, desc: e.target.value})}
//                                   required
//                               ></textarea>
//                           </div>
                          
//                           <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
//                               <select
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                                   value={newTour.featured}
//                                   onChange={(e) => setNewTour({...newTour, featured: e.target.value === 'true'})}
//                               >
//                                   <option value="false">No</option>
//                                   <option value="true">Yes</option>
//                               </select>
//                           </div>
                          
//                           <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">Tour Photo*</label>
//                               <div className="mt-1 flex items-center">
//                                   <input
//                                       type="file"
//                                       onChange={(e) => {
//                                           const file = e.target.files[0];
//                                           if (file) {
//                                               const reader = new FileReader();
//                                               reader.onloadend = () => {
//                                                   setNewTour({...newTour, photo: reader.result});
//                                               };
//                                               reader.readAsDataURL(file);
//                                           }
//                                       }}
//                                       className="hidden"
//                                       id="tour-photo"
//                                   />
//                                   {/* <label
//                                       htmlFor="tour-photo"
//                                       className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
//                                   >
//                                       Choose Photo
//                                   </label> */}
//                               </div>
//                               {newTour.photo && (
//                                   <div className="mt-2">
//                                       <img src={newTour.photo} alt="Preview" className="h-20 w-20 object-cover rounded-md"/>
//                                   </div>
//                               )}
//                           </div>
//                       </div>
                      
//                       <div className="mt-6 flex justify-end space-x-3">
//                           <button
//                               onClick={() => setShowAddTourModal(false)}
//                               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                           >
//                               Cancel
//                           </button>
//                           <button
//                               onClick={handleAddTour}
//                               className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                           >
//                               Add Tour
//                           </button>
//                       </div>
//                   </div>
//               </div>
//           )}

//         {/* Edit Tour Modal */}
//         {showEditTourModal && currentTour && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Edit Tour</h3>
//                 <button onClick={() => setShowEditTourModal(false)} className="text-gray-500 hover:text-gray-700">
//                   &times;
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={currentTour.title}
//                     onChange={(e) => setCurrentTour({...currentTour, title: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={currentTour.city}
//                     onChange={(e) => setCurrentTour({...currentTour, city: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={currentTour.address}
//                     onChange={(e) => setCurrentTour({...currentTour, address: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
//                   <input
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={currentTour.distance}
//                     onChange={(e) => setCurrentTour({...currentTour, distance: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                   <input
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={currentTour.price}
//                     onChange={(e) => setCurrentTour({...currentTour, price: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Max Group Size</label>
//                   <input
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={currentTour.maxGroupSize}
//                     onChange={(e) => setCurrentTour({...currentTour, maxGroupSize: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
//                   <select
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     value={currentTour.featured}
//                     onChange={(e) => setCurrentTour({...currentTour, featured: e.target.value === 'true'})}
//                   >
//                     <option value="false">No</option>
//                     <option value="true">Yes</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     rows="3"
//                     value={currentTour.desc}
//                     onChange={(e) => setCurrentTour({...currentTour, desc: e.target.value})}
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowEditTourModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdateTour}
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };


// const renderItineraryManagement = () => {
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Itinerary Management</h2>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Itinerary ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {itineraries.map((itinerary) => (
//                 <tr key={itinerary._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     #{itinerary._id.slice(-6)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{itinerary.tourTitle}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{itinerary.submittedBy}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${itinerary.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
//                         itinerary.status === 'Declined' ? 'bg-red-100 text-red-800' : 
//                         'bg-yellow-100 text-yellow-800'}`}>
//                       {itinerary.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => {
//                           setCurrentItinerary(itinerary);
//                           setShowViewItineraryModal(true);
//                         }}
//                         className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm"
//                       >
//                         <Eye size={14} className="mr-1" />
//                         View
//                       </button>
//                       {itinerary.status === 'Pending' && (
//                         <>
//                           <button 
//                             onClick={() => handleAcceptItinerary(itinerary._id)}
//                             className="text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded flex items-center text-sm"
//                           >
//                             <Check size={14} className="mr-1" />
//                             Accept
//                           </button>
//                           <button 
//                             onClick={() => handleDeclineItinerary(itinerary._id)}
//                             className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
//                           >
//                             <X size={14} className="mr-1" />
//                             Decline
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showViewItineraryModal && currentItinerary && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">Itinerary Details</h3>
//               <button onClick={() => setShowViewItineraryModal(false)} className="text-gray-500 hover:text-gray-700">
//                 ×
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Itinerary ID</label>
//                   <p className="text-sm text-gray-900">#{currentItinerary._id.slice(-6)}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                     ${currentItinerary.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
//                       currentItinerary.status === 'Declined' ? 'bg-red-100 text-red-800' : 
//                       'bg-yellow-100 text-yellow-800'}`}>
//                     {currentItinerary.status}
//                   </span>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Tour Title</label>
//                   <p className="text-sm text-gray-900">{currentItinerary.tourTitle}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Submitted By</label>
//                   <p className="text-sm text-gray-900">{currentItinerary.submittedBy}</p>
//                 </div>
//               </div>
//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-3">Itinerary Days</h4>
//                 {currentItinerary.days && currentItinerary.days.length > 0 ? (
//                   currentItinerary.days.map((day, index) => (
//                     <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
//                       <h5 className="text-md font-medium text-gray-900">Day {day.day}</h5>
//                       <p className="text-sm text-gray-600 mt-1">{day.description || 'No description available'}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No itinerary days available</p>
//                 )}
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setShowViewItineraryModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
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


//   // Payment Management content
//   const renderPaymentManagement = () => {
//     return (
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Payment Management</h2>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {payments.map((payment) => (
//                   <tr key={payment._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#{payment._id.slice(-6)}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{payment.booking?._id.slice(-6) || 'N/A'}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.user?.username || 'Deleted User'}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                         ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
//                           payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
//                           'bg-red-100 text-red-800'}`}>
//                         {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(payment.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button 
//                         onClick={() => handleDeletePayment(payment._id)}
//                         className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
//                       >
//                         <Trash2 size={14} className="mr-1" />
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Review Management content
// const renderReviewManagement = () => {
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Review Management</h2>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="divide-y divide-gray-200">
//             {reviews.length > 0 ? (
//               reviews.map((review) => (
//                 <div key={review._id} className="p-6 hover:bg-gray-50">
//                   <div className="flex justify-between">
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900">{review.customer}</h3>
//                       <p className="text-sm text-gray-500">Tour: {review.tour}</p>
//                       <div className="mt-1">
//                         {renderStars(review.rating)}
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-500">{review.date}</div>
//                   </div>
//                   <div className="mt-2 text-sm text-gray-600">
//                     <p>{review.content}</p>
//                   </div>
//                   <div className="mt-4 flex justify-end">
//                     <button 
//                       onClick={() => handleDeleteReview(review._id)}
//                       className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center text-sm"
//                     >
//                       <Trash2 size={14} className="mr-1" />
//                       Delete Review
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-6 text-center text-gray-500">
//                 No reviews found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
//         <div className="flex items-center justify-between h-16 px-4 border-b">
//           {!collapsed && (
//             <div className="flex items-center">
//               <span className="text-blue-600 font-bold text-xl">guide</span>
//               <span className="text-gray-800 font-bold text-xl">Dai</span>
//             </div>
//           )}
//           {collapsed && (
//             <div className="flex items-center justify-center w-full">
//               <span className="text-blue-600 font-bold text-xl">g</span>
//             </div>
//           )}
//           <button 
//             onClick={toggleSidebar}
//             className="p-1 rounded-full hover:bg-gray-100"
//           >
//             <Menu size={20} />
//           </button>
//         </div>
//         <div className="py-4 flex flex-col h-[calc(100%-4rem)]">
//           <ul className="flex-1">
//             {[
//               { name: 'Dashboard', icon: <Home size={20} /> },
//               { name: 'User Management', icon: <Users size={20} /> },
//               { name: 'Bookings', icon: <Calendar size={20} /> },
//               { name: 'Packages', icon: <Briefcase size={20} /> },
//               { name: 'Itineraries', icon: <Map size={20} /> },
//               { name: 'Payments', icon: <CreditCard size={20} /> },
//               { name: 'Reviews', icon: <Star size={20} /> },
//             ].map((item) => (
//               <li key={item.name} className="mb-1">
//                 <button
//                   onClick={() => setActiveTab(item.name)}
//                   className={`flex items-center w-full px-4 py-3 ${
//                     activeTab === item.name 
//                       ? 'text-blue-600 bg-blue-50 font-medium' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   } transition-colors rounded-lg ${collapsed ? 'justify-center' : ''}`}
//                 >
//                   <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
//                   {!collapsed && <span className="text-sm">{item.name}</span>}
//                 </button>
//               </li>
//             ))}
//           </ul>
          
//           {/* Logout Button */}
//           <div className="mt-auto px-4 py-2">
//             <button
//               onClick={handleLogout}
//               className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors rounded-lg ${collapsed ? 'justify-center' : ''}`}
//             >
//               <span className={collapsed ? '' : 'mr-3'}><LogOut size={20} /></span>
//               {!collapsed && <span className="text-sm">Logout</span>}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm h-16 flex items-center px-6">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-800">{activeTab}</h1>
//           </div>
          
//           <div className="ml-auto flex items-center space-x-4">
//             <div className="relative">
//             </div>
            
//             <div className="flex items-center">
//               <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm mr-2">
//                 AD
//               </div>
//               <span className="text-sm font-medium text-gray-800">Admin User</span>
//             </div>
//           </div>
//         </header>
        
//         {/* Main content area */}
//         <main className="flex-1 overflow-y-auto bg-gray-100">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import Sidebar from '../components/Admin/Sidebar';
// import Header from '../components/Admin/Header';
// import DashboardTab from '../components/Admin/DashboardTab';
// import UserManagementTab from '../components/Admin/UserManagementTab';
// import BookingManagementTab from '../components/Admin/BookingManagementTab';
// import PackageManagementTab from '../components/Admin/PackageManagementTab';
// import ItineraryManagementTab from '../components/Admin/ItineraryManagementTab';
// import PaymentManagementTab from '../components/Admin/PaymentManagementTab';
// import ReviewManagementTab from '../components/Admin/ReviewManagementTab';
// import '../styles/admin-dashboard.css';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Dashboard stats
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//     avgRating: 0,
//     totalGuides: 0,
//     totalTravelers: 0,
//     totalTours: 0,
//     totalReviews: 0,
//   });

//   // Chart data
//   const [chartData, setChartData] = useState({
//     revenueByTour: [],
//     bookingStatus: [],
//     userTypeData: [],
//   });

//   // Data arrays
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [itineraries, setItineraries] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   // Modal states
//   const [modals, setModals] = useState({
//     showAddUser: false,
//     showEditUser: false,
//     showAddTour: false,
//     showEditTour: false,
//     showViewBooking: false,
//     showViewItinerary: false,
//   });

//   // Form states
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Traveler',
//     photo: '',
//   });
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newTour, setNewTour] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: '',
//     photo: '',
//     desc: '',
//     price: '',
//     maxGroupSize: '',
//     featured: false,
//   });
//   const [currentTour, setCurrentTour] = useState(null);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [currentItinerary, setCurrentItinerary] = useState(null);

//   // Booking table columns
//   const bookingColumns = [
//     { header: 'Booking ID', accessor: 'id' },
//     { header: 'Customer', accessor: 'fullName' },
//     { header: 'Tour', accessor: 'tourName' },
//     { header: 'Date', accessor: 'bookAt' },
//     { header: 'Status', accessor: 'payment' },
//     { header: 'Amount', accessor: 'price' },
//   ];

//   // API calls
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const statsRes = await api.get('/admin/stats');
//       const statsData = statsRes.data.data;
//       setDashboardStats({
//         totalUsers: statsData.totalUsers,
//         totalGuides: statsData.totalGuides,
//         totalTravelers: statsData.totalTravelers,
//         totalTours: statsData.totalTours,
//         totalBookings: statsData.totalBookings,
//         totalReviews: statsData.totalReviews,
//         totalRevenue: statsData.totalRevenue,
//         avgRating: statsData.avgRating,
//       });

//       const bookingsRes = await api.get('/booking/admin/all');
//       const recent = bookingsRes.data.data.slice(0, 5).map((booking) => ({
//         ...booking,
//         id: `#${booking._id.slice(-6)}`,
//         date: new Date(booking.createdAt).toLocaleDateString(),
//         status: booking.payment === 'Paid' ? 'confirmed' : 'pending',
//       }));
//       setRecentBookings(recent);

//       // Map user type data for pie chart
//       const userTypeData = [
//         { name: 'Travelers', value: statsData.totalTravelers },
//         { name: 'Guides', value: statsData.totalGuides },
//         { name: 'Admins', value: statsData.totalUsers - statsData.totalTravelers - statsData.totalGuides },
//       ].filter(item => item.value > 0); // Remove categories with 0 value

//       // Use revenueByTour and bookingStatus directly from the API response
//       const revenueByTour = statsData.revenueByTour || [];
//       const bookingStatus = statsData.bookingStatus || [];

//       setChartData({ revenueByTour, bookingStatus, userTypeData });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling mechanism to fetch data every 30 seconds
//   useEffect(() => {
//     if (activeTab === 'Dashboard') {
//       fetchDashboardData(); // Initial fetch
//       const intervalId = setInterval(fetchDashboardData, 30000); // Poll every 30 seconds

//       return () => clearInterval(intervalId); // Clean up on unmount or tab change
//     }
//   }, [activeTab]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/users');
//       setUsers(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/booking/admin/all');
//       const transformedBookings = res.data.data.map((booking) => ({
//         _id: booking._id,
//         id: `#${booking._id.slice(-6)}`,
//         fullName: booking.fullName || 'N/A',
//         userEmail: booking.userEmail || booking.userId?.email || 'N/A',
//         tourName: booking.tourName || 'N/A',
//         guestSize: booking.guestSize ?? 0,
//         phone: booking.phone || 'N/A',
//         bookAt: booking.bookAt ? new Date(booking.bookAt).toLocaleDateString() : 'N/A',
//         payment: booking.payment || 'Pending',
//         price: booking.price ?? 0,
//       }));
//       setBookings(transformedBookings);
//       setRecentBookings(transformedBookings.slice(0, 5));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/tours');
//       setTours(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch tours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchItineraries = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/itineraries');
//       const transformedItineraries = res.data.data.map((itinerary) => ({
//         ...itinerary,
//         tourTitle: itinerary.tourId?.title || 'N/A',
//         status: itinerary.status || 'Pending',
//         submittedBy: itinerary.userId?.username || 'Traveler',
//       }));
//       setItineraries(transformedItineraries);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch itineraries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/payments');
//       setPayments(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/review');
//       const transformedReviews = res.data.data.map((review) => ({
//         _id: review._id,
//         id: `#${review._id.slice(-6)}`,
//         customer: review.userId?.username || 'Anonymous',
//         content: review.reviewText,
//         rating: review.rating,
//         date: new Date(review.createdAt).toLocaleDateString(),
//         tour: review.productId?.title || 'N/A',
//       }));
//       setReviews(transformedReviews);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handlers
//   const handleAddUser = async () => {
//     try {
//       await api.post('/admin/users', {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         role: newUser.role,
//         photo: newUser.photo,
//       });
//       setModals({ ...modals, showAddUser: false });
//       setNewUser({ username: '', email: '', password: '', role: 'Traveler', photo: '' });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add user');
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       setLoading(true);
//       const updateData = {
//         username: currentUser.username,
//         email: currentUser.email,
//         role: currentUser.role,
//       };
//       if (currentUser.newPassword && currentUser.confirmPassword) {
//         if (currentUser.newPassword !== currentUser.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         if (currentUser.newPassword.length < 6) {
//           throw new Error('Password must be at least 6 characters');
//         }
//         updateData.password = currentUser.newPassword;
//       }
//       await api.put(`/admin/users/${currentUser._id}`, updateData);
//       setModals({ ...modals, showEditUser: false });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to update user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete user');
//       }
//     }
//   };

//   const handleAddTour = async () => {
//     try {
//       await api.post('/tours', newTour);
//       setModals({ ...modals, showAddTour: false });
//       setNewTour({
//         title: '',
//         city: '',
//         address: '',
//         distance: '',
//         photo: '',
//         desc: '',
//         price: '',
//         maxGroupSize: '',
//         featured: false,
//       });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add tour');
//     }
//   };

//   const handleUpdateTour = async () => {
//     try {
//       await api.put(`/tours/${currentTour._id}`, currentTour);
//       setModals({ ...modals, showEditTour: false });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update tour');
//     }
//   };

//   const handleDeleteTour = async (tourId) => {
//     if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
//       try {
//         await api.delete(`/tours/${tourId}`);
//         fetchTours();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete tour');
//       }
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         await api.delete(`/admin/bookings/${bookingId}`);
//         fetchBookings();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete booking');
//       }
//     }
//   };

//   const handleAcceptItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Accepted' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to accept itinerary');
//     }
//   };

//   const handleDeclineItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Declined' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to decline itinerary');
//     }
//   };

//   const handleDeletePayment = async (paymentId) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/payments/${paymentId}`);
//         fetchPayments();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete payment');
//       }
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await api.delete(`/review/${reviewId}`);
//         fetchReviews();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete review');
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   useEffect(() => {
//     switch (activeTab) {
//       case 'Dashboard':
//         // fetchDashboardData is already handled by the polling useEffect above
//         break;
//       case 'User Management':
//         fetchUsers();
//         break;
//       case 'Bookings':
//         fetchBookings();
//         break;
//       case 'Packages':
//         fetchTours();
//         break;
//       case 'Itineraries':
//         fetchItineraries();
//         break;
//       case 'Payments':
//         fetchPayments();
//         break;
//       case 'Reviews':
//         fetchReviews();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const toggleModal = (modalName, value) => {
//     setModals({ ...modals, [modalName]: value });
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return (
//           <DashboardTab
//             stats={dashboardStats}
//             chartData={chartData}
//             recentBookings={recentBookings}
//             setActiveTab={setActiveTab}
//           />
//         );
//       case 'User Management':
//         return (
//           <UserManagementTab
//             users={users}
//             loading={loading}
//             error={error}
//             newUser={newUser}
//             setNewUser={setNewUser}
//             currentUser={currentUser}
//             setCurrentUser={setCurrentUser}
//             handleAddUser={handleAddUser}
//             handleUpdateUser={handleUpdateUser}
//             handleDeleteUser={handleDeleteUser}
//             showAddUserModal={modals.showAddUser}
//             showEditUserModal={modals.showEditUser}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Bookings':
//         return (
//           <BookingManagementTab
//             bookings={bookings}
//             loading={loading}
//             columns={bookingColumns}
//             currentBooking={currentBooking}
//             setCurrentBooking={setCurrentBooking}
//             handleDeleteBooking={handleDeleteBooking}
//             showViewBookingModal={modals.showViewBooking}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Packages':
//         return (
//           <PackageManagementTab
//             tours={tours}
//             loading={loading}
//             newTour={newTour}
//             setNewTour={setNewTour}
//             currentTour={currentTour}
//             setCurrentTour={setCurrentTour}
//             handleAddTour={handleAddTour}
//             handleUpdateTour={handleUpdateTour}
//             handleDeleteTour={handleDeleteTour}
//             showAddTourModal={modals.showAddTour}
//             showEditTourModal={modals.showEditTour}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Itineraries':
//         return (
//           <ItineraryManagementTab
//             itineraries={itineraries}
//             loading={loading}
//             currentItinerary={currentItinerary}
//             setCurrentItinerary={setCurrentItinerary}
//             handleAcceptItinerary={handleAcceptItinerary}
//             handleDeclineItinerary={handleDeclineItinerary}
//             showViewItineraryModal={modals.showViewItinerary}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Payments':
//         return (
//           <PaymentManagementTab
//             payments={payments}
//             loading={loading}
//             handleDeletePayment={handleDeletePayment}
//           />
//         );
//       case 'Reviews':
//         return (
//           <ReviewManagementTab
//             reviews={reviews}
//             loading={loading}
//             handleDeleteReview={handleDeleteReview}
//           />
//         );
//       default:
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
//             <p className="text-gray-500">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         handleLogout={handleLogout}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header activeTab={activeTab} />
//         <main className="flex-1 overflow-y-auto bg-gray-100">
//           {renderTabContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import Sidebar from '../components/Admin/Sidebar';
// import Header from '../components/Admin/Header';
// import DashboardTab from '../components/Admin/DashboardTab';
// import UserManagementTab from '../components/Admin/UserManagementTab';
// import BookingManagementTab from '../components/Admin/BookingManagementTab';
// import PackageManagementTab from '../components/Admin/PackageManagementTab';
// import ItineraryManagementTab from '../components/Admin/ItineraryManagementTab';
// import PaymentManagementTab from '../components/Admin/PaymentManagementTab';
// import ReviewManagementTab from '../components/Admin/ReviewManagementTab';
// import '../styles/admin-dashboard.css';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Dashboard stats
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//     avgRating: 0,
//     totalGuides: 0,
//     totalTravelers: 0,
//     totalTours: 0,
//     totalReviews: 0,
//   });

//   // Chart data
//   const [chartData, setChartData] = useState({
//     revenueByTour: [],
//     bookingStatus: [],
//     userTypeData: [],
//   });

//   // Data arrays
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [itineraries, setItineraries] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   // Modal states
//   const [modals, setModals] = useState({
//     showAddUser: false,
//     showEditUser: false,
//     showAddTour: false,
//     showEditTour: false,
//     showViewBooking: false,
//     showViewItinerary: false,
//   });

//   // Form states
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Traveler',
//     photo: '',
//   });
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newTour, setNewTour] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: '',
//     photo: '',
//     desc: '',
//     price: '',
//     maxGroupSize: '',
//     featured: false,
//   });
//   const [currentTour, setCurrentTour] = useState(null);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [currentItinerary, setCurrentItinerary] = useState(null);

//   // Booking table columns
//   const bookingColumns = [
//     { header: 'Booking ID', accessor: 'id' },
//     { header: 'Customer', accessor: 'fullName' },
//     { header: 'Tour', accessor: 'tourName' },
//     { header: 'Date', accessor: 'bookAt' },
//     { header: 'Status', accessor: 'payment' },
//     { header: 'Amount', accessor: 'price' },
//   ];

//   // API calls
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const statsRes = await api.get('/admin/stats');
//       const statsData = statsRes.data.data;
//       setDashboardStats({
//         totalUsers: statsData.totalUsers,
//         totalGuides: statsData.totalGuides,
//         totalTravelers: statsData.totalTravelers,
//         totalTours: statsData.totalTours,
//         totalBookings: statsData.totalBookings,
//         totalReviews: statsData.totalReviews,
//         totalRevenue: statsData.totalRevenue, // Already in USD from backend
//         avgRating: statsData.avgRating,
//       });

//       const bookingsRes = await api.get('/booking/admin/all');
//       const recent = bookingsRes.data.data.slice(0, 5).map((booking) => ({
//         ...booking,
//         id: `#${booking._id.slice(-6)}`,
//         date: new Date(booking.createdAt).toLocaleDateString(),
//         status: booking.payment === 'completed' ? 'confirmed' : 'pending',
//         price: booking.price, // Already in USD if updated in createBooking
//       }));
//       setRecentBookings(recent);

//       const userTypeData = [
//         { name: 'Travelers', value: statsData.totalTravelers },
//         { name: 'Guides', value: statsData.totalGuides },
//         { name: 'Admins', value: statsData.totalUsers - statsData.totalTravelers - statsData.totalGuides },
//       ].filter(item => item.value > 0);

//       const revenueByTour = statsData.revenueByTour || [];
//       const bookingStatus = statsData.bookingStatus || [];

//       setChartData({ revenueByTour, bookingStatus, userTypeData });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling mechanism to fetch data every 30 seconds
//   useEffect(() => {
//     if (activeTab === 'Dashboard') {
//       fetchDashboardData();
//       const intervalId = setInterval(fetchDashboardData, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, [activeTab]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/users');
//       setUsers(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/booking/admin/all');
//       const transformedBookings = res.data.data.map((booking) => ({
//         _id: booking._id,
//         id: `#${booking._id.slice(-6)}`,
//         fullName: booking.fullName || 'N/A',
//         userEmail: booking.userEmail || booking.userId?.email || 'N/A',
//         tourName: booking.tourName || 'N/A',
//         guestSize: booking.guestSize ?? 0,
//         phone: booking.phone || 'N/A',
//         bookAt: booking.bookAt ? new Date(booking.bookAt).toLocaleDateString() : 'N/A',
//         payment: booking.payment || 'Pending',
//         price: booking.price ?? 0,
//       }));
//       setBookings(transformedBookings);
//       setRecentBookings(transformedBookings.slice(0, 5));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/tours');
//       setTours(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch tours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchItineraries = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/itineraries');
//       const transformedItineraries = res.data.data.map((itinerary) => ({
//         ...itinerary,
//         tourTitle: itinerary.tourId?.title || 'N/A',
//         status: itinerary.status || 'Pending',
//         submittedBy: itinerary.userId?.username || 'Traveler',
//       }));
//       setItineraries(transformedItineraries);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch itineraries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/payments');
//       setPayments(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/review');
//       const transformedReviews = res.data.data.map((review) => ({
//         _id: review._id,
//         id: `#${review._id.slice(-6)}`,
//         customer: review.userId?.username || 'Anonymous',
//         content: review.reviewText,
//         rating: review.rating,
//         date: new Date(review.createdAt).toLocaleDateString(),
//         tour: review.productId?.title || 'N/A',
//       }));
//       setReviews(transformedReviews);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handlers
//   const handleAddUser = async () => {
//     try {
//       await api.post('/admin/users', {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         role: newUser.role,
//         photo: newUser.photo,
//       });
//       setModals({ ...modals, showAddUser: false });
//       setNewUser({ username: '', email: '', password: '', role: 'Traveler', photo: '' });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add user');
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       setLoading(true);
//       const updateData = {
//         username: currentUser.username,
//         email: currentUser.email,
//         role: currentUser.role,
//       };
//       if (currentUser.newPassword && currentUser.confirmPassword) {
//         if (currentUser.newPassword !== currentUser.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         if (currentUser.newPassword.length < 6) {
//           throw new Error('Password must be at least 6 characters');
//         }
//         updateData.password = currentUser.newPassword;
//       }
//       await api.put(`/admin/users/${currentUser._id}`, updateData);
//       setModals({ ...modals, showEditUser: false });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to update user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete user');
//       }
//     }
//   };

//   const handleAddTour = async () => {
//     try {
//       await api.post('/tours', newTour);
//       setModals({ ...modals, showAddTour: false });
//       setNewTour({
//         title: '',
//         city: '',
//         address: '',
//         distance: '',
//         photo: '',
//         desc: '',
//         price: '',
//         maxGroupSize: '',
//         featured: false,
//       });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add tour');
//     }
//   };

//   const handleUpdateTour = async () => {
//     try {
//       await api.put(`/tours/${currentTour._id}`, currentTour);
//       setModals({ ...modals, showEditTour: false });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update tour');
//     }
//   };

//   const handleDeleteTour = async (tourId) => {
//     if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
//       try {
//         await api.delete(`/tours/${tourId}`);
//         fetchTours();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete tour');
//       }
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         await api.delete(`/admin/bookings/${bookingId}`);
//         fetchBookings();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete booking');
//       }
//     }
//   };

//   const handleAcceptItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Accepted' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to accept itinerary');
//     }
//   };

//   const handleDeclineItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Declined' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to decline itinerary');
//     }
//   };

//   const handleDeletePayment = async (paymentId) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/payments/${paymentId}`);
//         fetchPayments();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete payment');
//       }
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await api.delete(`/review/${reviewId}`);
//         fetchReviews();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete review');
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   useEffect(() => {
//     switch (activeTab) {
//       case 'Dashboard':
//         // fetchDashboardData is already handled by the polling useEffect above
//         break;
//       case 'User Management':
//         fetchUsers();
//         break;
//       case 'Bookings':
//         fetchBookings();
//         break;
//       case 'Packages':
//         fetchTours();
//         break;
//       case 'Itineraries':
//         fetchItineraries();
//         break;
//       case 'Payments':
//         fetchPayments();
//         break;
//       case 'Reviews':
//         fetchReviews();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const toggleModal = (modalName, value) => {
//     setModals({ ...modals, [modalName]: value });
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return (
//           <DashboardTab
//             stats={dashboardStats}
//             chartData={chartData}
//             recentBookings={recentBookings}
//             setActiveTab={setActiveTab}
//           />
//         );
//       case 'User Management':
//         return (
//           <UserManagementTab
//             users={users}
//             loading={loading}
//             error={error}
//             newUser={newUser}
//             setNewUser={setNewUser}
//             currentUser={currentUser}
//             setCurrentUser={setCurrentUser}
//             handleAddUser={handleAddUser}
//             handleUpdateUser={handleUpdateUser}
//             handleDeleteUser={handleDeleteUser}
//             showAddUserModal={modals.showAddUser}
//             showEditUserModal={modals.showEditUser}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Bookings':
//         return (
//           <BookingManagementTab
//             bookings={bookings}
//             loading={loading}
//             columns={bookingColumns}
//             currentBooking={currentBooking}
//             setCurrentBooking={setCurrentBooking}
//             handleDeleteBooking={handleDeleteBooking}
//             showViewBookingModal={modals.showViewBooking}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Packages':
//         return (
//           <PackageManagementTab
//             tours={tours}
//             loading={loading}
//             newTour={newTour}
//             setNewTour={setNewTour}
//             currentTour={currentTour}
//             setCurrentTour={setCurrentTour}
//             handleAddTour={handleAddTour}
//             handleUpdateTour={handleUpdateTour}
//             handleDeleteTour={handleDeleteTour}
//             showAddTourModal={modals.showAddTour}
//             showEditTourModal={modals.showEditTour}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Itineraries':
//         return (
//           <ItineraryManagementTab
//             itineraries={itineraries}
//             loading={loading}
//             currentItinerary={currentItinerary}
//             setCurrentItinerary={setCurrentItinerary}
//             handleAcceptItinerary={handleAcceptItinerary}
//             handleDeclineItinerary={handleDeclineItinerary}
//             showViewItineraryModal={modals.showViewItinerary}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Payments':
//         return (
//           <PaymentManagementTab
//             payments={payments}
//             loading={loading}
//             handleDeletePayment={handleDeletePayment}
//           />
//         );
//       case 'Reviews':
//         return (
//           <ReviewManagementTab
//             reviews={reviews}
//             loading={loading}
//             handleDeleteReview={handleDeleteReview}
//           />
//         );
//       default:
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
//             <p className="text-gray-500">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         handleLogout={handleLogout}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header activeTab={activeTab} />
//         <main className="flex-1 overflow-y-auto bg-gray-100">
//           {renderTabContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import Sidebar from '../components/Admin/Sidebar';
// import Header from '../components/Admin/Header';
// import DashboardTab from '../components/Admin/DashboardTab';
// import UserManagementTab from '../components/Admin/UserManagementTab';
// import BookingManagementTab from '../components/Admin/BookingManagementTab';
// import PackageManagementTab from '../components/Admin/PackageManagementTab';
// import ItineraryManagementTab from '../components/Admin/ItineraryManagementTab';
// import PaymentManagementTab from '../components/Admin/PaymentManagementTab';
// import ReviewManagementTab from '../components/Admin/ReviewManagementTab';
// import '../styles/admin-dashboard.css';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Dashboard stats
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//     avgRating: 0,
//     totalGuides: 0,
//     totalTravelers: 0,
//     totalTours: 0,
//     totalReviews: 0,
//   });

//   // Chart data
//   const [chartData, setChartData] = useState({
//     revenueByTour: [],
//     bookingStatus: [],
//     userTypeData: [],
//   });

//   // Data arrays
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [itineraries, setItineraries] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   // Modal states
//   const [modals, setModals] = useState({
//     showAddUser: false,
//     showEditUser: false,
//     showAddTour: false,
//     showEditTour: false,
//     showViewBooking: false,
//     showViewItinerary: false,
//   });

//   // Form states
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Traveler',
//     photo: '',
//   });
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newTour, setNewTour] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: '',
//     photo: '',
//     desc: '',
//     price: '',
//     maxGroupSize: '',
//     featured: false,
//   });
//   const [currentTour, setCurrentTour] = useState(null);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [currentItinerary, setCurrentItinerary] = useState(null);

//   // Booking table columns
//   const bookingColumns = [
//     { header: 'Booking ID', accessor: 'id' },
//     { header: 'Customer', accessor: 'fullName' },
//     { header: 'Tour', accessor: 'tourName' },
//     { header: 'Date', accessor: 'bookAt' },
//     { header: 'Status', accessor: 'payment' },
//     { header: 'Amount', accessor: 'price' },
//   ];

//   // API calls
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const statsRes = await api.get('/admin/stats');
//       const statsData = statsRes.data.data;
//       setDashboardStats({
//         totalUsers: statsData.totalUsers,
//         totalGuides: statsData.totalGuides,
//         totalTravelers: statsData.totalTravelers,
//         totalTours: statsData.totalTours,
//         totalBookings: statsData.totalBookings,
//         totalReviews: statsData.totalReviews,
//         totalRevenue: statsData.totalRevenue,
//         avgRating: statsData.avgRating,
//       });

//       const bookingsRes = await api.get('/booking/admin/all');
//       const recent = bookingsRes.data.data.slice(0, 5).map((booking) => ({
//         ...booking,
//         id: `#${booking._id.slice(-6)}`,
//         date: new Date(booking.createdAt).toLocaleDateString(),
//         status: booking.payment === 'completed' ? 'confirmed' : booking.payment,
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setRecentBookings(recent);

//       const userTypeData = [
//         { name: 'Travelers', value: statsData.totalTravelers },
//         { name: 'Guides', value: statsData.totalGuides },
//         { name: 'Admins', value: statsData.totalUsers - statsData.totalTravelers - statsData.totalGuides },
//       ].filter((item) => item.value > 0);

//       const revenueByTour = statsData.revenueByTour || [];
//       const bookingStatus = statsData.bookingStatus || [];

//       setChartData({ revenueByTour, bookingStatus, userTypeData });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/booking/admin/all');
//       console.log('Bookings API response:', res.data.data); // Debug log
//       const transformedBookings = res.data.data.map((booking) => ({
//         _id: booking._id,
//         id: `#${booking._id.slice(-6)}`,
//         fullName: booking.fullName || 'N/A',
//         userEmail: booking.userEmail || booking.userId?.email || 'N/A',
//         tourName: booking.tourName || 'N/A',
//         guestSize: booking.guestSize ?? 0,
//         phone: booking.phone || 'N/A',
//         bookAt: booking.bookAt ? new Date(booking.bookAt).toLocaleDateString() : 'N/A',
//         payment: booking.payment || 'Pending',
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setBookings(transformedBookings);
//       setRecentBookings(transformedBookings.slice(0, 5));
//     } catch (err) {
//       console.error('Fetch bookings error:', err); // Debug log
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//       setBookings([]); // Ensure bookings is an empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/users');
//       setUsers(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/tours');
//       setTours(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch tours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchItineraries = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/itineraries');
//       const transformedItineraries = res.data.data.map((itinerary) => ({
//         ...itinerary,
//         tourTitle: itinerary.tourId?.title || 'N/A',
//         status: itinerary.status || 'Pending',
//         submittedBy: itinerary.userId?.username || 'Traveler',
//       }));
//       setItineraries(transformedItineraries);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch itineraries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/payments');
//       setPayments(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/review');
//       const transformedReviews = res.data.data.map((review) => ({
//         _id: review._id,
//         id: `#${review._id.slice(-6)}`,
//         customer: review.userId?.username || 'Anonymous',
//         content: review.reviewText,
//         rating: review.rating,
//         date: new Date(review.createdAt).toLocaleDateString(),
//         tour: review.productId?.title || 'N/A',
//       }));
//       setReviews(transformedReviews);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling mechanism to fetch data every 30 seconds
//   useEffect(() => {
//     if (activeTab === 'Dashboard') {
//       fetchDashboardData();
//       const intervalId = setInterval(fetchDashboardData, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     switch (activeTab) {
//       case 'Dashboard':
//         // fetchDashboardData is already handled by the polling useEffect above
//         break;
//       case 'User Management':
//         fetchUsers();
//         break;
//       case 'Bookings':
//         fetchBookings();
//         break;
//       case 'Packages':
//         fetchTours();
//         break;
//       case 'Itineraries':
//         fetchItineraries();
//         break;
//       case 'Payments':
//         fetchPayments();
//         break;
//       case 'Reviews':
//         fetchReviews();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const toggleModal = (modalName, value) => {
//     setModals({ ...modals, [modalName]: value });
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return (
//           <DashboardTab
//             stats={dashboardStats}
//             chartData={chartData}
//             recentBookings={recentBookings}
//             setActiveTab={setActiveTab}
//           />
//         );
//       case 'User Management':
//         return (
//           <UserManagementTab
//             users={users}
//             loading={loading}
//             error={error}
//             newUser={newUser}
//             setNewUser={setNewUser}
//             currentUser={currentUser}
//             setCurrentUser={setCurrentUser}
//             handleAddUser={handleAddUser}
//             handleUpdateUser={handleUpdateUser}
//             handleDeleteUser={handleDeleteUser}
//             showAddUserModal={modals.showAddUser}
//             showEditUserModal={modals.showEditUser}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Bookings':
//         return (
//           <BookingManagementTab
//             bookings={bookings}
//             loading={loading}
//             columns={bookingColumns}
//             currentBooking={currentBooking}
//             setCurrentBooking={setCurrentBooking}
//             handleDeleteBooking={handleDeleteBooking}
//             showViewBookingModal={modals.showViewBooking}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Packages':
//         return (
//           <PackageManagementTab
//             tours={tours}
//             loading={loading}
//             newTour={newTour}
//             setNewTour={setNewTour}
//             currentTour={currentTour}
//             setCurrentTour={setCurrentTour}
//             handleAddTour={handleAddTour}
//             handleUpdateTour={handleUpdateTour}
//             handleDeleteTour={handleDeleteTour}
//             showAddTourModal={modals.showAddTour}
//             showEditTourModal={modals.showEditTour}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Itineraries':
//         return (
//           <ItineraryManagementTab
//             itineraries={itineraries}
//             loading={loading}
//             currentItinerary={currentItinerary}
//             setCurrentItinerary={setCurrentItinerary}
//             handleAcceptItinerary={handleAcceptItinerary}
//             handleDeclineItinerary={handleDeclineItinerary}
//             showViewItineraryModal={modals.showViewItinerary}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Payments':
//         return (
//           <PaymentManagementTab
//             payments={payments}
//             loading={loading}
//             handleDeletePayment={handleDeletePayment}
//           />
//         );
//       case 'Reviews':
//         return (
//           <ReviewManagementTab
//             reviews={reviews}
//             loading={loading}
//             handleDeleteReview={handleDeleteReview}
//           />
//         );
//       default:
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
//             <p className="text-gray-500">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//   const handleAddUser = async () => {
//     try {
//       await api.post('/admin/users', {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         role: newUser.role,
//         photo: newUser.photo,
//       });
//       setModals({ ...modals, showAddUser: false });
//       setNewUser({ username: '', email: '', password: '', role: 'Traveler', photo: '' });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add user');
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       setLoading(true);
//       const updateData = {
//         username: currentUser.username,
//         email: currentUser.email,
//         role: currentUser.role,
//       };
//       if (currentUser.newPassword && currentUser.confirmPassword) {
//         if (currentUser.newPassword !== currentUser.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         if (currentUser.newPassword.length < 6) {
//           throw new Error('Password must be at least 6 characters');
//         }
//         updateData.password = currentUser.newPassword;
//       }
//       await api.put(`/admin/users/${currentUser._id}`, updateData);
//       setModals({ ...modals, showEditUser: false });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to update user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete user');
//       }
//     }
//   };

//   const handleAddTour = async () => {
//     try {
//       await api.post('/tours', newTour);
//       setModals({ ...modals, showAddTour: false });
//       setNewTour({
//         title: '',
//         city: '',
//         address: '',
//         distance: '',
//         photo: '',
//         desc: '',
//         price: '',
//         maxGroupSize: '',
//         featured: false,
//       });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add tour');
//     }
//   };

//   const handleUpdateTour = async () => {
//     try {
//       await api.put(`/tours/${currentTour._id}`, currentTour);
//       setModals({ ...modals, showEditTour: false });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update tour');
//     }
//   };

//   const handleDeleteTour = async (tourId) => {
//     if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
//       try {
//         await api.delete(`/tours/${tourId}`);
//         fetchTours();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete tour');
//       }
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         await api.delete(`/admin/bookings/${bookingId}`);
//         fetchBookings();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete booking');
//       }
//     }
//   };

//   const handleAcceptItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Accepted' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to accept itinerary');
//     }
//   };

//   const handleDeclineItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Declined' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to decline itinerary');
//     }
//   };

//   const handleDeletePayment = async (paymentId) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/payments/${paymentId}`);
//         fetchPayments();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete payment');
//       }
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await api.delete(`/review/${reviewId}`);
//         fetchReviews();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete review');
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         handleLogout={handleLogout}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header activeTab={activeTab} />
//         <main className="flex-1 overflow-y-auto bg-gray-100">
//           {renderTabContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import Sidebar from '../components/Admin/Sidebar';
// import Header from '../components/Admin/Header';
// import DashboardTab from '../components/Admin/DashboardTab';
// import UserManagementTab from '../components/Admin/UserManagementTab';
// import BookingManagementTab from '../components/Admin/BookingManagementTab';
// import PackageManagementTab from '../components/Admin/PackageManagementTab';
// import ItineraryManagementTab from '../components/Admin/ItineraryManagementTab';
// import PaymentManagementTab from '../components/Admin/PaymentManagementTab';
// import ReviewManagementTab from '../components/Admin/ReviewManagementTab';
// import '../styles/admin-dashboard.css';

// // Backend base URL (replace with your actual backend URL)
// const BACKEND_BASE_URL = 'http://localhost:4000/api/v2'; // Adjust this to match your backend URL

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Dashboard stats
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//     avgRating: 0,
//     totalGuides: 0,
//     totalTravelers: 0,
//     totalTours: 0,
//     totalReviews: 0,
//   });

//   // Chart data
//   const [chartData, setChartData] = useState({
//     revenueByTour: [],
//     bookingStatus: [],
//     userTypeData: [],
//   });

//   // Data arrays
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [itineraries, setItineraries] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   // Modal states
//   const [modals, setModals] = useState({
//     showAddUser: false,
//     showEditUser: false,
//     showAddTour: false,
//     showEditTour: false,
//     showViewBooking: false,
//     showViewItinerary: false,
//   });

//   // Form states
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Traveler',
//     photo: '',
//   });
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newTour, setNewTour] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: '',
//     photo: null, // Change to store the file object
//     desc: '',
//     price: '',
//     maxGroupSize: '',
//     featured: false,
//   });
//   const [currentTour, setCurrentTour] = useState(null);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [currentItinerary, setCurrentItinerary] = useState(null);

//   // Booking table columns
//   const bookingColumns = [
//     { header: 'Booking ID', accessor: 'id' },
//     { header: 'Customer', accessor: 'fullName' },
//     { header: 'Tour', accessor: 'tourName' },
//     { header: 'Date', accessor: 'bookAt' },
//     { header: 'Status', accessor: 'payment' },
//     { header: 'Amount', accessor: 'price' },
//   ];

//   // API calls
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const statsRes = await api.get('/admin/stats');
//       const statsData = statsRes.data.data;
//       setDashboardStats({
//         totalUsers: statsData.totalUsers,
//         totalGuides: statsData.totalGuides,
//         totalTravelers: statsData.totalTravelers,
//         totalTours: statsData.totalTours,
//         totalBookings: statsData.totalBookings,
//         totalReviews: statsData.totalReviews,
//         totalRevenue: statsData.totalRevenue,
//         avgRating: statsData.avgRating,
//       });

//       const bookingsRes = await api.get('/booking/admin/all');
//       const recent = bookingsRes.data.data.slice(0, 5).map((booking) => ({
//         ...booking,
//         id: `#${booking._id.slice(-6)}`,
//         date: new Date(booking.createdAt).toLocaleDateString(),
//         status: booking.payment === 'completed' ? 'confirmed' : booking.payment,
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setRecentBookings(recent);

//       const userTypeData = [
//         { name: 'Travelers', value: statsData.totalTravelers },
//         { name: 'Guides', value: statsData.totalGuides },
//         { name: 'Admins', value: statsData.totalUsers - statsData.totalTravelers - statsData.totalGuides },
//       ].filter((item) => item.value > 0);

//       const revenueByTour = statsData.revenueByTour || [];
//       const bookingStatus = statsData.bookingStatus || [];

//       setChartData({ revenueByTour, bookingStatus, userTypeData });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/booking/admin/all');
//       console.log('Bookings API response:', res.data.data); // Debug log
//       const transformedBookings = res.data.data.map((booking) => ({
//         _id: booking._id,
//         id: `#${booking._id.slice(-6)}`,
//         fullName: booking.fullName || 'N/A',
//         userEmail: booking.userEmail || booking.userId?.email || 'N/A',
//         tourName: booking.tourName || 'N/A',
//         guestSize: booking.guestSize ?? 0,
//         phone: booking.phone || 'N/A',
//         bookAt: booking.bookAt ? new Date(booking.bookAt).toLocaleDateString() : 'N/A',
//         payment: booking.payment || 'Pending',
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setBookings(transformedBookings);
//       setRecentBookings(transformedBookings.slice(0, 5));
//     } catch (err) {
//       console.error('Fetch bookings error:', err); // Debug log
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//       setBookings([]); // Ensure bookings is an empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/users');
//       setUsers(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/tours');
//       // Transform the photo field to include the full URL
//       const transformedTours = res.data.data.map((tour) => ({
//         ...tour,
//         photo: tour.photo ? `${BACKEND_BASE_URL}/images/tours/${tour.photo}` : 'https://via.placeholder.com/150', // Fallback to placeholder if no photo
//       }));
//       setTours(transformedTours);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch tours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchItineraries = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/itineraries');
//       const transformedItineraries = res.data.data.map((itinerary) => ({
//         ...itinerary,
//         tourTitle: itinerary.tourId?.title || 'N/A',
//         status: itinerary.status || 'Pending',
//         submittedBy: itinerary.userId?.username || 'Traveler',
//       }));
//       setItineraries(transformedItineraries);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch itineraries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/payments');
//       setPayments(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/review');
//       const transformedReviews = res.data.data.map((review) => ({
//         _id: review._id,
//         id: `#${review._id.slice(-6)}`,
//         customer: review.userId?.username || 'Anonymous',
//         content: review.reviewText,
//         rating: review.rating,
//         date: new Date(review.createdAt).toLocaleDateString(),
//         tour: review.productId?.title || 'N/A',
//       }));
//       setReviews(transformedReviews);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling mechanism to fetch data every 30 seconds
//   useEffect(() => {
//     if (activeTab === 'Dashboard') {
//       fetchDashboardData();
//       const intervalId = setInterval(fetchDashboardData, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     switch (activeTab) {
//       case 'Dashboard':
//         // fetchDashboardData is already handled by the polling useEffect above
//         break;
//       case 'User Management':
//         fetchUsers();
//         break;
//       case 'Bookings':
//         fetchBookings();
//         break;
//       case 'Packages':
//         fetchTours();
//         break;
//       case 'Itineraries':
//         fetchItineraries();
//         break;
//       case 'Payments':
//         fetchPayments();
//         break;
//       case 'Reviews':
//         fetchReviews();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const toggleModal = (modalName, value) => {
//     setModals({ ...modals, [modalName]: value });
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return (
//           <DashboardTab
//             stats={dashboardStats}
//             chartData={chartData}
//             recentBookings={recentBookings}
//             setActiveTab={setActiveTab}
//           />
//         );
//       case 'User Management':
//         return (
//           <UserManagementTab
//             users={users}
//             loading={loading}
//             error={error}
//             newUser={newUser}
//             setNewUser={setNewUser}
//             currentUser={currentUser}
//             setCurrentUser={setCurrentUser}
//             handleAddUser={handleAddUser}
//             handleUpdateUser={handleUpdateUser}
//             handleDeleteUser={handleDeleteUser}
//             showAddUserModal={modals.showAddUser}
//             showEditUserModal={modals.showEditUser}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Bookings':
//         return (
//           <BookingManagementTab
//             bookings={bookings}
//             loading={loading}
//             columns={bookingColumns}
//             currentBooking={currentBooking}
//             setCurrentBooking={setCurrentBooking}
//             handleDeleteBooking={handleDeleteBooking}
//             showViewBookingModal={modals.showViewBooking}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Packages':
//         return (
//           <PackageManagementTab
//             tours={tours}
//             loading={loading}
//             newTour={newTour}
//             setNewTour={setNewTour}
//             currentTour={currentTour}
//             setCurrentTour={setCurrentTour}
//             handleAddTour={handleAddTour}
//             handleUpdateTour={handleUpdateTour}
//             handleDeleteTour={handleDeleteTour}
//             showAddTourModal={modals.showAddTour}
//             showEditTourModal={modals.showEditTour}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Itineraries':
//         return (
//           <ItineraryManagementTab
//             itineraries={itineraries}
//             loading={loading}
//             currentItinerary={currentItinerary}
//             setCurrentItinerary={setCurrentItinerary}
//             handleAcceptItinerary={handleAcceptItinerary}
//             handleDeclineItinerary={handleDeclineItinerary}
//             showViewItineraryModal={modals.showViewItinerary}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Payments':
//         return (
//           <PaymentManagementTab
//             payments={payments}
//             loading={loading}
//             handleDeletePayment={handleDeletePayment}
//           />
//         );
//       case 'Reviews':
//         return (
//           <ReviewManagementTab
//             reviews={reviews}
//             loading={loading}
//             handleDeleteReview={handleDeleteReview}
//           />
//         );
//       default:
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
//             <p className="text-gray-500">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//   const handleAddUser = async () => {
//     try {
//       await api.post('/admin/users', {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         role: newUser.role,
//         photo: newUser.photo,
//       });
//       setModals({ ...modals, showAddUser: false });
//       setNewUser({ username: '', email: '', password: '', role: 'Traveler', photo: '' });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add user');
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       setLoading(true);
//       const updateData = {
//         username: currentUser.username,
//         email: currentUser.email,
//         role: currentUser.role,
//       };
//       if (currentUser.newPassword && currentUser.confirmPassword) {
//         if (currentUser.newPassword !== currentUser.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         if (currentUser.newPassword.length < 6) {
//           throw new Error('Password must be at least 6 characters');
//         }
//         updateData.password = currentUser.newPassword;
//       }
//       await api.put(`/admin/users/${currentUser._id}`, updateData);
//       setModals({ ...modals, showEditUser: false });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to update user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete user');
//       }
//     }
//   };

//   const handleAddTour = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', newTour.title);
//       formData.append('city', newTour.city);
//       formData.append('address', newTour.address);
//       formData.append('distance', newTour.distance);
//       formData.append('desc', newTour.desc);
//       formData.append('price', newTour.price);
//       formData.append('maxGroupSize', newTour.maxGroupSize);
//       formData.append('featured', newTour.featured);
//       if (newTour.photo) {
//         formData.append('photo', newTour.photo); // Append the file object
//       }

//       await api.post('/tours', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setModals({ ...modals, showAddTour: false });
//       setNewTour({
//         title: '',
//         city: '',
//         address: '',
//         distance: '',
//         photo: null,
//         desc: '',
//         price: '',
//         maxGroupSize: '',
//         featured: false,
//       });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add tour');
//     }
//   };

//   const handleUpdateTour = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', currentTour.title);
//       formData.append('city', currentTour.city);
//       formData.append('address', currentTour.address);
//       formData.append('distance', currentTour.distance);
//       formData.append('desc', currentTour.desc);
//       formData.append('price', currentTour.price);
//       formData.append('maxGroupSize', currentTour.maxGroupSize);
//       formData.append('featured', currentTour.featured);
//       if (currentTour.photo && typeof currentTour.photo !== 'string') {
//         formData.append('photo', currentTour.photo); // Append the file object if a new photo is uploaded
//       }

//       await api.put(`/tours/${currentTour._id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setModals({ ...modals, showEditTour: false });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update tour');
//     }
//   };

//   const handleDeleteTour = async (tourId) => {
//     if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
//       try {
//         await api.delete(`/tours/${tourId}`);
//         fetchTours();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete tour');
//       }
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         await api.delete(`/admin/bookings/${bookingId}`);
//         fetchBookings();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete booking');
//       }
//     }
//   };

//   const handleAcceptItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Accepted' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to accept itinerary');
//     }
//   };

//   const handleDeclineItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Declined' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to decline itinerary');
//     }
//   };

//   const handleDeletePayment = async (paymentId) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/payments/${paymentId}`);
//         fetchPayments();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete payment');
//       }
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await api.delete(`/review/${reviewId}`);
//         fetchReviews();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete review');
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         handleLogout={handleLogout}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header activeTab={activeTab} />
//         <main className="flex-1 overflow-y-auto bg-gray-100">
//           {renderTabContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import Sidebar from '../components/Admin/Sidebar';
// import Header from '../components/Admin/Header';
// import DashboardTab from '../components/Admin/DashboardTab';
// import UserManagementTab from '../components/Admin/UserManagementTab';
// import BookingManagementTab from '../components/Admin/BookingManagementTab';
// import PackageManagementTab from '../components/Admin/PackageManagementTab';
// import ItineraryManagementTab from '../components/Admin/ItineraryManagementTab';
// import PaymentManagementTab from '../components/Admin/PaymentManagementTab';
// import ReviewManagementTab from '../components/Admin/ReviewManagementTab';
// import '../styles/admin-dashboard.css';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Dashboard stats
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//     avgRating: 0,
//     totalGuides: 0,
//     totalTravelers: 0,
//     totalTours: 0,
//     totalReviews: 0,
//   });

//   // Chart data
//   const [chartData, setChartData] = useState({
//     revenueByTour: [],
//     bookingStatus: [],
//     userTypeData: [],
//   });

//   // Data arrays
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [itineraries, setItineraries] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   // Modal states
//   const [modals, setModals] = useState({
//     showAddUser: false,
//     showEditUser: false,
//     showAddTour: false,
//     showEditTour: false,
//     showViewBooking: false,
//     showViewItinerary: false,
//   });

//   // Form states
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Traveler',
//     photo: '',
//   });
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newTour, setNewTour] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: '',
//     photo: '',
//     desc: '',
//     price: '',
//     maxGroupSize: '',
//     featured: false,
//   });
//   const [currentTour, setCurrentTour] = useState(null);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [currentItinerary, setCurrentItinerary] = useState(null);

//   // Booking table columns
//   const bookingColumns = [
//     { header: 'Booking ID', accessor: 'id' },
//     { header: 'Customer', accessor: 'fullName' },
//     { header: 'Tour', accessor: 'tourName' },
//     { header: 'Date', accessor: 'bookAt' },
//     { header: 'Status', accessor: 'payment' },
//     { header: 'Amount', accessor: 'price' },
//   ];

//   // API calls
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const statsRes = await api.get('/admin/stats');
//       const statsData = statsRes.data.data;
//       setDashboardStats({
//         totalUsers: statsData.totalUsers,
//         totalGuides: statsData.totalGuides,
//         totalTravelers: statsData.totalTravelers,
//         totalTours: statsData.totalTours,
//         totalBookings: statsData.totalBookings,
//         totalReviews: statsData.totalReviews,
//         totalRevenue: statsData.totalRevenue,
//         avgRating: statsData.avgRating,
//       });

//       const bookingsRes = await api.get('/booking/admin/all');
//       const recent = bookingsRes.data.data.slice(0, 5).map((booking) => ({
//         ...booking,
//         id: `#${booking._id.slice(-6)}`,
//         date: new Date(booking.createdAt).toLocaleDateString(),
//         status: booking.payment === 'completed' ? 'confirmed' : booking.payment,
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setRecentBookings(recent);

//       const userTypeData = [
//         { name: 'Travelers', value: statsData.totalTravelers },
//         { name: 'Guides', value: statsData.totalGuides },
//         { name: 'Admins', value: statsData.totalUsers - statsData.totalTravelers - statsData.totalGuides },
//       ].filter((item) => item.value > 0);

//       const revenueByTour = statsData.revenueByTour || [];
//       const bookingStatus = statsData.bookingStatus || [];

//       setChartData({ revenueByTour, bookingStatus, userTypeData });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/booking/admin/all');
//       console.log('Bookings API response:', res.data.data); // Debug log
//       const transformedBookings = res.data.data.map((booking) => ({
//         _id: booking._id,
//         id: `#${booking._id.slice(-6)}`,
//         fullName: booking.fullName || 'N/A',
//         userEmail: booking.userEmail || booking.userId?.email || 'N/A',
//         tourName: booking.tourName || 'N/A',
//         guestSize: booking.guestSize ?? 0,
//         phone: booking.phone || 'N/A',
//         bookAt: booking.bookAt ? new Date(booking.bookAt).toLocaleDateString() : 'N/A',
//         payment: booking.payment || 'Pending',
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setBookings(transformedBookings);
//       setRecentBookings(transformedBookings.slice(0, 5));
//     } catch (err) {
//       console.error('Fetch bookings error:', err); // Debug log
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//       setBookings([]); // Ensure bookings is an empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/users');
//       setUsers(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const fetchTours = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const res = await api.get('/tours');
//   //     setTours(res.data.data);
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || 'Failed to fetch tours');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchTours = async () => {
//     try {
//         setLoading(true);
//         const res = await api.get('/admin/tours', { params: { limit: 100 } });
//         setTours(res.data.data);
//     } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch tours');
//     } finally {
//         setLoading(false);
//     }
// };

//   const fetchItineraries = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/itineraries');
//       const transformedItineraries = res.data.data.map((itinerary) => ({
//         ...itinerary,
//         tourTitle: itinerary.tourId?.title || 'N/A',
//         status: itinerary.status || 'Pending',
//         submittedBy: itinerary.userId?.username || 'Traveler',
//       }));
//       setItineraries(transformedItineraries);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch itineraries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/payments');
//       setPayments(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/review');
//       const transformedReviews = res.data.data.map((review) => ({
//         _id: review._id,
//         id: `#${review._id.slice(-6)}`,
//         customer: review.userId?.username || 'Anonymous',
//         content: review.reviewText,
//         rating: review.rating,
//         date: new Date(review.createdAt).toLocaleDateString(),
//         tour: review.productId?.title || 'N/A',
//       }));
//       setReviews(transformedReviews);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling mechanism to fetch data every 30 seconds
//   useEffect(() => {
//     if (activeTab === 'Dashboard') {
//       fetchDashboardData();
//       const intervalId = setInterval(fetchDashboardData, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     switch (activeTab) {
//       case 'Dashboard':
//         // fetchDashboardData is already handled by the polling useEffect above
//         break;
//       case 'User Management':
//         fetchUsers();
//         break;
//       case 'Bookings':
//         fetchBookings();
//         break;
//       case 'Packages':
//         fetchTours();
//         break;
//       case 'Itineraries':
//         fetchItineraries();
//         break;
//       case 'Payments':
//         fetchPayments();
//         break;
//       case 'Reviews':
//         fetchReviews();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const toggleModal = (modalName, value) => {
//     setModals({ ...modals, [modalName]: value });
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return (
//           <DashboardTab
//             stats={dashboardStats}
//             chartData={chartData}
//             recentBookings={recentBookings}
//             setActiveTab={setActiveTab}
//           />
//         );
//       case 'User Management':
//         return (
//           <UserManagementTab
//             users={users}
//             loading={loading}
//             error={error}
//             newUser={newUser}
//             setNewUser={setNewUser}
//             currentUser={currentUser}
//             setCurrentUser={setCurrentUser}
//             handleAddUser={handleAddUser}
//             handleUpdateUser={handleUpdateUser}
//             handleDeleteUser={handleDeleteUser}
//             showAddUserModal={modals.showAddUser}
//             showEditUserModal={modals.showEditUser}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Bookings':
//         return (
//           <BookingManagementTab
//             bookings={bookings}
//             loading={loading}
//             columns={bookingColumns}
//             currentBooking={currentBooking}
//             setCurrentBooking={setCurrentBooking}
//             handleDeleteBooking={handleDeleteBooking}
//             showViewBookingModal={modals.showViewBooking}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Packages':
//         return (
//           <PackageManagementTab
//             tours={tours}
//             loading={loading}
//             newTour={newTour}
//             setNewTour={setNewTour}
//             currentTour={currentTour}
//             setCurrentTour={setCurrentTour}
//             handleAddTour={handleAddTour}
//             handleUpdateTour={handleUpdateTour}
//             handleDeleteTour={handleDeleteTour}
//             showAddTourModal={modals.showAddTour}
//             showEditTourModal={modals.showEditTour}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Itineraries':
//         return (
//           <ItineraryManagementTab
//             itineraries={itineraries}
//             loading={loading}
//             currentItinerary={currentItinerary}
//             setCurrentItinerary={setCurrentItinerary}
//             handleAcceptItinerary={handleAcceptItinerary}
//             handleDeclineItinerary={handleDeclineItinerary}
//             showViewItineraryModal={modals.showViewItinerary}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Payments':
//         return (
//           <PaymentManagementTab
//             payments={payments}
//             loading={loading}
//             handleDeletePayment={handleDeletePayment}
//           />
//         );
//       case 'Reviews':
//         return (
//           <ReviewManagementTab
//             reviews={reviews}
//             loading={loading}
//             handleDeleteReview={handleDeleteReview}
//           />
//         );
//       default:
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
//             <p className="text-gray-500">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//   const handleAddUser = async () => {
//     try {
//       await api.post('/admin/users', {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         role: newUser.role,
//         photo: newUser.photo,
//       });
//       setModals({ ...modals, showAddUser: false });
//       setNewUser({ username: '', email: '', password: '', role: 'Traveler', photo: '' });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add user');
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       setLoading(true);
//       const updateData = {
//         username: currentUser.username,
//         email: currentUser.email,
//         role: currentUser.role,
//       };
//       if (currentUser.newPassword && currentUser.confirmPassword) {
//         if (currentUser.newPassword !== currentUser.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         if (currentUser.newPassword.length < 6) {
//           throw new Error('Password must be at least 6 characters');
//         }
//         updateData.password = currentUser.newPassword;
//       }
//       await api.put(`/admin/users/${currentUser._id}`, updateData);
//       setModals({ ...modals, showEditUser: false });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to update user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete user');
//       }
//     }
//   };

//   const handleAddTour = async () => {
//     try {
//       await api.post('/tours', newTour);
//       setModals({ ...modals, showAddTour: false });
//       setNewTour({
//         title: '',
//         city: '',
//         address: '',
//         distance: '',
//         photo: '',
//         desc: '',
//         price: '',
//         maxGroupSize: '',
//         featured: false,
//       });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add tour');
//     }
//   };

//   const handleUpdateTour = async () => {
//     try {
//       await api.put(`/tours/${currentTour._id}`, currentTour);
//       setModals({ ...modals, showEditTour: false });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update tour');
//     }
//   };

//   const handleDeleteTour = async (tourId) => {
//     if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
//       try {
//         await api.delete(`/tours/${tourId}`);
//         fetchTours();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete tour');
//       }
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         await api.delete(`/admin/bookings/${bookingId}`);
//         fetchBookings();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete booking');
//       }
//     }
//   };

//   const handleAcceptItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Accepted' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to accept itinerary');
//     }
//   };

//   const handleDeclineItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/itineraries/${itineraryId}/status`, { status: 'Declined' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to decline itinerary');
//     }
//   };

//   const handleDeletePayment = async (paymentId) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/payments/${paymentId}`);
//         fetchPayments();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete payment');
//       }
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await api.delete(`/review/${reviewId}`);
//         fetchReviews();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete review');
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         handleLogout={handleLogout}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header activeTab={activeTab} />
//         <main className="flex-1 overflow-y-auto bg-gray-100">
//           {renderTabContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import Sidebar from '../components/Admin/Sidebar';
// import Header from '../components/Admin/Header';
// import DashboardTab from '../components/Admin/DashboardTab';
// import UserManagementTab from '../components/Admin/UserManagementTab';
// import BookingManagementTab from '../components/Admin/BookingManagementTab';
// import PackageManagementTab from '../components/Admin/PackageManagementTab';
// import ItineraryManagementTab from '../components/Admin/ItineraryManagementTab';
// import PaymentManagementTab from '../components/Admin/PaymentManagementTab';
// import ReviewManagementTab from '../components/Admin/ReviewManagementTab';
// import '../styles/admin-dashboard.css';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Dashboard stats
//   const [dashboardStats, setDashboardStats] = useState({
//     totalBookings: 0,
//     totalUsers: 0,
//     totalRevenue: 0,
//     avgRating: 0,
//     totalGuides: 0,
//     totalTravelers: 0,
//     totalTours: 0,
//     totalReviews: 0,
//   });

//   // Chart data
//   const [chartData, setChartData] = useState({
//     revenueByTour: [],
//     bookingStatus: [],
//     userTypeData: [],
//   });

//   // Data arrays
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [itineraries, setItineraries] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   // Modal states
//   const [modals, setModals] = useState({
//     showAddUser: false,
//     showEditUser: false,
//     showAddTour: false,
//     showEditTour: false,
//     showViewBooking: false,
//     showViewItinerary: false,
//   });

//   // Form states
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'Traveler',
//     photo: '',
//   });
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newTour, setNewTour] = useState({
//     title: '',
//     city: '',
//     address: '',
//     distance: '',
//     photo: '',
//     desc: '',
//     price: '',
//     maxGroupSize: '',
//     featured: false,
//   });
//   const [currentTour, setCurrentTour] = useState(null);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [currentItinerary, setCurrentItinerary] = useState(null);

//   // Booking table columns
//   const bookingColumns = [
//     { header: 'Booking ID', accessor: 'id' },
//     { header: 'Customer', accessor: 'fullName' },
//     { header: 'Tour', accessor: 'tourName' },
//     { header: 'Date', accessor: 'bookAt' },
//     { header: 'Status', accessor: 'payment' },
//     { header: 'Amount', accessor: 'price' },
//   ];

//   // API calls
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const statsRes = await api.get('/admin/stats');
//       const statsData = statsRes.data.data;
//       setDashboardStats({
//         totalUsers: statsData.totalUsers,
//         totalGuides: statsData.totalGuides,
//         totalTravelers: statsData.totalTravelers,
//         totalTours: statsData.totalTours,
//         totalBookings: statsData.totalBookings,
//         totalReviews: statsData.totalReviews,
//         totalRevenue: statsData.totalRevenue,
//         avgRating: statsData.avgRating,
//       });

//       const bookingsRes = await api.get('/booking/admin/all');
//       const recent = bookingsRes.data.data.slice(0, 5).map((booking) => ({
//         ...booking,
//         id: `#${booking._id.slice(-6)}`,
//         date: new Date(booking.createdAt).toLocaleDateString(),
//         status: booking.payment === 'completed' ? 'confirmed' : booking.payment,
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setRecentBookings(recent);

//       const userTypeData = [
//         { name: 'Travelers', value: statsData.totalTravelers },
//         { name: 'Guides', value: statsData.totalGuides },
//         { name: 'Admins', value: statsData.totalUsers - statsData.totalTravelers - statsData.totalGuides },
//       ].filter((item) => item.value > 0);

//       const revenueByTour = statsData.revenueByTour || [];
//       const bookingStatus = statsData.bookingStatus || [];

//       setChartData({ revenueByTour, bookingStatus, userTypeData });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/booking/admin/all');
//       console.log('Bookings API response:', res.data.data); // Debug log
//       const transformedBookings = res.data.data.map((booking) => ({
//         _id: booking._id,
//         id: `#${booking._id.slice(-6)}`,
//         fullName: booking.fullName || 'N/A',
//         userEmail: booking.userEmail || booking.userId?.email || 'N/A',
//         tourName: booking.tourName || 'N/A',
//         guestSize: booking.guestSize ?? 0,
//         phone: booking.phone || 'N/A',
//         bookAt: booking.bookAt ? new Date(booking.bookAt).toLocaleDateString() : 'N/A',
//         payment: booking.payment || 'Pending',
//         price: booking.originalPrice
//           ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
//           : `₨${(booking.price || 0).toLocaleString()}`,
//       }));
//       setBookings(transformedBookings);
//       setRecentBookings(transformedBookings.slice(0, 5));
//     } catch (err) {
//       console.error('Fetch bookings error:', err); // Debug log
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//       setBookings([]); // Ensure bookings is an empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/users');
//       setUsers(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/admin/tours', { params: { limit: 100 } });
//       setTours(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch tours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchItineraries = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/admin/itineraries');
//       const transformedItineraries = res.data.data.map((itinerary) => ({
//         ...itinerary,
//         tourTitle: itinerary.tourName || 'N/A', // Use tourName since tourId isn't a field
//         status: itinerary.status || 'Pending',
//         submittedBy: itinerary.userId?.username || 'Traveler',
//         details: itinerary.descriptionItinerary || 'No details provided', // Add details for the modal
//       }));
//       setItineraries(transformedItineraries);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch itineraries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/payments');
//       setPayments(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/review');
//       const transformedReviews = res.data.data.map((review) => ({
//         _id: review._id,
//         id: `#${review._id.slice(-6)}`,
//         customer: review.userId?.username || 'Anonymous',
//         content: review.reviewText,
//         rating: review.rating,
//         date: new Date(review.createdAt).toLocaleDateString(),
//         tour: review.productId?.title || 'N/A',
//       }));
//       setReviews(transformedReviews);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling mechanism to fetch data every 30 seconds
//   useEffect(() => {
//     if (activeTab === 'Dashboard') {
//       fetchDashboardData();
//       const intervalId = setInterval(fetchDashboardData, 30000);
//       return () => clearInterval(intervalId);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     switch (activeTab) {
//       case 'Dashboard':
//         // fetchDashboardData is already handled by the polling useEffect above
//         break;
//       case 'User Management':
//         fetchUsers();
//         break;
//       case 'Bookings':
//         fetchBookings();
//         break;
//       case 'Packages':
//         fetchTours();
//         break;
//       case 'Itineraries':
//         fetchItineraries();
//         break;
//       case 'Payments':
//         fetchPayments();
//         break;
//       case 'Reviews':
//         fetchReviews();
//         break;
//       default:
//         break;
//     }
//   }, [activeTab]);

//   const toggleModal = (modalName, value) => {
//     setModals({ ...modals, [modalName]: value });
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return (
//           <DashboardTab
//             stats={dashboardStats}
//             chartData={chartData}
//             recentBookings={recentBookings}
//             setActiveTab={setActiveTab}
//           />
//         );
//       case 'User Management':
//         return (
//           <UserManagementTab
//             users={users}
//             loading={loading}
//             error={error}
//             newUser={newUser}
//             setNewUser={setNewUser}
//             currentUser={currentUser}
//             setCurrentUser={setCurrentUser}
//             handleAddUser={handleAddUser}
//             handleUpdateUser={handleUpdateUser}
//             handleDeleteUser={handleDeleteUser}
//             showAddUserModal={modals.showAddUser}
//             showEditUserModal={modals.showEditUser}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Bookings':
//         return (
//           <BookingManagementTab
//             bookings={bookings}
//             loading={loading}
//             columns={bookingColumns}
//             currentBooking={currentBooking}
//             setCurrentBooking={setCurrentBooking}
//             handleDeleteBooking={handleDeleteBooking}
//             showViewBookingModal={modals.showViewBooking}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Packages':
//         return (
//           <PackageManagementTab
//             tours={tours}
//             loading={loading}
//             newTour={newTour}
//             setNewTour={setNewTour}
//             currentTour={currentTour}
//             setCurrentTour={setCurrentTour}
//             handleAddTour={handleAddTour}
//             handleUpdateTour={handleUpdateTour}
//             handleDeleteTour={handleDeleteTour}
//             showAddTourModal={modals.showAddTour}
//             showEditTourModal={modals.showEditTour}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Itineraries':
//         return (
//           <ItineraryManagementTab
//             itineraries={itineraries}
//             loading={loading}
//             currentItinerary={currentItinerary}
//             setCurrentItinerary={setCurrentItinerary}
//             handleAcceptItinerary={handleAcceptItinerary}
//             handleDeclineItinerary={handleDeclineItinerary}
//             showViewItineraryModal={modals.showViewItinerary}
//             toggleModal={toggleModal}
//           />
//         );
//       case 'Payments':
//         return (
//           <PaymentManagementTab
//             payments={payments}
//             loading={loading}
//             handleDeletePayment={handleDeletePayment}
//           />
//         );
//       case 'Reviews':
//         return (
//           <ReviewManagementTab
//             reviews={reviews}
//             loading={loading}
//             handleDeleteReview={handleDeleteReview}
//           />
//         );
//       default:
//         return (
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
//             <p className="text-gray-500">This section is under development.</p>
//           </div>
//         );
//     }
//   };

//   const handleAddUser = async () => {
//     try {
//       await api.post('/admin/users', {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         role: newUser.role,
//         photo: newUser.photo,
//       });
//       setModals({ ...modals, showAddUser: false });
//       setNewUser({ username: '', email: '', password: '', role: 'Traveler', photo: '' });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add user');
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       setLoading(true);
//       const updateData = {
//         username: currentUser.username,
//         email: currentUser.email,
//         role: currentUser.role,
//       };
//       if (currentUser.newPassword && currentUser.confirmPassword) {
//         if (currentUser.newPassword !== currentUser.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         if (currentUser.newPassword.length < 6) {
//           throw new Error('Password must be at least 6 characters');
//         }
//         updateData.password = currentUser.newPassword;
//       }
//       await api.put(`/admin/users/${currentUser._id}`, updateData);
//       setModals({ ...modals, showEditUser: false });
//       fetchUsers();
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Failed to update user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`/users/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete user');
//       }
//     }
//   };

//   const handleAddTour = async () => {
//     try {
//       await api.post('/tours', newTour);
//       setModals({ ...modals, showAddTour: false });
//       setNewTour({
//         title: '',
//         city: '',
//         address: '',
//         distance: '',
//         photo: '',
//         desc: '',
//         price: '',
//         maxGroupSize: '',
//         featured: false,
//       });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add tour');
//     }
//   };

//   const handleUpdateTour = async () => {
//     try {
//       await api.put(`/tours/${currentTour._id}`, currentTour);
//       setModals({ ...modals, showEditTour: false });
//       fetchTours();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update tour');
//     }
//   };

//   const handleDeleteTour = async (tourId) => {
//     if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
//       try {
//         await api.delete(`/tours/${tourId}`);
//         fetchTours();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete tour');
//       }
//     }
//   };

//   const handleDeleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         await api.delete(`/admin/bookings/${bookingId}`);
//         fetchBookings();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete booking');
//       }
//     }
//   };

//   const handleAcceptItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/admin/itineraries/${itineraryId}/status`, { status: 'accepted' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to accept itinerary');
//     }
//   };

//   const handleDeclineItinerary = async (itineraryId) => {
//     try {
//       await api.put(`/admin/itineraries/${itineraryId}/status`, { status: 'declined' });
//       fetchItineraries();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to decline itinerary');
//     }
//   };

//   const handleDeletePayment = async (paymentId) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/payments/${paymentId}`);
//         fetchPayments();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete payment');
//       }
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       try {
//         await api.delete(`/review/${reviewId}`);
//         fetchReviews();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete review');
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         handleLogout={handleLogout}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header activeTab={activeTab} />
//         <main className="flex-1 overflow-y-auto bg-gray-100">
//           {renderTabContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Sidebar from '../components/Admin/Sidebar';
import Header from '../components/Admin/Header';
import DashboardTab from '../components/Admin/DashboardTab';
import UserManagementTab from '../components/Admin/UserManagementTab';
import BookingManagementTab from '../components/Admin/BookingManagementTab';
import PackageManagementTab from '../components/Admin/PackageManagementTab';
import ItineraryManagementTab from '../components/Admin/ItineraryManagementTab';
import '../styles/admin-dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    avgRating: 0,
    totalGuides: 0,
    totalTravelers: 0,
    totalTours: 0,
    totalReviews: 0,
  });

  // Chart data
  const [chartData, setChartData] = useState({
    revenueByTour: [],
    bookingStatus: [],
    userTypeData: [],
  });

  // Data arrays
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  // Modal states
  const [modals, setModals] = useState({
    showAddUser: false,
    showEditUser: false,
    showAddTour: false,
    showEditTour: false,
    showViewBooking: false,
    showViewItinerary: false,
  });

  // Form states
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Traveler',
    photo: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [newTour, setNewTour] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false,
  });
  const [currentTour, setCurrentTour] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentItinerary, setCurrentItinerary] = useState(null);

  // Booking table columns
  const bookingColumns = [
    { header: 'Booking ID', accessor: 'id' },
    { header: 'Customer', accessor: 'fullName' },
    { header: 'Tour', accessor: 'tourName' },
    { header: 'Date', accessor: 'bookAt' },
    { header: 'Status', accessor: 'payment' },
    { header: 'Amount', accessor: 'price' },
  ];

  // API calls
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const statsRes = await api.get('/admin/stats');
      const statsData = statsRes.data.data;
      setDashboardStats({
        totalUsers: statsData.totalUsers,
        totalGuides: statsData.totalGuides,
        totalTravelers: statsData.totalTravelers,
        totalTours: statsData.totalTours,
        totalBookings: statsData.totalBookings,
        totalReviews: statsData.totalReviews,
        totalRevenue: statsData.totalRevenue,
        avgRating: statsData.avgRating,
      });

      const bookingsRes = await api.get('/booking/admin/all');
      const recent = bookingsRes.data.data.slice(0, 5).map((booking) => ({
        ...booking,
        id: `#${booking._id.slice(-6)}`,
        date: new Date(booking.createdAt).toLocaleDateString(),
        status: booking.payment === 'completed' ? 'confirmed' : booking.payment,
        price: booking.originalPrice
          ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
          : `₨${(booking.price || 0).toLocaleString()}`,
      }));
      setRecentBookings(recent);

      const userTypeData = [
        { name: 'Travelers', value: statsData.totalTravelers },
        { name: 'Guides', value: statsData.totalGuides },
        { name: 'Admins', value: statsData.totalUsers - statsData.totalTravelers - statsData.totalGuides },
      ].filter((item) => item.value > 0);

      const revenueByTour = statsData.revenueByTour || [];
      const bookingStatus = statsData.bookingStatus || [];

      setChartData({ revenueByTour, bookingStatus, userTypeData });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/booking/admin/all');
      console.log('Bookings API response:', res.data.data); // Debug log
      const transformedBookings = res.data.data.map((booking) => ({
        _id: booking._id,
        id: `#${booking._id.slice(-6)}`,
        fullName: booking.fullName || 'N/A',
        userEmail: booking.userEmail || booking.userId?.email || 'N/A',
        tourName: booking.tourName || 'N/A',
        guestSize: booking.guestSize ?? 0,
        phone: booking.phone || 'N/A',
        bookAt: booking.bookAt ? new Date(booking.bookAt).toLocaleDateString() : 'N/A',
        payment: booking.payment || 'Pending',
        price: booking.originalPrice
          ? `${booking.originalCurrency === 'USD' ? '$' : '₨'}${booking.originalPrice.toLocaleString()}`
          : `₨${(booking.price || 0).toLocaleString()}`,
      }));
      setBookings(transformedBookings);
      setRecentBookings(transformedBookings.slice(0, 5));
    } catch (err) {
      console.error('Fetch bookings error:', err); // Debug log
      setError(err.response?.data?.message || 'Failed to fetch bookings');
      setBookings([]); // Ensure bookings is an empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/tours', { params: { limit: 100 } });
      setTours(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/itineraries');
      const transformedItineraries = res.data.data.map((itinerary) => ({
        ...itinerary,
        tourTitle: itinerary.tourName || 'N/A', // Use tourName since tourId isn't a field
        status: itinerary.status || 'Pending',
        submittedBy: itinerary.userId?.username || 'Traveler',
        details: itinerary.descriptionItinerary || 'No details provided', // Add details for the modal
      }));
      setItineraries(transformedItineraries);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  // Polling mechanism to fetch data every 30 seconds
  useEffect(() => {
    if (activeTab === 'Dashboard') {
      fetchDashboardData();
      const intervalId = setInterval(fetchDashboardData, 30000);
      return () => clearInterval(intervalId);
    }
  }, [activeTab]);

  useEffect(() => {
    switch (activeTab) {
      case 'Dashboard':
        // fetchDashboardData is already handled by the polling useEffect above
        break;
      case 'User Management':
        fetchUsers();
        break;
      case 'Bookings':
        fetchBookings();
        break;
      case 'Packages':
        fetchTours();
        break;
      case 'Itineraries':
        fetchItineraries();
        break;
      default:
        break;
    }
  }, [activeTab]);

  const toggleModal = (modalName, value) => {
    setModals({ ...modals, [modalName]: value });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <DashboardTab
            stats={dashboardStats}
            chartData={chartData}
            recentBookings={recentBookings}
            setActiveTab={setActiveTab}
          />
        );
      case 'User Management':
        return (
          <UserManagementTab
            users={users}
            loading={loading}
            error={error}
            newUser={newUser}
            setNewUser={setNewUser}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            handleAddUser={handleAddUser}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
            showAddUserModal={modals.showAddUser}
            showEditUserModal={modals.showEditUser}
            toggleModal={toggleModal}
          />
        );
      case 'Bookings':
        return (
          <BookingManagementTab
            bookings={bookings}
            loading={loading}
            columns={bookingColumns}
            currentBooking={currentBooking}
            setCurrentBooking={setCurrentBooking}
            handleDeleteBooking={handleDeleteBooking}
            showViewBookingModal={modals.showViewBooking}
            toggleModal={toggleModal}
          />
        );
      case 'Packages':
        return (
          <PackageManagementTab
            tours={tours}
            loading={loading}
            newTour={newTour}
            setNewTour={setNewTour}
            currentTour={currentTour}
            setCurrentTour={setCurrentTour}
            handleAddTour={handleAddTour}
            handleUpdateTour={handleUpdateTour}
            handleDeleteTour={handleDeleteTour}
            showAddTourModal={modals.showAddTour}
            showEditTourModal={modals.showEditTour}
            toggleModal={toggleModal}
          />
        );
      case 'Itineraries':
        return (
          <ItineraryManagementTab
            itineraries={itineraries}
            loading={loading}
            currentItinerary={currentItinerary}
            setCurrentItinerary={setCurrentItinerary}
            handleAcceptItinerary={handleAcceptItinerary}
            handleDeclineItinerary={handleDeclineItinerary}
            showViewItineraryModal={modals.showViewItinerary}
            toggleModal={toggleModal}
          />
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  const handleAddUser = async () => {
    try {
      await api.post('/admin/users', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        photo: newUser.photo,
      });
      setModals({ ...modals, showAddUser: false });
      setNewUser({ username: '', email: '', password: '', role: 'Traveler', photo: '' });
      fetchUsers();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    }
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      const updateData = {
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
      };
      if (currentUser.newPassword && currentUser.confirmPassword) {
        if (currentUser.newPassword !== currentUser.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (currentUser.newPassword.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        updateData.password = currentUser.newPassword;
      }
      await api.put(`/admin/users/${currentUser._id}`, updateData);
      setModals({ ...modals, showEditUser: false });
      fetchUsers();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${userId}`);
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleAddTour = async () => {
    try {
      await api.post('/tours', newTour);
      setModals({ ...modals, showAddTour: false });
      setNewTour({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: '',
        desc: '',
        price: '',
        maxGroupSize: '',
        featured: false,
      });
      fetchTours();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add tour');
    }
  };

  const handleUpdateTour = async () => {
    try {
      await api.put(`/tours/${currentTour._id}`, currentTour);
      setModals({ ...modals, showEditTour: false });
      fetchTours();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update tour');
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour? All associated bookings and reviews will also be deleted.')) {
      try {
        await api.delete(`/tours/${tourId}`);
        fetchTours();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete tour');
      }
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await api.delete(`/admin/bookings/${bookingId}`);
        fetchBookings();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete booking');
      }
    }
  };

  const handleAcceptItinerary = async (itineraryId) => {
    try {
      await api.put(`/admin/itineraries/${itineraryId}/status`, { status: 'accepted' });
      fetchItineraries();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to accept itinerary');
    }
  };

  const handleDeclineItinerary = async (itineraryId) => {
    try {
      await api.put(`/admin/itineraries/${itineraryId}/status`, { status: 'declined' });
      fetchItineraries();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to decline itinerary');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed(!collapsed)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;