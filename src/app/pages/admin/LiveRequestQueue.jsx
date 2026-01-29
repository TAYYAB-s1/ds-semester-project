import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Clock, Play, RefreshCw } from 'lucide-react';
import api from '@/app/services/api';

function LiveRequestQueue() {
  const [requests, setRequests] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const data = JSON.parse(localStorage.getItem('parkingRequests') || '[]');
    const pending = data.filter(r => r.status === 'REQUESTED').sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setRequests(pending);
  };

  const processQueue = () => {
    setProcessing(true);
    const updated = api.processRequests();
    
    setTimeout(() => {
      setProcessing(false);
      if (updated) {
        toast.success('Queue processed successfully!');
        loadRequests();
      } else {
        toast.info('No requests to process or no slots available');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8" data-aos="fade-down">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Live Request Queue</h1>
              <p className="text-gray-600 dark:text-gray-400">FIFO Queue Processing (First In, First Out)</p>
            </div>
            <button
              onClick={processQueue}
              disabled={processing || requests.length === 0}
              className="flex items-center px-6 py-3 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {processing ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Play className="w-5 h-5 mr-2" />}
              {processing ? 'Processing...' : 'Process Queue'}
            </button>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-12 text-center" data-aos="fade-up">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Queue Empty</h3>
            <p className="text-gray-600 dark:text-gray-400">No pending requests in the queue</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden" data-aos="fade-up">
            <div className="px-6 py-4 bg-gray-50 dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Queue: {requests.length} Request(s)</h3>
            </div>
            <div className="p-6 space-y-4">
              {requests.map((request, idx) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                  data-aos="fade-right"
                  data-aos-delay={idx * 50}
                >
                  <div className="flex items-center">
                    <div className="bg-[#4F46E5] text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{request.vehicleId}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">User: {request.userName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Preferred Zone</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Zone {request.preferredZone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4" data-aos="fade-up">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Queue Algorithm:</strong> Requests are processed in FIFO (First In, First Out) order. The system attempts to allocate slots based on preferred zones, applying penalties for cross-zone allocations when necessary.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LiveRequestQueue;
