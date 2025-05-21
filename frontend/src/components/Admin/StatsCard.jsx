import React from 'react';

const StatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center hover-scale smooth-transition float-animation">
      <div className={`p-3 rounded-full ${bgColor} mr-4`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;