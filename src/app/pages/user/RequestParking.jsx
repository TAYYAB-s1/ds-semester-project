import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Car, MapPin, Send, Info } from 'lucide-react';
import AuthContext from '@/app/context/AuthContext';

function RequestParking({ setCurrentPage }) {
  const { user } = useContext(AuthContext);
  const [vehicleId, setVehicleId] = useState('');
  const [preferredZone, setPreferredZone] = useState('A');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleId.trim()) {
      toast.error('Please enter a vehicle ID');
      return;
    }

    // Get existing requests
    const requests = JSON.parse(localStorage.getItem('parkingRequests') || '[]');
    
    // Check if user already has a pending/allocated request
    const existingRequest = requests.find(
      req => req.userEmail === user.email && (req.status === 'REQUESTED' || req.status === 'ALLOCATED')
    );

    if (existingRequest) {
      toast.error('You already have an active parking request');
      return;
    }

    const newRequest = {
      id: Date.now(),
      userEmail: user.email,
      userName: user.name,
      vehicleId: vehicleId.trim(),
      preferredZone,
      status: 'REQUESTED',
      zoneId: null,
      slotId: null,
      timestamp: new Date().toISOString(),
      penalty: false,
    };

    requests.push(newRequest);
    localStorage.setItem('parkingRequests', JSON.stringify(requests));

    toast.success('Parking request submitted successfully!');
    setVehicleId('');
    setTimeout(() => {
      setCurrentPage('allocation-status');
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Request Parking
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Submit your parking request and get allocated to the best available slot
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-8 space-y-6"
            data-aos="fade-up"
          >
            {/* Vehicle ID */}
            <div>
              <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vehicle ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Car className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="vehicleId"
                  type="text"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-[#0F172A] dark:text-white transition-all"
                  placeholder="e.g., ABC-1234"
                  required
                />
              </div>
            </div>

            {/* Preferred Zone */}
            <div>
              <label htmlFor="preferredZone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Zone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="preferredZone"
                  value={preferredZone}
                  onChange={(e) => setPreferredZone(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-[#0F172A] dark:text-white transition-all"
                >
                  <option value="A">Zone A</option>
                  <option value="B">Zone B</option>
                  <option value="C">Zone C</option>
                </select>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="font-semibold mb-1">Allocation depends on availability</p>
                  <p>Your request will be added to a queue and processed using FIFO (First In, First Out). If your preferred zone is full, you may be allocated to a different zone with a penalty indicator.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] transition-all font-medium"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Request
            </button>
          </div>
        </form>

        {/* Zone Information */}
        <div
          className="mt-8 bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Zone Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="bg-blue-500 w-3 h-3 rounded-full mr-2"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Zone A</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Main entrance parking</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Zone B</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Side entrance parking</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="bg-purple-500 w-3 h-3 rounded-full mr-2"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Zone C</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rear parking lot</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestParking;
