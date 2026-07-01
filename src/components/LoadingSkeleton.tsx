import React from 'react';
import { motion } from 'framer-motion';

type SkeletonType = 'dashboard' | 'list' | 'card' | 'table';

interface LoadingSkeletonProps {
  type?: SkeletonType;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', count = 1 }) => {
  const renderDashboardSkeleton = () => (
    <div className="space-y-6 max-w-7xl mx-auto w-full animate-pulse">
      {/* Header Banner */}
      <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl h-48 w-full"></div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800/80 rounded-2xl h-24 border border-slate-100 dark:border-slate-700/50"></div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/80 rounded-2xl h-96 border border-slate-100 dark:border-slate-700/50"></div>
        <div className="bg-white dark:bg-slate-800/80 rounded-2xl h-96 border border-slate-100 dark:border-slate-700/50"></div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-4 w-full animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-24 w-full"></div>
      ))}
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-48 w-full flex flex-col justify-between p-5">
          <div className="flex space-x-4">
             <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
             <div className="space-y-2 flex-1">
               <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
               <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
             </div>
          </div>
          <div className="space-y-2 mt-4">
             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );

  switch (type) {
    case 'dashboard':
      return renderDashboardSkeleton();
    case 'list':
      return renderListSkeleton();
    case 'card':
      return renderCardSkeleton();
    default:
      return renderCardSkeleton();
  }
};
