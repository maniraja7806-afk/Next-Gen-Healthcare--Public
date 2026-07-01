import React, { useState } from "react";
import {
  Activity,
  Heart,
  Flame,
  Footprints,
  RefreshCcw,
  Watch,
} from "lucide-react";
import toast from "react-hot-toast";

export const WearableMetrics = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [metrics, setMetrics] = useState<{
    heartRate?: number;
    steps?: number;
    calories?: number;
    activeMinutes?: number;
    lastSynced?: Date;
  } | null>(null);

  const handleSync = () => {
    setIsSyncing(true);
    // Mock the sync delay
    setTimeout(() => {
      setMetrics({
        heartRate: 72,
        steps: 8432,
        calories: 1420,
        activeMinutes: 45,
        lastSynced: new Date(),
      });
      setIsSyncing(false);
      toast.success("Successfully synced with wearable device");
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <Watch className="mr-2 text-[#0284c7]" size={24} />
          Wearable Metrics
        </h2>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center text-sm font-medium bg-[#0284c7] text-white px-4 py-2 rounded-lg hover:bg-[#0369a1] disabled:opacity-70 transition-colors"
        >
          <RefreshCcw
            size={16}
            className={`mr-2 ${isSyncing ? "animate-spin" : ""}`}
          />
          {isSyncing ? "Syncing..." : "Sync Device"}
        </button>
      </div>

      {!metrics ? (
        <div className="text-center py-12 px-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
          <Watch className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            No data synced yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Connect your HealthKit or Google Fit compatible device to import
            your daily activity metrics.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4 border border-rose-100 dark:border-rose-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-rose-100 dark:bg-rose-900/50 p-2 rounded-full text-rose-600 dark:text-rose-400">
                <Heart size={20} />
              </div>
              <span className="font-medium text-rose-900 dark:text-rose-100">
                Heart Rate
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-rose-700 dark:text-rose-300">
                {metrics.heartRate}
              </span>
              <span className="text-sm font-medium text-rose-600/70 dark:text-rose-400/70">
                bpm
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full text-emerald-600 dark:text-emerald-400">
                <Footprints size={20} />
              </div>
              <span className="font-medium text-emerald-900 dark:text-emerald-100">
                Steps
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {metrics.steps?.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-emerald-600/70 dark:text-emerald-400/70">
                steps
              </span>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full text-amber-600 dark:text-amber-400">
                <Flame size={20} />
              </div>
              <span className="font-medium text-amber-900 dark:text-amber-100">
                Calories
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {metrics.calories?.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-amber-600/70 dark:text-amber-400/70">
                kcal
              </span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400">
                <Activity size={20} />
              </div>
              <span className="font-medium text-blue-900 dark:text-blue-100">
                Activity
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {metrics.activeMinutes}
              </span>
              <span className="text-sm font-medium text-blue-600/70 dark:text-blue-400/70">
                min
              </span>
            </div>
          </div>
        </div>
      )}

      {metrics?.lastSynced && (
        <p className="text-xs text-slate-500 mt-4 text-right">
          Last synced: {metrics.lastSynced.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};
