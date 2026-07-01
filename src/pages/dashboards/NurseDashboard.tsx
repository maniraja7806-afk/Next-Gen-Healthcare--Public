import React from "react";
import { HeartPulse, ClipboardList, Bed, Clock, Users, Activity, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const NurseDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Nurse Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Monitor vitals, manage ward beds, and assist with patient care.</p>
        </div>
        <Link to="/nurse/patients" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <HeartPulse className="w-4 h-4 mr-2" />
          Update Vitals
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
              <ClipboardList size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Pending Vitals</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12</p>
          <p className="text-xs text-rose-500 dark:text-rose-400 mt-2 font-medium">Overdue by 15 mins</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
              <Bed size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Bed Availability</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">4</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">In Ward A (General)</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-500">
              <Users size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">My Shift (Ward A)</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">18</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Patients assigned</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500">
              <Clock size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Shift Ends In</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">3h 45m</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">04:00 PM handover</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Urgent Tasks (Ward A)</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {i === 1 ? 'Administer IV Medication' : 'Check Blood Pressure'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Bed A-{i + 12} • Patient {i === 1 ? 'Rajesh' : 'Kalaivani'}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors">
                  Mark Done
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Recent Vitals Logged</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50 flex-1">
             {[1, 2, 3].map((i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400">
                        <Activity size={16} />
                     </div>
                     <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Bed A-{10+i}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">BP: 120/80 • HR: {72 + i}</p>
                     </div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{i * 15}m ago</span>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
