import { useState, useEffect } from 'react';
import { BarChart3, MapPin, Clock, AlertCircle } from 'lucide-react';
import api from '@/app/services/api';

function AdminDashboard({ setCurrentPage }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = () => {
    const data = api.getDashboardStats();
    setStats(data);
  };

  if (!stats) return <div className="p-8">Loading...</div>;

  const cards = [
    { title: 'Total Zones', value: stats.totalZones, icon: MapPin, color: 'bg-blue-500' },
    { title: 'Total Slots', value: stats.totalSlots, icon: BarChart3, color: 'bg-green-500' },
    { title: 'Occupied Slots', value: stats.occupiedSlots, icon: AlertCircle, color: 'bg-purple-500' },
    { title: 'Pending Requests', value: stats.pendingRequests, icon: Clock, color: 'bg-yellow-500' },
  ];

  const quickActions = [
    { id: 'zone-management', label: 'Manage Zones', icon: MapPin, color: 'bg-blue-500' },
    { id: 'slot-grid', label: 'View Slot Grid', icon: BarChart3, color: 'bg-green-500' },
    { id: 'live-queue', label: 'Process Queue', icon: Clock, color: 'bg-purple-500' },
    { id: 'rollback', label: 'Rollback', icon: AlertCircle, color: 'bg-red-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'bg-indigo-500' },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage parking zones and allocations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => setCurrentPage(action.id)}
                  className={`${action.color} hover:opacity-90 text-white rounded-lg p-4 flex flex-col items-center transition-all`}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 50}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
