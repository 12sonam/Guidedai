import React from 'react';

const Header = ({ activeTab }) => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-6 z-10">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{activeTab}</h1>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm mr-2">
            AD
          </div>
          <span className="text-sm font-medium text-gray-800">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;