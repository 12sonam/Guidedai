import React, { useState } from 'react';
import { Bell, Home, Users, Calendar, Briefcase, CreditCard, Star, BarChart2, Settings, Menu, ChevronDown, Search, Edit, Trash2, UserPlus, Filter, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/admin-dashboard.css';

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New booking request #1245", time: "5 minutes ago", read: false },
    { id: 2, message: "Payment confirmed for booking #1242", time: "30 minutes ago", read: false },
    { id: 3, message: "New guide application submitted", time: "2 hours ago", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 7000 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 8000 },
  ];

  const bookingsData = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 30 },
    { name: 'Mar', value: 45 },
    { name: 'Apr', value: 70 },
    { name: 'May', value: 65 },
    { name: 'Jun', value: 85 },
  ];

  const userTypeData = [
    { name: 'Travelers', value: 400 },
    { name: 'Guides', value: 30 },
    { name: 'Admins', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const recentBookings = [
    { id: '#1248', customer: 'Emma Wilson', destination: 'Paris, France', date: '15 Mar 2025', status: 'Confirmed', amount: '$1,200' },
    { id: '#1247', customer: 'John Smith', destination: 'Tokyo, Japan', date: '14 Mar 2025', status: 'Pending', amount: '$2,300' },
    { id: '#1246', customer: 'Sarah Johnson', destination: 'Rome, Italy', date: '12 Mar 2025', status: 'Confirmed', amount: '$950' },
    { id: '#1245', customer: 'Michael Brown', destination: 'Bali, Indonesia', date: '10 Mar 2025', status: 'Completed', amount: '$1,750' },
  ];

  const users = [
    { id: 1, name: 'John Smith', email: 'john@guidedai.com', role: 'Admin', status: 'Active', lastLogin: '18 Mar 2025, 10:23 AM' },
    { id: 2, name: 'Emma Wilson', email: 'emma@guidedai.com', role: 'Guide', status: 'Active', lastLogin: '17 Mar 2025, 2:45 PM' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@guidedai.com', role: 'Traveler', status: 'Active', lastLogin: '16 Mar 2025, 9:15 AM' },
    { id: 4, name: 'Michael Brown', email: 'michael@guidedai.com', role: 'Guide', status: 'Inactive', lastLogin: '10 Mar 2025, 4:30 PM' },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return renderDashboard();
      case 'User Management':
        return renderUserManagement();
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  // Dashboard content
  const renderDashboard = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <h3 className="text-3xl font-bold mt-1">1,248</h3>
                <p className="text-green-500 text-sm mt-2">↑ 12% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <h3 className="text-3xl font-bold mt-1">842</h3>
                <p className="text-green-500 text-sm mt-2">↑ 8% from last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Users size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-3xl font-bold mt-1">$124.5k</h3>
                <p className="text-green-500 text-sm mt-2">↑ 15% from last month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CreditCard size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Avg. Rating</p>
                <h3 className="text-3xl font-bold mt-1">4.8</h3>
                <p className="text-green-500 text-sm mt-2">↑ 0.2 from last month</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Bookings Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{booking.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // User Management content
  const renderUserManagement = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">User Management</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition">
            <UserPlus size={16} className="mr-2" />
            Add New User
          </button>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <button className="flex items-center text-gray-700 border border-gray-300 rounded-lg px-4 py-2">
                <Filter size={16} className="mr-2" />
                Filter
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
            
            <div className="flex items-center">
              <button className="flex items-center text-gray-700 border border-gray-300 rounded-lg px-4 py-2">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
        
        {/* User Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-lg font-medium text-blue-600">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'Guide' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">24</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    Previous
                  </button>
                  <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && (
            <div className="flex items-center">
              <span className="text-blue-600 font-bold text-xl">guide</span>
              <span className="text-gray-800 font-bold text-xl">Dai</span>
            </div>
          )}
          {collapsed && (
            <div className="flex items-center justify-center w-full">
              <span className="text-blue-600 font-bold text-xl">g</span>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="py-4">
          <ul>
            {[
              { name: 'Dashboard', icon: <Home size={20} /> },
              { name: 'User Management', icon: <Users size={20} /> },
              { name: 'Bookings', icon: <Calendar size={20} /> },
              { name: 'Packages', icon: <Briefcase size={20} /> },
              { name: 'Payments', icon: <CreditCard size={20} /> },
              { name: 'Reviews', icon: <Star size={20} /> },
              { name: 'Reports', icon: <BarChart2 size={20} /> },
              { name: 'Settings', icon: <Settings size={20} /> }
            ].map((item) => (
              <li key={item.name} className="mb-1">
                <button
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center w-full px-4 py-3 ${
                    activeTab === item.name 
                      ? 'text-blue-600 bg-blue-50 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors rounded-lg ${collapsed ? 'justify-center' : ''}`}
                >
                  <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{activeTab}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border">
                  <div className="px-4 py-2 border-b flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 border-b last:border-0 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{notif.message}</p>
                          {!notif.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t">
                    <button className="text-sm text-blue-600 hover:underline w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm mr-2">
                AD
              </div>
              <span className="text-sm font-medium text-gray-800">Admin User</span>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;