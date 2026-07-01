import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Activity } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const mockData = [
  { date: "Jan", height: 1.75, weight: 78, bmi: 25.5 },
  { date: "Feb", height: 1.75, weight: 77.5, bmi: 25.3 },
  { date: "Mar", height: 1.75, weight: 76.5, bmi: 25.0 },
  { date: "Apr", height: 1.75, weight: 76, bmi: 24.8 },
  { date: "May", height: 1.75, weight: 75.5, bmi: 24.7 },
  { date: "Jun", height: 1.75, weight: 75, bmi: 24.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-slate-900 dark:text-white mb-2">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {entry.value}
            </span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
          <p className="text-xs text-slate-500">
            Weight: {payload[0].payload.weight} kg
          </p>
          <p className="text-xs text-slate-500">
            Height: {payload[0].payload.height} m
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const BMITrendChart = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <Activity className="mr-2 text-[#0284c7]" size={24} />
          BMI Monitoring Trend
        </h2>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Current BMI:{" "}
          <span className="font-semibold text-emerald-600">24.5 (Normal)</span>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
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
              domain={["dataMin - 1", "dataMax + 1"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              name="BMI"
              type="monotone"
              dataKey="bmi"
              stroke="#0284c7"
              strokeWidth={3}
              dot={{ r: 4, fill: "#0284c7", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
