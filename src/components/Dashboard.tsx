import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { HeartPulse, BedDouble, CircleAlert, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics/dashboard')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(console.error);
  }, []);

  if (!data) {
    return <div className="p-8 text-slate-500 animate-pulse">Loading analytics...</div>;
  }

  const kpis = [
    { label: 'Bed Occupancy', value: `${data.bedOccupancy}%`, icon: BedDouble, sub: 'Target: < 85%' },
    { label: 'Avg Wait Time', value: '14 min', icon: Clock, sub: '-2 mins vs last week' },
    { label: 'Patient Satisfaction', value: data.patientSatisfaction, icon: HeartPulse, sub: 'Top 5% nationally' },
    { label: 'Active Alerts', value: data.activeAlerts, icon: CircleAlert, sub: 'Requires attention', alert: true },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Real-Time Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Live overview of hospital operations and population health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={kpi.label} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl border ${kpi.alert ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'} shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${kpi.alert ? 'bg-red-100 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className={`text-4xl font-semibold ${kpi.alert ? 'text-red-700' : 'text-slate-800'}`}>{kpi.value}</h3>
              <p className="text-sm font-medium text-slate-600 mt-1">{kpi.label}</p>
              <p className={`text-xs mt-2 ${kpi.alert ? 'text-red-500 font-medium' : 'text-slate-400'}`}>{kpi.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-medium text-slate-800 mb-6 flex items-center">
           Outpatient Flow (Today)
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trends || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
