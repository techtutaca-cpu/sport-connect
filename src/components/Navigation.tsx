import React from 'react';

interface NavigationProps {
  onNavClick: (page: string) => void;
  currentPage: string;
  isLoggedIn?: boolean;
  currentUser?: string;
  onLogout?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  onNavClick, 
  currentPage, 
  isLoggedIn = false, 
  currentUser = '', 
  onLogout = () => {} 
}) => {
  const navItems = [
    { id: 'home', label: '🏠 Home', icon: '🏠' },
    { id: 'news', label: '📰 News', icon: '📰' },
    { id: 'feed', label: '📱 Feed', icon: '📱' },
    { id: 'trending', label: '🔥 Trending', icon: '🔥' },
    { id: 'forums', label: '💬 Forums', icon: '💬' },
    { id: 'social', label: '👥 Social', icon: '👥' },
  ];

  const authItems = [
    { id: 'login', label: '🔐 Login', icon: '🔐' },
    { id: 'signup', label: '✨ Sign Up', icon: '✨' },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-950 to-blue-950 border-b-2 border-cyan-500 border-opacity-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition" onClick={() => onNavClick('home')}>
            <span className="text-3xl">⚽</span>
            <span className="text-xl font-black text-white">SportsConnect</span>
          </div>

          {/* Main Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth Items */}
          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              authItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                    item.id === 'login'
                      ? 'text-cyan-400 hover:text-cyan-300 border border-cyan-400 border-opacity-50'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                  }`}
                >
                  {item.label}
                </button>
              ))
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-semibold text-sm">{currentUser}</p>
                  <p className="text-cyan-300 text-xs">Online</p>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition duration-300"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
