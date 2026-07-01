import React from 'react';
import { Activity, Calendar, Users, Pill, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
    { id: 'schedule', label: 'Smart Scheduling', icon: Calendar },
    { id: 'records', label: 'Medical Records', icon: Users },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col pt-8 pb-4">
      <div className="px-6 pb-8 flex items-center space-x-3 text-emerald-400">
        <Activity size={28} />
        <span className="text-xl font-semibold tracking-wide">Cerulean</span>
      </div>

      <nav className="flex-1 space-y-2 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group relative",
              activeTab === item.id 
                ? "text-white" 
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-emerald-600/20 border border-emerald-500/30 rounded-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon size={18} className="relative z-10" />
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-3 mt-auto">
        <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};
