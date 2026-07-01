import React, { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Activity,
  BedDouble,
  AlertCircle,
  Building,
  Building2,
  DollarSign,
  Signal,
  Server,
  Database,
  Stethoscope,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { useRBAC } from "../hooks/useRBAC";

export const AdminDashboard = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("cerulean_user") || "{}"),
  );
  const { hasPermission } = useRBAC();
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/admin/patients?search=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

  const patientVolumeData = [
    { name: "Mon", patients: 120 },
    { name: "Tue", patients: 150 },
    { name: "Wed", patients: 180 },
    { name: "Thu", patients: 140 },
    { name: "Fri", patients: 200 },
    { name: "Sat", patients: 170 },
    { name: "Sun", patients: 90 },
  ];

  const departmentData = [
    { name: "Cardiology", efficiency: 92, target: 90 },
    { name: "Neurology", efficiency: 88, target: 90 },
    { name: "Orthopedics", efficiency: 95, target: 90 },
    { name: "Pediatrics", efficiency: 85, target: 90 },
    { name: "Emergency", efficiency: 98, target: 90 },
  ];

  const staffActivityData = [
    { name: "Active", value: 342, color: "#10b981" }, // emerald-500
    { name: "On Leave", value: 45, color: "#f59e0b" }, // amber-500
    { name: "Offline", value: 28, color: "#64748b" },  // slate-500
  ];

  if (!stats) return <LoadingSkeleton type="dashboard" />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-7xl mx-auto pb-12"
    >
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-[#0F6CBD] to-[#1976D2] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Aarokkiyam 360 Ecosystem</h1>
          <p className="text-blue-100 max-w-3xl text-lg opacity-90">
            Welcome to the Super Admin Control Center. You are currently
            monitoring {stats.totalHospitals || 0} hospitals,{" "}
            {stats.totalBranches || 0} branches, and {stats.activeUsers || 0}{" "}
            active users across the network.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block mix-blend-overlay">
          <Building size={120} strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
      >
        <form onSubmit={handleSearch} className="flex gap-4 items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10"
              placeholder="Search patients by name or ID globally..."
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#0F6CBD] hover:bg-[#1565C0] text-white font-medium rounded-xl shadow-sm transition-colors"
          >
            Search
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex justify-between items-end"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Global Infrastructure
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time analytics across all hospital branches and server
            environments.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        <StatCard
          icon={<Building className="h-6 w-6 text-indigo-500" />}
          title="Total Hospitals"
          value={stats.totalHospitals || 12}
        />
        <StatCard
          icon={<Building2 className="h-6 w-6 text-indigo-500" />}
          title="Total Branches"
          value={stats.totalBranches || 45}
        />
        <StatCard
          icon={<Stethoscope className="h-6 w-6 text-emerald-500" />}
          title="Total Doctors"
          value={stats.totalDoctors}
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-blue-500" />}
          title="Total Patients"
          value={stats.totalPatients}
        />
        <StatCard
          icon={<Activity className="h-6 w-6 text-orange-500" />}
          title="Today's Appointments"
          value={stats.activeAppointments}
        />

        {hasPermission("view_revenue") && (
        <StatCard
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          title="Revenue Analytics"
          value={stats.revenue || "$4.2M"}
        />
        )}
        {hasPermission("view_staff_activity") && (
        <>
          <StatCard
            icon={<UserPlus className="h-6 w-6 text-purple-500" />}
            title="Active Users"
            value={stats.activeUsers || 1285}
          />
          <StatCard
            icon={<Signal className="h-6 w-6 text-sky-500" />}
            title="Online Doctors"
            value={stats.onlineDoctors || 342}
          />
        </>
        )}
        {hasPermission("view_system_alerts") && (
        <>
          <StatCard
            icon={
              <Server className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            }
            title="Server Health"
            value={stats.serverHealth || "99.9%"}
          />
          <StatCard
            icon={
              <Database className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            }
            title="Database Health"
            value={stats.databaseHealth || "Optimal"}
          />
        </>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {hasPermission("view_patient_volume") && (
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white dark:bg-slate-800/80 backdrop-blur-xl shadow-lg rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 transition-colors"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Daily Patient Volume
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={patientVolumeData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorPatients"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  strokeOpacity={0.2}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  cursor={{
                    stroke: "#94a3b8",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="#0F6CBD"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorPatients)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        )}

        {hasPermission("view_staff_activity") && (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-800/80 backdrop-blur-xl shadow-lg rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 transition-colors flex flex-col"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Staff Activity
          </h3>
          <div className="h-80 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={staffActivityData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {staffActivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        )}

        {hasPermission("view_department_efficiency") && (
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white dark:bg-slate-800/80 backdrop-blur-xl shadow-lg rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 transition-colors"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Department Efficiency
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '20px' }} />
                <Bar dataKey="efficiency" fill="#0F6CBD" radius={[4, 4, 0, 0]} name="Efficiency %" />
                <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Target %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        )}
        
        {hasPermission("view_system_alerts") && (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-800/80 backdrop-blur-xl shadow-lg rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 transition-colors flex flex-col"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            System Alerts
          </h3>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <AlertItem
              title="High CPU Usage"
              desc="Node-3 server reaching 88% capacity"
              time="10 mins ago"
              type="warning"
            />
            <AlertItem
              title="Database Backup"
              desc="Automated snapshot completed successfully"
              time="1 hour ago"
              type="success"
            />
            <AlertItem
              title="Failed Login Attempts"
              desc="Multiple failures from IP 192.168.1.14"
              time="2 hours ago"
              type="error"
            />
            <AlertItem
              title="New Hospital Added"
              desc="City Care Branch onboarding complete"
              time="5 hours ago"
              type="info"
            />
            <AlertItem
              title="License Expiring"
              desc="Analytics module license expires in 3 days"
              time="1 day ago"
              type="warning"
            />
          </div>
        </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) => (
  <div className="bg-white dark:bg-slate-800/80 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-xl rounded-2xl border border-slate-100 dark:border-slate-700/50 transition-all hover:-translate-y-1">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl">
          {icon}
        </div>
        <div className="ml-4 w-0 flex-1">
          <dl>
            <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              {title}
            </dt>
            <dd className="flex items-baseline mt-1">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const AlertItem = ({
  title,
  desc,
  time,
  type,
}: {
  title: string;
  desc: string;
  time: string;
  type: "warning" | "success" | "error" | "info";
}) => {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <Activity className="h-5 w-5 text-emerald-500" />;
      case "info":
        return <Signal className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {desc}
        </p>
      </div>
      <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
        {time}
      </span>
    </div>
  );
};
