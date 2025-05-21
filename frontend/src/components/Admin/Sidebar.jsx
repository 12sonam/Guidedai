import React from 'react';
import { Home, Users, Calendar, Briefcase, LogOut, Menu, Map } from 'lucide-react';

const Sidebar = ({ collapsed, toggleSidebar, activeTab, setActiveTab, handleLogout }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} /> },
    { name: 'User Management', icon: <Users size={20} /> },
    { name: 'Bookings', icon: <Calendar size={20} /> },
    { name: 'Packages', icon: <Briefcase size={20} /> },
    { name: 'Itineraries', icon: <Map size={20} /> },
    // { name: 'Payments', icon: <CreditCard size={20} /> },
    // { name: 'Reviews', icon: <Star size={20} /> },
  ];

  return (
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
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </div>
      <div className="py-4 flex flex-col h-[calc(100%-4rem)]">
        <ul className="flex-1">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-1">
              <button
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center w-full px-4 py-3 ${
                  activeTab === item.name ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-100'
                } transition-colors rounded-lg ${collapsed ? 'justify-center' : ''}`}
              >
                <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-auto px-4 py-2">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors rounded-lg ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <span className={collapsed ? '' : 'mr-3'}>
              <LogOut size={20} />
            </span>
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;