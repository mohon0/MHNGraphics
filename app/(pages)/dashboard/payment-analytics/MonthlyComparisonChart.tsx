'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

interface MonthlyComparisonChartProps {
  data: ChartData;
}

export default function MonthlyComparisonChart({
  data,
}: MonthlyComparisonChartProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    payments: data.datasets[0].data[index],
    refunds: data.datasets[1].data[index],
  }));

  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='name'
            tick={{ fontSize: 12 }}
            interval={'preserveStartEnd'}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `৳${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value: number) => [`৳${value.toLocaleString()}`, '']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <Legend />
          <Bar
            dataKey='payments'
            name='Payments'
            fill='#4CAF50'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='refunds'
            name='Refunds'
            fill='#F44336'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
