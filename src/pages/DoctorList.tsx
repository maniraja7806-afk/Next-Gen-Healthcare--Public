import React, { useEffect, useState } from 'react';
import { Search, MapPin, Star, Phone, X, Award, Briefcase, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

export const DoctorList = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('cerulean_user') || '{}'));
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(search.toLowerCase()) || 
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {user.role === 'Doctor' && (
        <div className="bg-gradient-to-r from-[#0F6CBD] to-[#1976D2] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name || 'Doctor'}!</h1>
            <p className="text-blue-100 max-w-2xl text-lg">
              Here's your schedule and colleague directory for today.
            </p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
            <Search size={120} strokeWidth={1} />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hospital Staff (Doctors)</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage all specialized doctors in Cerulean Health.</p>
        </div>
        <div className="relative w-full sm:w-72 mt-2 sm:mt-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            className="form-input pl-10 py-2"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton type="card" count={8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0369a1] font-bold text-lg border border-[#0284c7]/20">
                  {doctor.name.substring(4, 5).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-md font-bold text-slate-900 dark:text-white leading-tight">{doctor.name}</h3>
                  <p className="text-sm text-[#0284c7] font-medium">{doctor.specialization}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-500">Qualification</span>
                  <span className="font-medium text-slate-900 dark:text-slate-300">{doctor.qualification}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-500">Experience</span>
                  <span className="font-medium text-slate-900 dark:text-slate-300">{doctor.experience} Yrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-500">Consultation</span>
                  <span className="font-medium text-slate-900 dark:text-slate-300">₹{doctor.consultationFee}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{doctor.rating}</span>
              </div>
              <button 
                onClick={() => setSelectedDoctor(doctor)}
                className="text-[#0284c7] text-sm font-medium hover:text-[#0369a1] dark:hover:text-[#38bdf8]"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Doctor Profile</h2>
              <button onClick={() => setSelectedDoctor(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0369a1] font-bold text-2xl border border-[#0284c7]/20">
                  {selectedDoctor.name.substring(4, 5).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedDoctor.name}</h3>
                  <p className="text-md text-[#0284c7] font-medium">{selectedDoctor.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Award size={18} className="mr-3 text-slate-400 dark:text-slate-500" />
                  <span>Qualification: {selectedDoctor.qualification}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Briefcase size={18} className="mr-3 text-slate-400 dark:text-slate-500" />
                  <span>Experience: {selectedDoctor.experience} Years</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Calendar size={18} className="mr-3 text-slate-400 dark:text-slate-500" />
                  <span>Consultation Fee: ₹{selectedDoctor.consultationFee}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Star size={18} className="mr-3 text-amber-500" />
                  <span>Rating: {selectedDoctor.rating} / 5.0</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end space-x-3">
                <button 
                  onClick={() => {
                    toast.success(`Booking appointment with ${selectedDoctor.name}`);
                    setSelectedDoctor(null);
                  }}
                  className="px-4 py-2 border border-[#0284c7] text-[#0284c7] dark:text-[#38bdf8] dark:border-[#38bdf8] rounded-lg hover:bg-[#e0f2fe] dark:hover:bg-[#0284c7]/20 transition-colors"
                >
                  Book Appointment
                </button>
                <button 
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 bg-[#0284c7] text-white rounded-lg hover:bg-[#0369a1] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
