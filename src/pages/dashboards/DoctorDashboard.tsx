import React from "react";
import { Users, Calendar, Activity, Clock, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const DoctorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Doctor Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">View your schedule, patient records, and write prescriptions.</p>
        </div>
        <Link to="/doctor/appointments" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <Calendar className="w-4 h-4 mr-2" />
          My Schedule
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-500">
              <Calendar size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Today's Appointments</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">8</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium flex items-center">
            <Clock className="w-3 h-3 mr-1" /> Next at 10:30 AM
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
              <Users size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">My Patients</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">124</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Active patients under your care</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
              <FileText size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Pending Reports</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">3</p>
          <p className="text-xs text-rose-500 dark:text-rose-400 mt-2 font-medium">Requires your review</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Upcoming Appointments Today</h3>
            <Link to="/doctor/appointments" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">View Schedule</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {['10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM'].map((time, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{time}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                    P{i+1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Patient Name {i+1}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Regular Checkup • {i % 2 === 0 ? 'In-person' : 'Video Consult'}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Quick Actions</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3">
             <Link to="/doctor/prescriptions" className="w-full p-4 flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
               <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                 <FileText size={20} />
               </div>
               <div>
                 <p className="font-medium text-sm text-slate-900 dark:text-white">Write Prescription</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Create a new e-prescription</p>
               </div>
             </Link>
             <Link to="/doctor/patients" className="w-full p-4 flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
               <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                 <Users size={20} />
               </div>
               <div>
                 <p className="font-medium text-sm text-slate-900 dark:text-white">Patient Records</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">View history and lab results</p>
               </div>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
