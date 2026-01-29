import { useContext, useState, useEffect } from 'react';
import { History, Search } from 'lucide-react';
import AuthContext from '@/app/context/AuthContext';

function ParkingHistory() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const requests = JSON.parse(localStorage.getItem('parkingRequests') || '[]');
    const userRequests = requests
      .filter(req => req.userEmail === user.email)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setHistory(userRequests);
  };

  const filteredHistory = history.filter(item =>
    item.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const configs = {
      REQUESTED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      ALLOCATED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      OCCUPIED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return configs[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Parking History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View all your past parking requests and their statuses
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6" data-aos="fade-up">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-[#0F172A] dark:text-white bg-white"
              placeholder="Search by vehicle ID or status..."
            />
          </div>
        </div>

        {/* History Table */}
        <div
          className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {filteredHistory.length === 0 ? (
            <div className="p-12 text-center">
              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No History Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'No results match your search' : 'You haven\'t made any parking requests yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-[#0F172A]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Vehicle ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Preferred Zone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Allocated Zone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Slot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#1E293B] divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredHistory.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.vehicleId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        Zone {item.preferredZone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {item.zoneId ? `Zone ${item.zoneId}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {item.slotId || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Statistics */}
        {history.length > 0 && (
          <div
            className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Requests</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{history.length}</div>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Allocated</div>
              <div className="text-2xl font-bold text-green-600">
                {history.filter(h => h.status === 'ALLOCATED' || h.status === 'OCCUPIED').length}
              </div>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
              <div className="text-2xl font-bold text-yellow-600">
                {history.filter(h => h.status === 'REQUESTED').length}
              </div>
            </div>
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Cancelled</div>
              <div className="text-2xl font-bold text-red-600">
                {history.filter(h => h.status === 'CANCELLED').length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingHistory;
