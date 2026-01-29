import { useState } from 'react';
import { toast } from 'react-toastify';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import api from '@/app/services/api';

function RollbackPage() {
  const [k, setK] = useState(1);
  const [processing, setProcessing] = useState(false);

  const handleRollback = () => {
    if (k < 1) {
      toast.error('Please enter a valid number of allocations');
      return;
    }

    if (window.confirm(`Are you sure you want to rollback the last ${k} allocation(s)? This action cannot be undone.`)) {
      setProcessing(true);
      
      setTimeout(() => {
        const count = api.rollbackAllocations(k);
        setProcessing(false);
        
        if (count > 0) {
          toast.success(`Successfully rolled back ${count} allocation(s)`);
          setK(1);
        } else {
          toast.error('No allocations to rollback');
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Rollback Allocations</h1>
          <p className="text-gray-600 dark:text-gray-400">Stack-based LIFO (Last In, First Out) rollback system</p>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-8" data-aos="fade-up">
          <div className="mb-6">
            <label htmlFor="k" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Allocations to Rollback (K)
            </label>
            <input
              id="k"
              type="number"
              min="1"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value) || 1)}
              className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-[#0F172A] dark:text-white"
              placeholder="Enter number"
            />
          </div>

          <button
            onClick={handleRollback}
            disabled={processing}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all font-medium"
          >
            <RotateCcw className={`w-5 h-5 mr-2 ${processing ? 'animate-spin' : ''}`} />
            {processing ? 'Rolling Back...' : 'Rollback Last K Allocations'}
          </button>
        </div>

        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Warning</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">
                This operation uses a Stack data structure (LIFO - Last In, First Out) to reverse the most recent parking allocations.
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                <li>The last K allocated parking slots will be freed</li>
                <li>The corresponding requests will be marked as CANCELLED</li>
                <li>This action is irreversible</li>
                <li>Users will need to submit new requests</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How It Works</h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
              <p>System retrieves the last K allocated parking requests (most recent first)</p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
              <p>For each allocation, the parking slot is freed and marked as available</p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">3</span>
              <p>Request status is changed to CANCELLED</p>
            </div>
            <div className="flex items-start">
              <span className="bg-[#4F46E5] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">4</span>
              <p>Slots become available for new allocations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RollbackPage;
