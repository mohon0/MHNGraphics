'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
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

interface CumulativeRevenueChartProps {
  data: ChartData;
}

export default function CumulativeRevenueChart({
  data,
}: CumulativeRevenueChartProps) {
  // Calculate cumulative data
  const chartData = data.labels.map((label, index) => {
    const payments = data.datasets[0].data[index];
    const refunds = data.datasets[1].data[index];
    const cumulative = data.datasets[0].data
      .slice(0, index + 1)
      .reduce((sum, curr) => sum + curr, 0);

    return {
      name: label,
      revenue: payments - refunds,
      cumulative,
    };
  });

  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
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
          <Area
            type='monotone'
            dataKey='cumulative'
            name='Cumulative Revenue'
            stroke='#2196F3'
            fill='#BBDEFB'
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
