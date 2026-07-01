import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface VitalsChartProps {
  patientId: string;
}

export const VitalsChart: React.FC<VitalsChartProps> = ({ patientId }) => {
  // Generate some mock historical data based on the patientId
  // In a real app, this would be fetched from the API
  const data = React.useMemo(() => {
    const generateData = () => {
      const result = [];
      const now = new Date();
      let systolic = 120;
      let diastolic = 80;
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);
        
        // Random walk for BP
        systolic += Math.floor(Math.random() * 10) - 5;
        diastolic += Math.floor(Math.random() * 6) - 3;
        
        result.push({
          date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          systolic,
          diastolic
        });
      }
      return result;
    };
    return generateData();
  }, [patientId]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
          <Line 
            type="monotone" 
            dataKey="systolic" 
            name="Systolic (mmHg)"
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="diastolic" 
            name="Diastolic (mmHg)"
            stroke="#0ea5e9" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
