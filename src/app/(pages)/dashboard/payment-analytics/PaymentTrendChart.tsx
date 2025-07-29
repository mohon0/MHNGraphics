'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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

interface PaymentTrendChartProps {
  data: ChartData;
}

export default function PaymentTrendChart({ data }: PaymentTrendChartProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    payments: data.datasets[0].data[index],
    refunds: data.datasets[1].data[index],
  }));

  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
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
          <Line
            type='monotone'
            dataKey='payments'
            name='Payments'
            stroke='#4CAF50'
            fill='#A5D6A7'
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type='monotone'
            dataKey='refunds'
            name='Refunds'
            stroke='#F44336'
            fill='#FFCDD2'
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
