import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Pill,
  Activity,
  CalendarPlus,
  FileText,
  Stethoscope,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { WearableMetrics } from "../components/WearableMetrics";
import { OnboardingTour } from "../components/OnboardingTour";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

import { HistoricalVitalsChart } from "../components/HistoricalVitalsChart";
import { BMITrendChart } from "../components/BMITrendChart";

import { useLanguage } from "../contexts/LanguageContext";

export const PatientDashboard = () => {
  const { t } = useLanguage();
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("cerulean_user") || "{}"),
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Karthick Raja",
      specialization: "Cardiologist",
      date: "Oct 24, 2026",
      time: "10:00 AM",
      location: "Room 302, Main Wing",
      status: "Upcoming",
    },
  ];

  useEffect(() => {
    // Check if notification was already shown in this session
    const hasShownNotification = sessionStorage.getItem("appointment_notified");

    if (!hasShownNotification && upcomingAppointments.length > 0) {
      const nextApt = upcomingAppointments[0];

      // Delay toast slightly for better UX on load
      const timer = setTimeout(() => {
        toast(
          (t) => (
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400 mt-0.5">
                <Bell size={18} />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Upcoming Appointment Reminder
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  You have an appointment with <strong>{nextApt.doctor}</strong>{" "}
                  at <strong>{nextApt.time}</strong> on {nextApt.date}.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      toast.dismiss(t.id);
                      navigate("/patient/appointments");
                    }}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ),
          { duration: 8000, position: "top-right" },
        );

        sessionStorage.setItem("appointment_notified", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const quickActions = [
    {
      name: t("dashboard.schedule_appt"),
      icon: CalendarPlus,
      path: "/patient/appointments",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      name: t("dashboard.request_refill"),
      icon: Pill,
      path: "/patient/prescriptions",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    {
      name: t("dashboard.find_doctor"),
      icon: Stethoscope,
      path: "/patient/doctors",
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      name: t("dashboard.lab_results"),
      icon: FileText,
      path: "#",
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      action: () => toast("Lab results portal coming soon."),
    },
  ];

  if (isLoading) {
    return <LoadingSkeleton type="dashboard" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      className="space-y-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            {t("dashboard.welcome")}, {user.name || "Patient"}!
          </h1>
          <p className="text-blue-100 max-w-2xl text-lg">
            Manage your health, appointments, and prescriptions all in one
            place.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
          <Activity size={120} strokeWidth={1} />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() =>
              action.action ? action.action() : navigate(action.path)
            }
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all group"
          >
            <div
              className={`p-3 rounded-full mb-3 ${action.color} group-hover:scale-110 transition-transform`}
            >
              <action.icon size={24} />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {action.name}
            </span>
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Calendar className="mr-2 text-[#0284c7]" size={24} />
              Upcoming Appointment
            </h2>
            <button
              onClick={() => navigate("/patient/appointments")}
              className="text-sm font-medium text-[#0284c7] hover:text-[#0369a1]"
            >
              View All
            </button>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-5 border border-slate-100 dark:border-slate-600">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                    {upcomingAppointments[0].doctor}
                  </h3>
                  <p className="text-sm text-[#0284c7] font-medium mb-4">
                    {upcomingAppointments[0].specialization}
                  </p>
                </div>
                <span className="w-fit px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  {upcomingAppointments[0].status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                  <Calendar size={16} className="mr-2 text-slate-400" />
                  {upcomingAppointments[0].date}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                  <Clock size={16} className="mr-2 text-slate-400" />
                  {upcomingAppointments[0].time}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                  <MapPin size={16} className="mr-2 text-slate-400" />
                  {upcomingAppointments[0].location}
                </div>
              </div>
              <div className="mt-5 flex space-x-3">
                <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Reschedule
                </button>
                <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No upcoming appointments.
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Pill className="mr-2 text-[#0284c7]" size={24} />
              Current Medications
            </h2>
            <button
              onClick={() => navigate("/patient/prescriptions")}
              className="text-sm font-medium text-[#0284c7] hover:text-[#0369a1]"
            >
              View Prescriptions
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Lisinopril
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  10mg - Take 1 tablet daily
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Active
                </span>
                <p className="text-xs text-slate-400 mt-1">Refills: 2</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Atorvastatin
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  20mg - Take 1 tablet at bedtime
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Active
                </span>
                <p className="text-xs text-slate-400 mt-1">Refills: 1</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <HistoricalVitalsChart />
      </motion.div>

      <motion.div variants={itemVariants}>
        <BMITrendChart />
      </motion.div>

      <motion.div variants={itemVariants}>
        <WearableMetrics />
      </motion.div>

      <OnboardingTour />
    </motion.div>
  );
};
