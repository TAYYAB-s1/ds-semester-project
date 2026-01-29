import { useState, useEffect } from 'react';
import { Square } from 'lucide-react';
import api from '@/app/services/api';

function SlotGrid() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = () => {
    const data = api.getZones();
    setZones(data);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Parking Slot Grid</h1>
          <p className="text-gray-600 dark:text-gray-400">Visual representation of all parking slots</p>
        </div>

        <div className="space-y-8">
          {zones.map((zone, zIdx) => (
            <div key={zone.id} className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay={zIdx * 100}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{zone.name}</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {zone.slots.map((slot, sIdx) => (
                  <div
                    key={slot.id}
                    className={`${slot.status === 'available' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-all`}
                    title={slot.vehicleId || 'Available'}
                    data-aos="zoom-in"
                    data-aos-delay={zIdx * 100 + sIdx * 10}
                  >
                    <Square className="w-6 h-6 mb-1" />
                    <span className="text-xs font-semibold">{slot.id}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legend</h4>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Occupied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotGrid;
