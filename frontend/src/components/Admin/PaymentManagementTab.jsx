import React from 'react';
import { Trash2 } from 'lucide-react';
import ReusableTable from './ReusableTable';

const PaymentManagementTab = ({ payments, loading, handleDeletePayment }) => {
  const paymentColumns = [
    { header: 'Payment ID', accessor: '_id', render: (value) => `#${value.slice(-6)}` },
    { header: 'Booking ID', accessor: 'bookingId', render: (value) => `#${value.slice(-6)}` },
    { header: 'Amount', accessor: 'amount', render: (value) => `$${value}` },
    { header: 'Method', accessor: 'method' },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Actions',
      accessor: '_id',
      render: (value) => (
        <button
          onClick={() => handleDeletePayment(value)}
          className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
        >
          <Trash2 size={14} className="mr-1" />
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment Management</h2>
      <ReusableTable columns={paymentColumns} data={payments} loading={loading} />
    </div>
  );
};

export default PaymentManagementTab;