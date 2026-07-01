import React, { useState } from "react";
import { Pill, PackageOpen, AlertOctagon, CheckCircle2, Search, ArrowRight } from "lucide-react";

import toast from "react-hot-toast";

export const PharmacyDashboard = () => {
  const [prescriptionsQueue, setPrescriptionsQueue] = useState([
    { id: 1, patient: "Meenakshi S.", doctor: "Dr. Mohan", items: 3 },
    { id: 2, patient: "Karthick Raja", doctor: "Dr. Dinesh", items: 1 },
    { id: 3, patient: "Anjali Devi", doctor: "Dr. Sarah", items: 2 },
    { id: 4, patient: "Kumar V.", doctor: "Dr. Ramesh", items: 4 },
  ]);

  const [inventoryAlerts, setInventoryAlerts] = useState([
    { id: 1, name: "Paracetamol 500mg", stock: 12, isCritical: true },
    { id: 2, name: "Amoxicillin 250mg", stock: 45, isCritical: false },
    { id: 3, name: "Omeprazole 20mg", stock: 45, isCritical: false },
  ]);

  const handleDispense = (id: number, patientName: string) => {
    setPrescriptionsQueue(prev => prev.filter(p => p.id !== id));
    toast.success(`Prescription dispensed for ${patientName}`);
  };

  const handleReorder = (id: number, medName: string) => {
    setInventoryAlerts(prev => prev.filter(i => i.id !== id));
    toast.success(`Reorder request placed for ${medName}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pharmacy Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage prescriptions, inventory, and dispensing.</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search Rx # or Patient..." 
            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
              <Pill size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">New Prescriptions</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{24 + prescriptionsQueue.length}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">To be dispensed</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Dispensed Today</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">142</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">Completed orders</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-500">
              <AlertOctagon size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Low Stock Alerts</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{2 + inventoryAlerts.length}</p>
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 font-medium">Medicines need reorder</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-500">
              <PackageOpen size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Pending Deliveries</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">2</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">From suppliers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Active Prescriptions Queue</h3>
            <button 
              onClick={() => toast("Navigating to full queue...", { icon: '📋' })}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {prescriptionsQueue.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                    Rx
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Patient: {item.patient}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.doctor} • {item.items} items</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDispense(item.id, item.patient)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium transition-colors"
                >
                  Dispense
                </button>
              </div>
            ))}
            {prescriptionsQueue.length === 0 && (
              <div className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                Queue is empty.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Inventory Alerts</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3">
             {inventoryAlerts.map((med) => (
                 <div key={med.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                       <div className={`p-2 rounded ${med.isCritical ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                          <AlertOctagon size={16} />
                       </div>
                       <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{med.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Stock: {med.stock} units remaining</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => handleReorder(med.id, med.name)}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                       Reorder <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                 </div>
             ))}
             {inventoryAlerts.length === 0 && (
               <div className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm flex-1 flex items-center justify-center">
                 No inventory alerts.
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
