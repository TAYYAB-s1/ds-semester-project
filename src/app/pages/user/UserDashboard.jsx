import { useContext } from 'react';
import { Car, Clock, MapPin, TrendingUp } from 'lucide-react';
import AuthContext from '@/app/context/AuthContext';

function UserDashboard({ setCurrentPage }) {
  const { user } = useContext(AuthContext);

  const cards = [
    {
      id: 'request-parking',
      title: 'Request Parking',
      description: 'Submit a new parking request',
      icon: Car,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'allocation-status',
      title: 'Allocation Status',
      description: 'Check your parking status',
      icon: MapPin,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      id: 'parking-history',
      title: 'Parking History',
      description: 'View your past parking records',
      icon: Clock,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your parking allocations and requests
          </p>
        </div>

        {/* Info Banner */}
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-8 shadow-lg"
          data-aos="fade-up"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-12 h-12 text-white mr-4" />
              <div className="text-white">
                <h3 className="text-xl font-semibold">Smart Parking System</h3>
                <p className="text-blue-100">DSA-powered allocation using Queues, Stacks & Arrays</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => setCurrentPage(card.id)}
                className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className={`${card.color} ${card.hoverColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div
          className="mt-8 bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How It Works
          </h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
              <p><strong>Request Parking:</strong> Submit your vehicle ID and preferred zone (A, B, or C)</p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
              <p><strong>Queue Processing:</strong> Your request is added to a FIFO queue for fair allocation</p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
              <p><strong>Check Status:</strong> View your allocation status and assigned parking slot</p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
              <p><strong>Track History:</strong> See all your past parking requests and their statuses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
