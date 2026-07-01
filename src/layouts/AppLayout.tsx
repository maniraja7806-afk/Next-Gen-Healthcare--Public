import React, { useState, useRef, useEffect, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import {
  Activity,
  Users,
  UserRound,
  LayoutDashboard,
  Settings,
  LogOut,
  FileText,
  Calendar,
  Pill,
  Search,
  Bell,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
  User as UserIcon,
  Shield,
  Globe,
  Palette,
  Package,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import toast from "react-hot-toast";
import { useVitalSignsMonitor } from "../hooks/useVitalSignsMonitor";
import { PatientAssistantFAB } from "../components/PatientAssistantFAB";
import { AppointmentReminderModal } from "../components/AppointmentReminderModal";
import { FeedbackModal } from "../components/FeedbackModal";
import { useLanguage } from "../contexts/LanguageContext";

export const AppLayout = () => {
  const { t } = useLanguage();
  useVitalSignsMonitor();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("cerulean_user") || "{}"),
  );

  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem("cerulean_user") || "{}"));
    };
    window.addEventListener("user-updated", handleUserUpdate);
    return () => window.removeEventListener("user-updated", handleUserUpdate);
  }, []);

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchableData = useMemo(() => {
    const patients = [
      { id: "PT-7829", title: "Kalaivani R", subtitle: "Patient • Hypertension", type: "patient", route: "/patient/PT-7829" },
      { id: "PT-3291", title: "Anbu Selvan", subtitle: "Patient • Type 2 Diabetes", type: "patient", route: "/patient/PT-3291" },
      { id: "PT-9482", title: "Meenakshi", subtitle: "Patient • Osteoarthritis", type: "patient", route: "/patient/PT-9482" },
      { id: "PT-1102", title: "Saravanan", subtitle: "Patient • Asthma", type: "patient", route: "/patient/PT-1102" },
      { id: "PT-4593", title: "Muthu Kumar", subtitle: "Patient • Coronary Artery Disease", type: "patient", route: "/patient/PT-4593" },
    ];
    
    const staff = [
      { id: "STF-1001", title: "Dr. Sarah Jenkins", subtitle: "Staff • Chief of Surgery", type: "staff", route: "/admin/staff" },
      { id: "STF-1002", title: "Dr. Ramesh", subtitle: "Staff • Cardiologist", type: "staff", route: "/admin/staff" },
      { id: "STF-1003", title: "Nurse Priya", subtitle: "Staff • Head Nurse", type: "staff", route: "/admin/staff" },
    ];

    const appointments = [
      { id: "APT-2026-001", title: "Follow-up: Kalaivani R", subtitle: "Appointment • Today 09:00 AM", type: "appointment", route: "/admin/appointments" },
      { id: "APT-2026-002", title: "Consultation: Muthu Kumar", subtitle: "Appointment • Tomorrow 10:30 AM", type: "appointment", route: "/admin/appointments" },
    ];

    return [...patients, ...staff, ...appointments];
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const fuse = new Fuse(searchableData, {
      keys: ['title', 'subtitle', 'id'],
      threshold: 0.4,
    });
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, searchableData]);

  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    return (
      (localStorage.getItem("cerulean_theme") as "light" | "dark" | "system") ||
      "system"
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("cerulean_theme", theme);
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes if set to system
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(mediaQuery.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Appointment",
      message: "Kalaivani R scheduled for 09:00 AM",
      time: "10 min ago",
      unread: true,
      type: "appointment",
      icon: Calendar,
    },
    {
      id: 2,
      title: "Prescription Alert",
      message: "Interaction warning for patient Saravanan",
      time: "1 hour ago",
      unread: true,
      type: "alert",
      icon: Pill,
    },
    {
      id: 3,
      title: "System Update",
      message: "Cerulean Health has been updated to v2.1",
      time: "2 days ago",
      unread: false,
      type: "system",
      icon: Bell,
    },
    {
      id: 4,
      title: "Low Stock Alert",
      message: "Paracetamol inventory is running low",
      time: "3 days ago",
      unread: false,
      type: "alert",
      icon: AlertTriangle,
    },
  ]);

  const hasUnread = notifications.some((n) => n.unread);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate(`${basePath}/notifications`);
  };

  const getBasePath = () => {
    switch (user.role) {
      case "Super Admin": return "/superadmin";
      case "Hospital Admin": return "/hospitaladmin";
      case "Doctor": return "/doctor";
      case "Nurse": return "/nurse";
      case "Receptionist": return "/receptionist";
      case "Laboratory": return "/laboratory";
      case "Pharmacy": return "/pharmacy";
      case "Insurance": return "/insurance";
      case "Patient": return "/patient";
      default: return "/admin";
    }
  };

  const basePath = getBasePath();

  const getMenuItems = () => {
    const defaultSettings = { name: t("nav.settings"), icon: Settings, path: `${basePath}/settings` };
    const defaultDashboard = { name: t("nav.dashboard"), icon: LayoutDashboard, path: basePath };

    switch (user.role) {
      case "Super Admin":
        return [
          defaultDashboard,
          { name: "Staff Directory", icon: Users, path: `${basePath}/staff` },
          defaultSettings,
        ];
      case "Hospital Admin":
      case "Admin":
        return [
          defaultDashboard,
          { name: "Staff Directory", icon: Users, path: `${basePath}/staff` },
          { name: "Doctors", icon: UserRound, path: `${basePath}/doctors` },
          { name: t("nav.patients"), icon: Users, path: `${basePath}/patients` },
          { name: t("nav.appointments"), icon: Calendar, path: `${basePath}/appointments` },
          { name: t("nav.prescriptions"), icon: Pill, path: `${basePath}/prescriptions` },
          { name: "Pharmacy", icon: Package, path: `${basePath}/pharmacy` },
          { name: "Reports", icon: FileText, path: `${basePath}/reports` },
          defaultSettings,
        ];
      case "Doctor":
        return [
          defaultDashboard,
          { name: t("nav.patients"), icon: Users, path: `${basePath}/patients` },
          { name: t("nav.appointments"), icon: Calendar, path: `${basePath}/appointments` },
          { name: t("nav.prescriptions"), icon: Pill, path: `${basePath}/prescriptions` },
          defaultSettings,
        ];
      case "Nurse":
        return [
          defaultDashboard,
          { name: t("nav.patients"), icon: Users, path: `${basePath}/patients` },
          defaultSettings,
        ];
      case "Receptionist":
        return [
          defaultDashboard,
          { name: t("nav.appointments"), icon: Calendar, path: `${basePath}/appointments` },
          { name: t("nav.patients"), icon: Users, path: `${basePath}/patients` },
          defaultSettings,
        ];
      case "Laboratory":
        return [
          defaultDashboard,
          defaultSettings,
        ];
      case "Pharmacy":
        return [
          defaultDashboard,
          { name: "Inventory", icon: Package, path: `${basePath}/inventory` },
          { name: "Prescriptions", icon: Pill, path: `${basePath}/prescriptions` },
          defaultSettings,
        ];
      case "Insurance":
        return [
          defaultDashboard,
          defaultSettings,
        ];
      case "Patient":
        return [
          defaultDashboard,
          { name: "Find Doctors", icon: UserRound, path: `${basePath}/doctors` },
          { name: t("nav.appointments"), icon: Calendar, path: `${basePath}/appointments` },
          { name: t("nav.prescriptions"), icon: Pill, path: `${basePath}/prescriptions` },
          defaultSettings,
        ];
      default:
        return [defaultDashboard, defaultSettings];
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    localStorage.removeItem("cerulean_token");
    localStorage.removeItem("cerulean_user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F8FBFF] font-sans overflow-hidden print:h-auto print:overflow-visible">
      {/* Sidebar */}
      <div className="w-64 bg-[#0284c7] text-white flex flex-col print:hidden">
        <div className="h-16 flex items-center px-6 border-b border-[#0369a1]">
          <Activity className="text-white mr-2" size={24} />
          <span className="text-xl font-bold tracking-tight text-white">
            Cerulean Health
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              {user.role} Portal
            </p>
          </div>
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== basePath &&
                  location.pathname.startsWith(item.path));
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-white text-[#0284c7]"
                      : "text-white hover:bg-[#0369a1]"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive
                        ? "text-[#0284c7]"
                        : "text-blue-200 group-hover:text-white"
                    }`}
                  />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#0369a1]">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-[#0369a1] transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-blue-200" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 dark:bg-slate-900 transition-colors print:block print:overflow-visible">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-8 z-[100] relative transition-colors print:hidden">
          <div className="flex-1 flex items-center">
            <div
              className="max-w-lg w-full lg:max-w-xs relative"
              ref={searchRef}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
              </div>
              <input
                className="form-input pl-10 py-2"
                placeholder="Search patient, doctor, or ID..."
                type="search"
                spellCheck={false}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (searchResults.length > 0) {
                      toast.success(
                        `Navigating to ${searchResults[0].title}...`,
                      );
                      navigate(searchResults[0].route);
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    } else {
                      toast.success(
                        `Searching for "${e.currentTarget.value}"...`,
                      );
                    }
                  }
                }}
              />

              {isSearchOpen && searchQuery && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden z-[9999]">
                  {searchResults.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto py-2">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#0f172a] cursor-pointer transition-colors"
                          onClick={() => {
                            toast.success(
                              `Opening ${item.title}`,
                            );
                            navigate(item.route);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-full">
                              {item.id}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {item.subtitle}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="ml-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "bg-white dark:bg-slate-700 shadow-sm text-amber-500" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                title="Light Mode"
              >
                <Sun size={16} />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-md transition-colors ${theme === "dark" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                title="Dark Mode"
              >
                <Moon size={16} />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-md transition-colors ${theme === "system" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                title="System Mode"
              >
                <Monitor size={16} />
              </button>
            </div>

            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-400 hover:text-gray-500 relative transition-colors focus:outline-none focus:ring-2 focus:ring-[#0284c7] rounded-full p-1"
              >
                {hasUnread && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
                <Bell className="h-6 w-6" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden z-[9999]">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                      Notifications
                    </h3>
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[#0284c7] hover:text-[#0369a1] dark:text-[#38bdf8] dark:hover:text-blue-300 font-medium flex items-center"
                    >
                      <CheckCircle2 size={14} className="mr-1" />
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-[28rem] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-slate-100 dark:border-slate-700/50 transition-colors cursor-pointer border-l-2 ${notification.unread ? "bg-white dark:bg-slate-800 border-l-[#0284c7] hover:bg-slate-50 dark:hover:bg-slate-700/50" : "bg-slate-50 dark:bg-slate-900/50 border-l-transparent opacity-75 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-[#0f172a]"}`}
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === notification.id
                                ? { ...n, unread: false }
                                : n,
                            ),
                          );
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4
                            className={`text-sm font-medium ${notification.unread ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}
                          >
                            {notification.title}
                          </h4>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-[#0f172a] transition-colors">
                    <button
                      onClick={handleViewAllNotifications}
                      className="text-sm font-medium text-[#0284c7] dark:text-[#38bdf8]"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={profileMenuRef}>
              <div
                className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {user.name || "Admin User"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.role || "Admin"}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#e0f2fe] dark:bg-slate-700 flex items-center justify-center text-[#0369a1] dark:text-[#38bdf8] font-bold border border-[#0284c7]/20 dark:border-slate-600">
                  {user.name
                    ? user.name.substring(0, 2).toUpperCase().replace("DR", "D")
                    : "AD"}
                </div>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden z-[9999]">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2.5 text-sm flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#0f172a] hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors">
                      <UserIcon
                        size={18}
                        className="mr-3 text-slate-400 dark:text-slate-500"
                      />
                      Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#0f172a] hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors">
                      <Shield
                        size={18}
                        className="mr-3 text-slate-400 dark:text-slate-500"
                      />
                      Security
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#0f172a] hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors">
                      <Bell
                        size={18}
                        className="mr-3 text-slate-400 dark:text-slate-500"
                      />
                      Notifications
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#0f172a] hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors">
                      <Globe
                        size={18}
                        className="mr-3 text-slate-400 dark:text-slate-500"
                      />
                      Language & Region
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm flex items-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#0f172a] hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors">
                      <Palette
                        size={18}
                        className="mr-3 text-slate-400 dark:text-slate-500"
                      />
                      Appearance
                    </button>

                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm flex items-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={18} className="mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[#F8FBFF] dark:bg-slate-900 p-8 transition-colors print:p-0 print:overflow-visible print:bg-white print:dark:bg-white">
          <Outlet
            context={{
              notifications,
              setNotifications,
              markAllAsRead,
              deleteNotification,
            }}
          />
        </main>
        <div className="print:hidden">
          {user.role === "Patient" && <PatientAssistantFAB />}
          {user.role === "Patient" && <AppointmentReminderModal />}
          {user.role === "Patient" && <FeedbackModal />}
        </div>
      </div>
    </div>
  );
};
