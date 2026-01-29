import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Award } from 'lucide-react';
import api from '@/app/services/api';

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const data = api.getAnalytics();
    setAnalytics(data);
  };

  if (!analytics) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Statistical analysis and insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up">
            <div className="flex items-center mb-2">
              <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Requests</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalRequests}</p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Occupied Slots</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.occupiedSlots}/{analytics.totalSlots}</p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center mb-2">
              <Award className="w-5 h-5 text-purple-500 mr-2" />
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Peak Zone</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">Zone {analytics.peakZone.zoneId}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{analytics.peakZone.utilization}% utilized</p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center mb-2">
              <BarChart3 className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Cancelled</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.statusCounts.cancelled}</p>
          </div>
        </div>

        {/* Zone Utilization */}
        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Zone Utilization</h3>
          <div className="space-y-4">
            {analytics.zoneUtilization.map((zone, idx) => (
              <div key={zone.zoneId} data-aos="fade-right" data-aos-delay={idx * 100}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Zone {zone.zoneId}</span>
                  <span className="text-gray-600 dark:text-gray-400">{zone.occupiedSlots}/{zone.totalSlots} slots ({zone.utilization}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${parseFloat(zone.utilization) > 70 ? 'bg-red-500' : parseFloat(zone.utilization) > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${zone.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Status Distribution */}
        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Request Status Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analytics.statusCounts).map(([status, count], idx) => (
              <div key={status} className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg" data-aos="zoom-in" data-aos-delay={idx * 100}>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 uppercase mt-1">{status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DSA Information */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6" data-aos="fade-up">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Data Structures Used</h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
            <li><strong>Arrays:</strong> Zone and slot storage for efficient indexing and iteration</li>
            <li><strong>Queue (FIFO):</strong> Processing parking requests in First-In-First-Out order</li>
            <li><strong>Stack (LIFO):</strong> Rollback functionality using Last-In-First-Out principle</li>
            <li><strong>Linked List:</strong> Maintaining parking history as a sequential data structure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
