import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  Calendar,
  Clock,
  X,
  Video,
  MapPin,
  CheckCircle,
} from "lucide-react";

export const AppointmentReminderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("cerulean_user");
    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);
      // Only show for patients
      if (user.role !== "Patient") return;

      const dismissed = localStorage.getItem("cerulean_reminder_dismissed");
      // For demo purposes, we will show it if not dismissed yet today
      const today = new Date().toDateString();
      if (dismissed === today) return;

      // Simulate checking for appointments within 24 hours
      // Small delay so it doesn't clash with onboarding tour or login immediately
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAcknowledge = () => {
    setHasAcknowledged(true);
    setTimeout(() => {
      setIsOpen(false);
      localStorage.setItem(
        "cerulean_reminder_dismissed",
        new Date().toDateString(),
      );
    }, 1500);
  };

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(
      "cerulean_reminder_dismissed",
      new Date().toDateString(),
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          {hasAcknowledged ? (
            <div className="p-10 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle size={32} />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Confirmed!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We've sent a reminder to your phone.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-amber-500 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-md">
                    <Bell size={24} className="animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">
                    Upcoming Appointment
                  </h2>
                  <p className="text-amber-100 font-medium">
                    Starting in less than 24 hours
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 mb-6">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                      <Video size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        Dr. Dinesh Kumar
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        General Practice (Video Consultation)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-700 dark:text-slate-300">
                      <Calendar size={16} className="text-slate-400 mr-3" />
                      Tomorrow
                    </div>
                    <div className="flex items-center text-slate-700 dark:text-slate-300">
                      <Clock size={16} className="text-slate-400 mr-3" />
                      09:15 AM
                    </div>
                    <div className="flex items-center text-slate-700 dark:text-slate-300">
                      <MapPin size={16} className="text-slate-400 mr-3" />
                      Online Portal
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDismiss}
                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Remind Later
                  </button>
                  <button
                    onClick={handleAcknowledge}
                    className="flex-1 px-4 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium rounded-xl shadow-sm transition-colors"
                  >
                    I'll be there
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
