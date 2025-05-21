import React, { useState } from 'react';
import { Eye, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ReusableTable from './ReusableTable';
import Modal from './Modal';

const BookingManagementTab = ({
  bookings = [],
  loading,
  columns,
  currentBooking,
  setCurrentBooking,
  handleDeleteBooking,
  showViewBookingModal,
  toggleModal,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const actionColumn = {
    header: 'Actions',
    accessor: '_id',
    render: (value) => (
      <div className="flex space-x-2">
        <button
          onClick={() => {
            setCurrentBooking(bookings.find((b) => b._id === value));
            toggleModal('showViewBooking', true);
          }}
          className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm"
          disabled={!bookings.length}
        >
          <Eye size={14} className="mr-1" />
          View
        </button>
        <button
          onClick={() => handleDeleteBooking(value)}
          className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
          disabled={!bookings.length}
        >
          <Trash2 size={14} className="mr-1" />
          Delete
        </button>
      </div>
    ),
  };

  const enhancedColumns = [
    ...columns.map((col) => ({
      ...col,
      render: (value, row) => {
        if (col.accessor === 'payment') {
          return (
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                value === 'completed' ? 'bg-green-100 text-green-800' : value === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {value === 'completed' ? 'Confirmed' : value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          );
        }
        if (col.accessor === 'bookAt') {
          return value ? new Date(value).toLocaleDateString() : '—';
        }
        if (col.accessor === 'price') {
          return value || '—';
        }
        return value || '—';
      },
    })),
    actionColumn,
  ];

  const viewBookingModalContent = currentBooking && (
    <div className="p-6 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v9h12V6H4zm2 2a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm4 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-4 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
              </svg>
              Booking ID
            </label>
            <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">{currentBooking.id || '—'}</p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Booking Date
            </label>
            <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">
              {currentBooking.bookAt ? new Date(currentBooking.bookAt).toLocaleDateString() : '—'}
            </p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Customer Name
            </label>
            <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">{currentBooking.fullName || '—'}</p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">{currentBooking.userEmail || '—'}</p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Tour Name
            </label>
            <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">{currentBooking.tourName || '—'}</p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Guest Size
            </label>
            <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">{currentBooking.guestSize || '—'}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
          >
            {isCollapsed ? (
              <>
                <ChevronDown size={16} className="mr-2 transition-transform duration-300 hover:scale-110" /> Additional Details
              </>
            ) : (
              <>
                <ChevronUp size={16} className="mr-2 transition-transform duration-300 hover:scale-110" /> Hide Details
              </>
            )}
          </button>
          {!isCollapsed && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Phone
                </label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">{currentBooking.phone || '—'}</p>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Payment Status
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      currentBooking.payment === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : currentBooking.payment === 'cancelled' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    }`}
                  >
                    {currentBooking.payment === 'completed' ? 'Confirmed' : currentBooking.payment.charAt(0).toUpperCase() + currentBooking.payment.slice(1) || '—'}
                  </span>
                </p>
              </div>
              <div className="col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 11.586l3.293-3.292A1 1 0 0116 8.414V7h-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Amount
                </label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">{currentBooking.price || '—'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Booking Management</h2>
      <ReusableTable columns={enhancedColumns} data={bookings} loading={loading} />
      <Modal
        isOpen={showViewBookingModal}
        onClose={() => {
          toggleModal('showViewBooking', false);
          setCurrentBooking(null);
        }}
        title="Booking Details"
        actions={[
          {
            label: 'Close',
            onClick: () => {
              toggleModal('showViewBooking', false);
              setCurrentBooking(null);
            },
            className: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded',
          },
        ]}
      >
        {viewBookingModalContent}
      </Modal>
    </div>
  );
};

export default BookingManagementTab;