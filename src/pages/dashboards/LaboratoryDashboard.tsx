import React, { useState } from "react";
import { TestTube, FileSearch, Beaker, CheckCircle2, Clock, Microscope, Download, X } from "lucide-react";
import { exportLabReportPDF } from "../../utils/pdfGenerator";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";

export const LaboratoryDashboard = () => {
  const [isRegisterSampleOpen, setIsRegisterSampleOpen] = useState(false);

  const handleRegisterSample = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterSampleOpen(false);
    toast.success("Sample registered successfully. ID: SPL-" + Math.floor(Math.random() * 10000));
  };
  
  const handleExportLabReport = (testName: string, patientName: string) => {
    const report = {
      testName: testName,
      date: new Date().toLocaleDateString(),
      results: [
        { parameter: "WBC Count", value: "6.5 x10^3/uL", referenceRange: "4.5 - 11.0", status: "Normal" },
        { parameter: "RBC Count", value: "4.2 x10^6/uL", referenceRange: "4.0 - 5.5", status: "Normal" },
        { parameter: "Hemoglobin", value: "11.2 g/dL", referenceRange: "12.0 - 15.5", status: "Low" },
        { parameter: "Platelets", value: "150 x10^3/uL", referenceRange: "150 - 450", status: "Normal" },
      ]
    };
    exportLabReportPDF(report, { name: patientName });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Laboratory Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage sample collections, test processing, and reports.</p>
        </div>
        <button 
          onClick={() => setIsRegisterSampleOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm"
        >
          <TestTube className="w-4 h-4 mr-2" />
          Register Sample
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-pink-500">
              <TestTube size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Samples Collected</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">45</p>
          <p className="text-xs text-pink-600 dark:text-pink-400 mt-2 font-medium">To be analyzed</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-500">
              <Microscope size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">In Processing</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">Running on analyzers</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-teal-500">
              <FileSearch size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Reports Ready</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">18</p>
          <p className="text-xs text-teal-600 dark:text-teal-400 mt-2 font-medium">Awaiting doctor review</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Completed Today</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">86</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">Results dispatched</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Recent Test Requests</h3>
            <button onClick={() => toast("Navigating to full list...", { icon: '🔍' })} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                    <Beaker size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Complete Blood Count (CBC)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Patient: Kalaivani R • Dr. Dinesh</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   {i % 2 === 0 ? (
                     <>
                       <span className="text-[11px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                         Ready
                       </span>
                       <button 
                         onClick={() => handleExportLabReport("Complete Blood Count (CBC)", "Kalaivani R")}
                         className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-1"
                         title="Download Report PDF"
                       >
                         <Download size={16} />
                       </button>
                     </>
                   ) : (
                     <span className="text-[11px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                       Pending
                     </span>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-semibold text-slate-800 dark:text-white">Analyzer Status</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
             <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">Hematology Analyzer (Sysmex)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Running • 12 samples in queue</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">98%</span>
             </div>
             
             <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">Biochemistry (Cobas)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Idle • 0 samples in queue</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Ready</span>
             </div>

             <div className="flex items-center justify-between p-4 rounded-lg border border-rose-200 bg-rose-50 dark:bg-rose-900/10 dark:border-rose-900/30">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <div>
                    <h4 className="text-sm font-medium text-rose-900 dark:text-rose-200">Immunoassay Analyzer</h4>
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">Maintenance Required • Calibration failed</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-rose-600 dark:text-rose-400">Offline</span>
             </div>
          </div>
        </div>
      </div>

      {isRegisterSampleOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <TestTube className="w-5 h-5 mr-2 text-indigo-500" />
                Register New Sample
              </h2>
              <button
                onClick={() => setIsRegisterSampleOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleRegisterSample} className="p-4 space-y-4">
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
                  Test Required
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Test...</option>
                  <option value="cbc">Complete Blood Count (CBC)</option>
                  <option value="lft">Liver Function Test (LFT)</option>
                  <option value="rft">Renal Function Test (RFT)</option>
                  <option value="lipid">Lipid Profile</option>
                  <option value="hba1c">HbA1c</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Sample Type
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="blood">Blood</option>
                  <option value="urine">Urine</option>
                  <option value="swab">Swab</option>
                  <option value="stool">Stool</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterSampleOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Register Sample
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
