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
        status: booking.payment ? (booking.payment === 'completed' ? 'confirmed' : booking.payment) : 'unknown', // Handle undefined payment
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
      setRecentBookings([]); // Fallback to empty array on error
      setChartData({ revenueByTour: [], bookingStatus: [], userTypeData: [] }); // Fallback to empty arrays on error
    } finally {
      setLoading(false);
    }
  };
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/booking/admin/all');
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
      console.error('Fetch bookings error:', err);
      setError(err.response?.data?.message || 'Failed to fetch bookings');
      setBookings([]);
      setRecentBookings([]);
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
        tourTitle: itinerary.tourName || 'N/A',
        status: itinerary.status || 'Pending',
        submittedBy: itinerary.userId?.username || 'Traveler',
        details: itinerary.descriptionItinerary || 'No details provided',
      }));
      setItineraries(transformedItineraries);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and polling
  useEffect(() => {
    fetchDashboardData(); // Initial fetch on mount
    const intervalId = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case 'Dashboard':
        // fetchDashboardData is handled by the initial useEffect
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