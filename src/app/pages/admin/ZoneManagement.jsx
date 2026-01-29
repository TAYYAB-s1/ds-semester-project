import { useState, useEffect } from 'react';
import { MapPin, PlusCircle } from 'lucide-react';
import api from '@/app/services/api';

function ZoneManagement() {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Zone Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage parking zones and their slots</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map((zone, idx) => (
            <div key={zone.id} className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="flex items-center mb-4">
                <div className="bg-[#4F46E5] w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{zone.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID: {zone.id}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Slots:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{zone.slots.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Available:</span>
                  <span className="font-semibold text-green-600">{zone.slots.filter(s => s.status === 'available').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Occupied:</span>
                  <span className="font-semibold text-red-600">{zone.slots.filter(s => s.status === 'occupied').length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ZoneManagement;
