import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  Clock,
  TriangleAlert,
  CircleCheck,
  User,
  Sparkles,
  Send,
  Download,
} from "lucide-react";
import { AppointmentData } from "../types";
import toast from "react-hot-toast";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { generateICalFile } from "../utils/icalendar";

export const SmartScheduling: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/appointments/today")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-5xl mx-auto"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            AI-Assisted Scheduling
          </h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center">
            <Sparkles size={14} className="text-[#0284c7] mr-1" />
            Optimizing provider availability and identifying no-show risks.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                  loading: "Dispatching SMS & Email reminders...",
                  success: "Reminders sent for upcoming appointments",
                  error: "Could not send reminders",
                },
              );
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center"
          >
            <Send size={16} className="mr-2" />
            Send 24h Reminders
          </button>
          <button
            onClick={() => {
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1500)),
                {
                  loading: "AI is analyzing provider schedules...",
                  success:
                    "Suggested slot: Tomorrow at 10:30 AM with Dr. Karthick",
                  error: "Could not suggest slot",
                },
              );
            }}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center"
          >
            <CalendarIcon size={16} className="mr-2" />
            Auto-Suggest Slot
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-medium text-slate-700">Today's Schedule</h3>
          <div className="text-sm text-slate-500 flex items-center">
            <Clock size={14} className="mr-1" />
            Updated just now
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          <AnimatePresence>
            {loading ? (
              <div className="p-6">
                <LoadingSkeleton type="list" count={4} />
              </div>
            ) : (
              (Array.isArray(appointments) ? appointments : []).map((apt) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="p-6 hover:bg-slate-50 flex items-center transition-colors"
                >
                  <div className="w-24 text-sm font-medium text-slate-500 flex-shrink-0">
                    {apt.time}
                  </div>

                  <div className="flex-1 px-4">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-slate-800 text-lg mr-3">
                        {apt.patient}
                      </h4>
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                        {apt.type}
                      </span>
                    </div>

                    {apt.alert && (
                      <div className="flex items-center mt-2 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded w-fit border border-amber-200">
                        <TriangleAlert size={12} className="mr-1.5" />
                        {apt.alert} ({(apt.risk * 100).toFixed(0)}% Risk)
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    {apt.status === "Completed" ||
                    apt.status === "Confirmed" ? (
                      <span className="flex items-center text-sm font-medium text-emerald-600">
                        <CircleCheck size={16} className="mr-1.5" />{" "}
                        {apt.status}
                      </span>
                    ) : apt.status === "In Progress" ? (
                      <span className="flex items-center text-sm font-medium text-[#0284c7]">
                        <span className="relative flex h-2.5 w-2.5 mr-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e0f2fe] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0284c7]"></span>
                        </span>
                        In Progress
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-500">
                        {apt.status}
                      </span>
                    )}

                    <button
                      onClick={() => {
                        const today = new Date();
                        const timeStr = apt.time; // e.g. "09:00 AM"
                        const timeParts = timeStr.match(/(\d+):(\d+)\s(AM|PM)/);
                        let startDate = new Date();
                        if (timeParts) {
                          let hours = parseInt(timeParts[1], 10);
                          const minutes = parseInt(timeParts[2], 10);
                          const ampm = timeParts[3];
                          if (ampm === "PM" && hours < 12) hours += 12;
                          if (ampm === "AM" && hours === 12) hours = 0;
                          startDate = new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate(),
                            hours,
                            minutes,
                          );
                        }
                        const endDate = new Date(
                          startDate.getTime() + 30 * 60 * 1000,
                        ); // 30 min duration for doctor slots

                        generateICalFile(
                          {
                            title: `Appointment with ${apt.patient}`,
                            description: `Type: ${apt.type}`,
                            startDate,
                            endDate,
                          },
                          `appointment_${apt.patient.replace(/\\s+/g, "_")}.ics`,
                        );
                        toast.success("Calendar file downloaded");
                      }}
                      title="Add to Calendar"
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Download size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-[#0284c7] hover:bg-[#e0f2fe] rounded-lg transition-colors">
                      <User size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
