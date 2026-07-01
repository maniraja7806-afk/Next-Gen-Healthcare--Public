import React from 'react';
import { Pill, Calendar, Download, Info } from 'lucide-react';
import { exportPrescriptionPDF } from '../utils/pdfGenerator';

export const PatientPrescriptions = () => {
  const prescriptions = [
    {
      id: 'RX-74892',
      medication: 'Lisinopril',
      dosage: '10mg',
      instructions: 'Take 1 tablet daily with water',
      prescribedBy: 'Dr. Karthick Raja',
      date: 'Oct 15, 2026',
      status: 'Active',
      refills: 2
    },
    {
      id: 'RX-74893',
      medication: 'Atorvastatin',
      dosage: '20mg',
      instructions: 'Take 1 tablet at bedtime',
      prescribedBy: 'Dr. Dinesh Kumar',
      date: 'Sep 10, 2026',
      status: 'Active',
      refills: 1
    },
    {
      id: 'RX-63211',
      medication: 'Amoxicillin',
      dosage: '500mg',
      instructions: 'Take 1 capsule 3 times a day for 7 days',
      prescribedBy: 'Dr. Mohan Raj',
      date: 'Feb 12, 2026',
      status: 'Completed',
      refills: 0
    }
  ];

  const handleExport = (rx: any) => {
    exportPrescriptionPDF(rx, { name: "Current Patient" });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Prescriptions</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View your active medications and prescription history.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {prescriptions.map((rx) => (
            <li key={rx.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Pill className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      {rx.medication} <span className="text-sm font-normal text-slate-500">{rx.dosage}</span>
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{rx.instructions}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center"><Info size={14} className="mr-1" /> ID: {rx.id}</span>
                      <span className="flex items-center"><Calendar size={14} className="mr-1" /> {rx.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between md:justify-center mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-slate-100 dark:border-slate-700 gap-2 sm:gap-4 md:gap-2">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Prescriber: {rx.prescribedBy}
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rx.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {rx.status}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-2">Refills: {rx.refills}</span>
                    <button 
                      onClick={() => handleExport(rx)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title="Download PDF"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
