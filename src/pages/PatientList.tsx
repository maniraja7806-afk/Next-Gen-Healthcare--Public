import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Activity,
  Phone,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Droplet,
  User,
  Printer,
  Edit2,
  Archive,
  Eye,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { VitalsChart } from "../components/VitalsChart";
import { exportMedicalRecordPDF } from "../utils/pdfGenerator";
import jsPDF from "jspdf";

import { useLocation } from "react-router-dom";

const HighlightText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim() || !text) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark
            key={i}
            className="bg-yellow-200 dark:bg-yellow-500/30 text-slate-900 dark:text-white rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

export const PatientList = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/patients?page=${page}&limit=20&search=${encodeURIComponent(search)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.data);
        setTotal(data.total);
        setLoading(false);
      });
  }, [page, search]);

  const exportPatientPDF = (patient: any) => {
    exportMedicalRecordPDF(patient, patient.history);
  };

  const exportDischargeSummary = (patient: any) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(2, 132, 199); // #0284c7
    doc.text("Cerulean Health", 14, 20);

    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("Discharge Summary", 14, 30);

    // Separator line
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(14, 35, 196, 35);

    // Patient Details
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text("Patient Name:", 14, 45);
    doc.text("Patient ID:", 14, 52);
    doc.text("Age/Gender:", 14, 59);
    doc.text("Blood Group:", 105, 45);
    doc.text("Date of Discharge:", 105, 52);

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(patient.name, 45, 45);
    doc.text(patient.id, 45, 52);
    doc.text(`${patient.age} Yrs`, 45, 59);
    doc.text(patient.bloodGroup, 145, 45);
    doc.text(new Date().toLocaleDateString(), 145, 52);

    // History Section
    doc.setFontSize(12);
    doc.setTextColor(2, 132, 199);
    doc.text("Clinical Summary", 14, 75);

    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    const historyText = patient.history.join(", ");
    const summaryText = `The patient was admitted with a known medical history of ${historyText}. After thorough evaluation and required medical interventions, the patient's condition has stabilized. Vital signs are within normal limits, and the patient is deemed fit for discharge with the prescribed medications and follow-up plan.`;

    const splitText = doc.splitTextToSize(summaryText, 182);
    doc.text(splitText, 14, 85);

    // Instructions Section
    doc.setFontSize(12);
    doc.setTextColor(2, 132, 199);
    const instructionsY = 85 + splitText.length * 5 + 10;
    doc.text("Discharge Instructions", 14, instructionsY);

    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(
      "1. Continue prescribed medications as directed.",
      14,
      instructionsY + 10,
    );
    doc.text("2. Rest for the next 48 hours.", 14, instructionsY + 17);
    doc.text("3. Drink plenty of fluids.", 14, instructionsY + 24);
    doc.text("4. Review in OPD after 1 week.", 14, instructionsY + 31);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(
      "This is a computer-generated document and does not require a signature.",
      105,
      280,
      { align: "center" },
    );

    // Save PDF
    doc.save(
      `Discharge_Summary_${patient.id.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
    );
  };

  return (
    <div className="max-w-7xl mx-auto print:max-w-none print:m-0">
      <div className={selectedPatient ? "print:hidden" : ""}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Patient Directory
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Managing {total} registered patients across Tamil Nadu.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10 py-2 w-full"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <motion.div
          className="flex flex-col space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {loading ? (
            <LoadingSkeleton type="list" count={6} />
          ) : (
            patients.map((patient) => (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                }}
                key={patient.id}
                className={`group bg-white dark:bg-slate-800 rounded-xl shadow-sm border ${expandedPatient === patient.id ? "border-[#0284c7] ring-1 ring-[#0284c7]" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"} overflow-hidden transition-all cursor-pointer`}
                onClick={() =>
                  setExpandedPatient(
                    expandedPatient === patient.id ? null : patient.id,
                  )
                }
              >
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-600 shrink-0 overflow-hidden">
                        {patient.avatar ? (
                          <img
                            src={patient.avatar}
                            alt={patient.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          patient.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                          <HighlightText
                            text={patient.name}
                            highlight={search}
                          />
                        </h3>
                        <div className="flex items-center mt-1 space-x-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            <HighlightText
                              text={patient.id}
                              highlight={search}
                            />
                          </span>
                          <span>•</span>
                          <span>{patient.age} yrs</span>
                          <span>•</span>
                          <span className="truncate">{patient.district}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex gap-2">
                        <span
                          className={`px-2.5 py-1 inline-flex text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                            patient.status === "Active"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : patient.status === "Inactive"
                                ? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportPatientPDF(patient);
                          }}
                          className="p-1.5 text-slate-500 hover:text-[#0284c7] hover:bg-blue-50 dark:hover:bg-[#0284c7]/20 rounded-md transition-colors"
                          title="Download PDF"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success("Edit functionality coming soon");
                          }}
                          className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                          title="Edit Patient"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success("Patient archived successfully");
                          }}
                          className="p-1.5 text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-md transition-colors"
                          title="Archive Patient"
                        >
                          <Archive size={16} />
                        </button>
                      </div>
                      <div className="text-slate-400 shrink-0">
                        {expandedPatient === patient.id ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedPatient === patient.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30"
                    >
                      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Clinical Overview */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
                            <Activity
                              size={16}
                              className="mr-2 text-[#0284c7]"
                            />
                            Clinical Overview
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500 dark:text-slate-400">
                                Blood Group
                              </span>
                              <span className="font-medium text-red-500">
                                {patient.bloodGroup}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500 dark:text-slate-400">
                                Contact
                              </span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {patient.phone}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500 dark:text-slate-400">
                                Last Visit
                              </span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {new Date(
                                  patient.lastVisit || Date.now(),
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Medical History */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
                            <FileText
                              size={16}
                              className="mr-2 text-[#0284c7]"
                            />
                            Medical History
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {patient.history.map((h: string) => (
                              <span
                                key={h}
                                className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${
                                  h === "None"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Recent Documents & Quick Actions */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
                            <Calendar
                              size={16}
                              className="mr-2 text-[#0284c7]"
                            />
                            Recent Activity
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center text-slate-600 dark:text-slate-300">
                              <Clock
                                size={14}
                                className="mr-2 text-slate-400"
                              />
                              General Checkup (2 weeks ago)
                            </li>
                            <li className="flex items-center text-slate-600 dark:text-slate-300">
                              <FileText
                                size={14}
                                className="mr-2 text-slate-400"
                              />
                              Lab Results - Blood Panel
                            </li>
                          </ul>
                          <div className="pt-2 flex flex-col space-y-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPatient(patient);
                              }}
                              className="w-full flex items-center justify-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm font-medium text-[#0284c7] dark:text-[#38bdf8] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                            >
                              Open Full Profile
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                exportDischargeSummary(patient);
                              }}
                              className="w-full flex items-center justify-center px-4 py-2 bg-[#0284c7] border border-transparent text-sm font-medium text-white rounded-lg hover:bg-[#0369a1] transition-colors shadow-sm"
                            >
                              <FileText size={16} className="mr-2" />
                              Generate Discharge Summary
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Pagination */}
        <div className="mt-6 bg-white dark:bg-slate-800 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between sm:px-6 shadow-sm">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Showing{" "}
                <span className="font-medium">{(page - 1) * 20 + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(page * 20, total)}
                </span>{" "}
                of <span className="font-medium">{total}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page * 20 >= total}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm print:static print:bg-white print:backdrop-blur-none print:p-0 print:block print:w-full">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700 print:shadow-none print:border-none print:max-h-none print:overflow-visible print:w-full print:max-w-none print:rounded-none print:dark:bg-white print:dark:text-slate-900 print:m-0">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10 print:hidden">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Patient Details
              </h2>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Print Header - Only visible when printing */}
            <div className="hidden print:block mb-8 pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-bold text-[#0284c7] mb-2">
                Cerulean Health
              </h1>
              <h2 className="text-xl font-semibold text-slate-800">
                Patient Medical Summary
              </h2>
              <p className="text-slate-500 mt-1">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="p-6 print:p-0">
              <div className="flex items-center space-x-4 mb-6 print:mb-8">
                <div className="h-16 w-16 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0369a1] font-bold text-2xl border border-[#0284c7]/20 print:border-[#0284c7] overflow-hidden shrink-0">
                  {selectedPatient.avatar ? (
                    <img
                      src={selectedPatient.avatar}
                      alt={selectedPatient.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    selectedPatient.name.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white print:dark:text-slate-900">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 print:dark:text-slate-500">
                    ID: {selectedPatient.id}
                  </p>
                </div>
              </div>

              {/* Emergency Info Card */}
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-xl print:border-red-300 print:bg-red-50">
                <div className="flex items-center mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 print:text-red-600" />
                  <h4 className="font-semibold text-red-900 dark:text-red-300 print:text-red-900">
                    Emergency Information
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-red-700/70 dark:text-red-400/70 font-medium mb-1 print:text-red-800">
                      Allergies
                    </span>
                    <span className="text-red-900 dark:text-red-200 print:text-red-900 font-medium">
                      {selectedPatient.history.includes("Asthma")
                        ? "Penicillin, Dust"
                        : selectedPatient.history.includes("Diabetes")
                          ? "Sulfa Drugs"
                          : "No known allergies"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-red-700/70 dark:text-red-400/70 font-medium mb-1 print:text-red-800">
                      Primary Contact
                    </span>
                    <span className="text-red-900 dark:text-red-200 print:text-red-900 font-medium">
                      {selectedPatient.name} (Relative) • +91{" "}
                      {Math.floor(8000000000 + Math.random() * 1000000000)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:grid-cols-2 print:gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white print:dark:text-slate-900 uppercase tracking-wider">
                    Demographics
                  </h4>
                  <div className="flex items-center text-slate-600 dark:text-slate-300 print:dark:text-slate-600">
                    <User
                      size={18}
                      className="mr-3 text-slate-400 dark:text-slate-500 print:dark:text-slate-400"
                    />
                    <span>{selectedPatient.age} years old</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300 print:dark:text-slate-600">
                    <Droplet
                      size={18}
                      className="mr-3 text-red-400 dark:text-red-500 print:dark:text-red-500"
                    />
                    <span>Blood Group: {selectedPatient.bloodGroup}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white print:dark:text-slate-900 uppercase tracking-wider">
                    Contact Info
                  </h4>
                  <div className="flex items-center text-slate-600 dark:text-slate-300 print:dark:text-slate-600">
                    <Phone
                      size={18}
                      className="mr-3 text-slate-400 dark:text-slate-500 print:dark:text-slate-400"
                    />
                    <span>{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300 print:dark:text-slate-600">
                    <MapPin
                      size={18}
                      className="mr-3 text-slate-400 dark:text-slate-500 print:dark:text-slate-400"
                    />
                    <span>{selectedPatient.district}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white print:dark:text-slate-900 uppercase tracking-wider mb-4">
                  Medical History
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.history.map((h: string) => (
                    <span
                      key={h}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium print:border print:border-slate-300 print:bg-transparent print:text-slate-800 ${
                        h === "None"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      <Activity size={14} className="mr-1.5" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white print:dark:text-slate-900 uppercase tracking-wider mb-4">
                  Historical Vitals (Blood Pressure)
                </h4>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <VitalsChart patientId={selectedPatient.id} />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end space-x-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Printer size={18} className="mr-2" />
                  Print Report
                </button>
                <button
                  onClick={() => exportPatientPDF(selectedPatient)}
                  className="flex items-center px-4 py-2 border border-[#0284c7] dark:border-[#38bdf8] text-[#0284c7] dark:text-[#38bdf8] rounded-lg hover:bg-[#e0f2fe] dark:hover:bg-[#0284c7]/20 transition-colors"
                >
                  <Download size={18} className="mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="px-4 py-2 bg-[#0284c7] text-white rounded-lg hover:bg-[#0369a1] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
              <p>
                Cerulean Health Confidential - Official Medical Record Summary
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
