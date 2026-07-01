import React from "react";
import { ShieldAlert, Users, Database, Activity, Server, Settings, Globe } from "lucide-react";

export const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Super Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage all hospitals, system configurations, and global settings.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <Settings className="w-4 h-4 mr-2" />
          Global Settings
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-500">
              <ShieldAlert size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">System Health</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">99.99%</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">All systems operational</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
              <Globe size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Total Hospitals</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">42</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">+3 in the last month</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
              <Users size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Active Users</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12.4k</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            +5% this week
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-500">
              <Database size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Database Load</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">42%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Stable performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Recent Hospital Onboardings</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    H{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Metropolitan General #{i}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Deployed in Region-US-East</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">System Activity Logs</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">Export Logs</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {['Database Backup Completed successfully across all clusters.', 'New License Issued - Region 4 for 500 users.', 'Security Patch Applied v2.4.1 to all core components.'].map((log, i) => (
              <div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className={`mt-1 p-1.5 rounded-full ${i === 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : i === 1 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                   <Server size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{log}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{i * 2 + 1} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
