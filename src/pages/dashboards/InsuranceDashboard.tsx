import React, { useState } from "react";
import { FileSignature, ShieldCheck, Banknote, Clock, AlertTriangle, ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";

export const InsuranceDashboard = () => {
  const [isPreAuthOpen, setIsPreAuthOpen] = useState(false);

  const handlePreAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreAuthOpen(false);
    toast.success("Pre-Authorization request submitted successfully. Ref: AUTH-" + Math.floor(Math.random() * 10000));
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Insurance Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage claims, verify coverage, and process pre-authorizations.</p>
        </div>
        <button 
          onClick={() => setIsPreAuthOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm"
        >
          <FileSignature className="w-4 h-4 mr-2" />
          New Pre-Auth
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500">
              <Clock size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Pending Pre-Auth</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">18</p>
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-medium">Awaiting TPA approval</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-500">
              <FileSignature size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Draft Claims</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">35</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium">Requires documentation</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
              <ShieldCheck size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Approved Today</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">₹2.4L total value</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-500">
              <AlertTriangle size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Rejected/Queries</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">4</p>
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 font-medium">Action required</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Recent Claims Activity</h3>
            <button onClick={() => toast("Navigating to claims list...", { icon: '📄' })} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i === 2 ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                    {i === 2 ? <AlertTriangle size={18} /> : <FileSignature size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Claim #CLM-2026-{1000 + i}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Patient: Rajesh Kumar • Star Health</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-sm font-semibold text-slate-900 dark:text-white">₹45,000</p>
                   <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${i === 2 ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : i === 1 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                     {i === 2 ? 'Query' : i === 1 ? 'Approved' : 'Pending'}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">TPA Partners Status</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
             {['Star Health', 'HDFC ERGO', 'ICICI Lombard'].map((tpa, i) => (
                <div key={tpa} className="flex flex-col p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                     <h4 className="text-sm font-medium text-slate-900 dark:text-white">{tpa}</h4>
                     <span className="text-xs text-slate-500 dark:text-slate-400">Portal Online</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">{12 - i*3}</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Avg TAT</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">{2 + i} hours</p>
                     </div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      {isPreAuthOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <FileSignature className="w-5 h-5 mr-2 text-indigo-500" />
                New Pre-Authorization
              </h2>
              <button
                onClick={() => setIsPreAuthOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handlePreAuthSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Patient Name or ID
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Search patient..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Insurance Provider (TPA)
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Provider...</option>
                  <option value="star">Star Health</option>
                  <option value="hdfc">HDFC ERGO</option>
                  <option value="icici">ICICI Lombard</option>
                  <option value="care">Care Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Cost (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 45000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Treatment / Procedure
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Brief description of the planned procedure..."
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPreAuthOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
