import React from 'react';
import { Briefcase, Users, CreditCard } from 'lucide-react';
import StatsCard from './StatsCard';
import { RevenueByTourChart, BookingStatusChart, UserDistributionChart } from './ChartComponents';
import ReusableTable from './ReusableTable';

const DashboardTab = ({ stats, chartData, recentBookings, setActiveTab }) => {
  const recentBookingColumns = [
    { header: 'Booking ID', accessor: 'id' },
    { header: 'Customer', accessor: 'fullName' },
    { header: 'Tour', accessor: 'tourName' },
    { header: 'Date', accessor: 'date' },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => {
        const status = value || 'unknown'; // Fallback for undefined status
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    { header: 'Amount', accessor: 'price', render: (value) => `${value.toLocaleString()}` },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<Briefcase size={20} className="text-blue-600" />}
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users size={20} className="text-green-600" />}
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<CreditCard size={20} className="text-purple-600" />}
          bgColor="bg-purple-100"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {chartData?.revenueByTour && <RevenueByTourChart data={chartData.revenueByTour} />}
        {chartData?.bookingStatus && <BookingStatusChart data={chartData.bookingStatus} />}
        {chartData?.userTypeData && <UserDistributionChart data={chartData.userTypeData} />}
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Bookings</h3>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setActiveTab('Bookings')}
          >
            View All
          </button>
        </div>
        <ReusableTable columns={recentBookingColumns} data={recentBookings || []} />
      </div>
    </div>
  );
};

export default DashboardTab;