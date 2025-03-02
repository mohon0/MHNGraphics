"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PAYMENT_METHODS_DATA = [
  { name: "bKash", value: 45, color: "#E2136E" },
  { name: "Nagad", value: 30, color: "#F9772B" },
  { name: "Rocket", value: 15, color: "#8C3494" },
  { name: "Card", value: 10, color: "#4CAF50" },
];

export default function PaymentMethodChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={PAYMENT_METHODS_DATA}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={PAYMENT_METHODS_DATA[index].color}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${PAYMENT_METHODS_DATA[index].name} (${value}%)`}
                </text>
              );
            }}
          >
            {PAYMENT_METHODS_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Percentage"]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
