import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  QrCode,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";
import { CheckInQRModal } from "../components/CheckInQRModal";
import { generateICalFile } from "../utils/icalendar";

export const PatientAppointments = () => {
  const [selectedQRAppointment, setSelectedQRAppointment] = useState<
    any | null
  >(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
      case "scheduled":
      case "upcoming":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "in progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Karthick Raja",
      specialty: "Cardiologist",
      date: "Oct 24, 2026",
      time: "10:00 AM",
      type: "Follow-up",
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Dinesh Kumar",
      specialty: "Endocrinologist",
      date: "Nov 12, 2026",
      time: "02:30 PM",
      type: "Consultation",
      status: "Upcoming",
    },
    {
      id: 3,
      doctor: "Dr. Mohan Raj",
      specialty: "General Practice",
      date: "Sep 05, 2026",
      time: "09:15 AM",
      type: "Check-up",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            My Appointments
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and manage your scheduled appointments.
          </p>
        </div>
        <button
          onClick={() => {
            toast.success("Opening booking flow...");
          }}
          className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center"
        >
          <Calendar size={16} className="mr-2" />
          Book New Appointment
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {appointments.map((apt) => (
            <li
              key={apt.id}
              className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#e0f2fe] dark:bg-blue-900/30 flex items-center justify-center text-[#0369a1] dark:text-blue-400">
                      <Calendar size={20} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex flex-col sm:flex-row sm:items-center gap-2">
                      {apt.doctor}
                      <span
                        className={`w-fit px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}
                      >
                        {apt.status}
                      </span>
                    </h3>
                    <p className="text-sm text-[#0284c7] font-medium mt-1">
                      {apt.specialty} • {apt.type}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> {apt.date}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" /> {apt.time}
                      </span>
                    </div>
                  </div>
                </div>

                {apt.status === "Upcoming" && (
                  <div className="flex flex-row flex-wrap items-center gap-2 mt-4 md:mt-0 ml-14 md:ml-4">
                    <button
                      onClick={() => {
                        const startDate = new Date(`${apt.date} ${apt.time}`);
                        const endDate = new Date(
                          startDate.getTime() + 60 * 60 * 1000,
                        ); // 1 hour duration
                        generateICalFile({
                          title: `Appointment with ${apt.doctor}`,
                          description: `Specialty: ${apt.specialty}\\nType: ${apt.type}`,
                          startDate,
                          endDate,
                        });
                        toast.success("Calendar file downloaded");
                      }}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center"
                    >
                      <Download size={16} className="mr-2" />
                      Add to Calendar
                    </button>
                    <button
                      onClick={() => setSelectedQRAppointment(apt)}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-[#0284c7] dark:text-[#38bdf8] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center"
                    >
                      <QrCode size={16} className="mr-2" />
                      Check In QR
                    </button>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <CheckInQRModal
        isOpen={selectedQRAppointment !== null}
        onClose={() => setSelectedQRAppointment(null)}
        appointmentData={selectedQRAppointment}
      />
    </div>
  );
};
