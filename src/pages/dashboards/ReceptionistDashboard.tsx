import React, { useState } from "react";
import { UserPlus, CalendarDays, PhoneCall, Users, Clock, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";

export const ReceptionistDashboard = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterOpen(false);
    toast.success("Patient registered successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Receptionist Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Register patients, manage front desk appointments, and handle inquiries.</p>
        </div>
        <Link to="/receptionist/appointments" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <CalendarDays className="w-4 h-4 mr-2" />
          Book Appointment
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500">
              <UserPlus size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">New Registrations</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">15</p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-medium">Patients registered today</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-500">
              <Users size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Front Desk Queue</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">8</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium">Waiting in lobby</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
              <PhoneCall size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Calls Handled</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">42</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Avg wait time: 1.2m</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
              <CalendarDays size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Today's Appointments</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">56</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">24 completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Lobby Queue (Live)</h3>
            <span className="flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
              Live Updates
            </span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                    Q{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Token #{100 + i}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Dr. {i % 2 === 0 ? 'Dinesh Kumar' : 'Karthick Raja'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <Clock className="w-3 h-3 text-slate-400" />
                   <span className="text-xs text-slate-500 dark:text-slate-400">{i * 5}m wait</span>
                   <button className="ml-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium transition-colors">
                     Call
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Quick Access</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3">
             <button onClick={() => setIsRegisterOpen(true)} className="w-full p-4 flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
               <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                 <UserPlus size={20} />
               </div>
               <div className="flex-1">
                 <p className="font-medium text-sm text-slate-900 dark:text-white">Register Patient</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Add new patient to the system</p>
               </div>
               <ArrowRight className="w-5 h-5 text-slate-400" />
             </button>
             <Link to="/receptionist/appointments" className="w-full p-4 flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
               <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                 <CalendarDays size={20} />
               </div>
               <div className="flex-1">
                 <p className="font-medium text-sm text-slate-900 dark:text-white">Manage Schedule</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">View and edit doctor schedules</p>
               </div>
               <ArrowRight className="w-5 h-5 text-slate-400" />
             </Link>
          </div>
        </div>
      </div>

      {isRegisterOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-700 max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-indigo-500" />
                New Patient Registration
              </h2>
              <button
                onClick={() => setIsRegisterOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4">
              <form id="register-form" onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      First Name
                    </label>
                    <input type="text" required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Last Name
                    </label>
                    <input type="text" required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Date of Birth
                    </label>
                    <input type="date" required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Gender
                    </label>
                    <select required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input type="tel" required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="+91..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email (Optional)
                    </label>
                    <input type="email" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. email@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Address
                  </label>
                  <textarea rows={2} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Full residential address..."></textarea>
                </div>
              </form>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="register-form"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Register Patient
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
