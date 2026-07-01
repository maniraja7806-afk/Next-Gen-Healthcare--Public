import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, Heart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export const HistoricalVitalsChart = () => {
  const { t } = useLanguage();
  const [metric, setMetric] = useState<"bp" | "hr">("bp");

  // Mock historical data
  const data = React.useMemo(() => {
    const generateData = () => {
      const result = [];
      const now = new Date();
      let systolic = 120;
      let diastolic = 80;
      let hr = 72;

      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);

        // Random walk
        systolic += Math.floor(Math.random() * 10) - 4;
        diastolic += Math.floor(Math.random() * 6) - 2;
        hr += Math.floor(Math.random() * 8) - 4;

        result.push({
          date: date.toLocaleDateString("en-US", { month: "short" }),
          systolic,
          diastolic,
          hr,
        });
      }
      return result;
    };
    return generateData();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <Activity className="mr-2 text-[#0284c7]" size={24} />
          {t("dashboard.recent_vitals")}
        </h2>
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
          <button
            onClick={() => setMetric("bp")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              metric === "bp"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t("dashboard.blood_pressure")}
          </button>
          <button
            onClick={() => setMetric("hr")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              metric === "hr"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t("dashboard.heart_rate")}
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px", fontSize: "12px" }} />

            {metric === "bp" ? (
              <>
                <Line
                  type="monotone"
                  dataKey="systolic"
                  name="Systolic (mmHg)"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolic (mmHg)"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#0ea5e9", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey="hr"
                name="Heart Rate (BPM)"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        <p>
          This chart provides a 12-month historical view of your vitals. Doctors
          can use these trends to monitor the effectiveness of treatments and
          track overall cardiovascular health.
        </p>
      </div>
    </div>
  );
};
