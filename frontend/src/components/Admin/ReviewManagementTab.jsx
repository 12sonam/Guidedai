import React from 'react';
import { Trash2 } from 'lucide-react';
import ReusableTable from './ReusableTable';

const ReviewManagementTab = ({ reviews, loading, handleDeleteReview }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const reviewColumns = [
    { header: 'Review ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Tour', accessor: 'tour' },
    { header: 'Rating', accessor: 'rating', render: (value) => renderStars(value) },
    { header: 'Content', accessor: 'content' },
    { header: 'Date', accessor: 'date' },
    {
      header: 'Actions',
      accessor: '_id',
      render: (value) => (
        <button
          onClick={() => handleDeleteReview(value)}
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
      <h2 className="text-2xl font-semibold mb-6">Review Management</h2>
      <ReusableTable columns={reviewColumns} data={reviews} loading={loading} />
    </div>
  );
};

export default ReviewManagementTab;