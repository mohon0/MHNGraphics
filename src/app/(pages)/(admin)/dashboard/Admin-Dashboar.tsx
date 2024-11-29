"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, DollarSign, ShoppingCart, Users } from "lucide-react";
import React from "react";
import {
  Bar,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export interface QuickStat {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  timestamp: string;
}

interface SalesData {
  name: string;
  total: number;
}

interface RevenueData {
  name: string;
  revenue: number;
}

interface UserDemographicData {
  name: string;
  value: number;
}

interface ProductPerformanceData {
  category: string;
  A: number;
  B: number;
  fullMark: number;
}

const quickStats: QuickStat[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Subscriptions",
    value: "+2350",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Sales",
    value: "+12,234",
    icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Active Now",
    value: "+573",
    icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: 1,
    user: "John Doe",
    action: "Created a new post",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Uploaded a new product",
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    user: "Bob Johnson",
    action: "Updated their profile",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    user: "Alice Brown",
    action: "Completed a purchase",
    timestamp: "2 days ago",
  },
  {
    id: 5,
    user: "Charlie Wilson",
    action: "Left a product review",
    timestamp: "3 days ago",
  },
];

const salesData: SalesData[] = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 3200 },
];

const revenueData: RevenueData[] = [
  { name: "Jan", revenue: 10000 },
  { name: "Feb", revenue: 12000 },
  { name: "Mar", revenue: 11000 },
  { name: "Apr", revenue: 15000 },
  { name: "May", revenue: 18000 },
  { name: "Jun", revenue: 20000 },
];

const userDemographicData: UserDemographicData[] = [
  { name: "18-24", value: 400 },
  { name: "25-34", value: 300 },
  { name: "35-44", value: 300 },
  { name: "45-54", value: 200 },
  { name: "55+", value: 100 },
];

const productPerformanceData: ProductPerformanceData[] = [
  { category: "Sales", A: 120, B: 110, fullMark: 150 },
  { category: "Customer Satisfaction", A: 98, B: 130, fullMark: 150 },
  { category: "Market Share", A: 86, B: 130, fullMark: 150 },
  { category: "Growth Rate", A: 99, B: 100, fullMark: 150 },
  { category: "Profitability", A: 85, B: 90, fullMark: 150 },
  { category: "Innovation", A: 65, B: 85, fullMark: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    total: {
                      label: "Total Sales",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={salesData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="total" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    demographic: {
                      label: "Age Group",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userDemographicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userDemographicData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    performance: {
                      label: "Performance Metrics",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={productPerformanceData}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} />
                      <Radar
                        name="Product A"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Product B"
                        dataKey="B"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                      <Legend />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentActivity.map((item) => (
                    <div className="flex items-center" key={item.id}>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{item.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.action}
                        </p>
                      </div>
                      <div className="ml-auto text-sm font-medium text-muted-foreground">
                        {item.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
