import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Bell,
  Check,
  Trash2,
  Calendar,
  Pill,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Notifications = () => {
  const { notifications, markAllAsRead, deleteNotification } =
    useOutletContext<any>();

  const unreadCount = notifications.filter((n: any) => n.unread).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Bell className="mr-3 text-[#0284c7]" size={28} />
            Notifications
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center text-sm font-medium text-[#0284c7] hover:text-[#0369a1] bg-[#e0f2fe] hover:bg-[#bae6fd] dark:bg-slate-800 dark:text-sky-400 dark:hover:text-sky-300 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Check size={16} className="mr-2" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          <AnimatePresence>
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    className={`p-4 sm:p-6 transition-colors group flex items-start gap-4 border-l-4 ${
                      notification.unread
                        ? "bg-white dark:bg-slate-800 border-l-[#0284c7] hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        : "bg-slate-50 dark:bg-slate-900/50 border-l-transparent opacity-75 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-full flex-shrink-0 ${
                        notification.type === "alert"
                          ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                          : notification.type === "appointment"
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                        <div>
                          <h3
                            className={`text-base font-semibold ${
                              notification.unread
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-700 dark:text-slate-200"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p
                            className={`text-sm mt-1 ${
                              notification.unread
                                ? "text-slate-600 dark:text-slate-300"
                                : "text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-2 shrink-0">
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {notification.time}
                          </span>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 sm:mt-1 p-1"
                            title="Delete notification"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center"
              >
                <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Bell className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                  You're all caught up!
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  There are no new notifications.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
