import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Plus, User, Search, Heart } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/upload', icon: Plus, label: 'Upload' },
    { path: '/activity', icon: Heart, label: 'Activity' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-orange-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`relative ${path === '/upload' ? 'transform scale-110' : ''}`}>
                {path === '/upload' ? (
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <Icon 
                    className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} 
                    fill={isActive && path !== '/upload' ? 'currentColor' : 'none'}
                  />
                )}
                {isActive && path !== '/upload' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-orange-600' : 'text-gray-500'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;