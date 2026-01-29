import { Sun, Moon, User, LogOut, Home, Settings, Activity } from 'lucide-react';

function Navbar({ currentPage, setCurrentPage, theme, toggleTheme, user, handleLogout }) {
  const isAdmin = user?.role === 'admin';

  const userMenuItems = [
    { id: 'user-dashboard', label: 'Dashboard', icon: Home },
    { id: 'request-parking', label: 'Request Parking', icon: Activity },
    { id: 'allocation-status', label: 'Status', icon: Activity },
    { id: 'parking-history', label: 'History', icon: Activity },
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: Home },
    { id: 'zone-management', label: 'Zones', icon: Settings },
    { id: 'slot-grid', label: 'Slot Grid', icon: Activity },
    { id: 'live-queue', label: 'Queue', icon: Activity },
    { id: 'rollback', label: 'Rollback', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-white'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#4F46E5]'}`}>
              🅿️ SmartPark
            </div>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? theme === 'dark'
                        ? 'bg-[#6366F1] text-white'
                        : 'bg-[#4F46E5] text-white'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-[#334155] hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'text-yellow-400 hover:bg-[#334155]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* User Info */}
            <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">{user?.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${isAdmin ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'}`}>
                {isAdmin ? 'Admin' : 'User'}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-[#334155]'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === item.id
                    ? theme === 'dark'
                      ? 'bg-[#6366F1] text-white'
                      : 'bg-[#4F46E5] text-white'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-[#334155]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
