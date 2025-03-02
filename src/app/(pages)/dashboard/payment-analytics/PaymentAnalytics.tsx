"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePaymentAnalytics } from "@/services/admin";
import {
  ArrowDown,
  ArrowUp,
  DollarSignIcon as BangladeshiTakaSign,
} from "lucide-react";
import { useState } from "react";
import CumulativeRevenueChart from "./CumulativeRevenueChart";
import MonthlyComparisonChart from "./MonthlyComparisonChart";
import PaymentMethodChart from "./PaymentMethodChart";
import PaymentSkeleton from "./PaymentSkeleton";
import PaymentTrendChart from "./PaymentTrendChart";

const CHART_TYPES = [
  { value: "trends", label: "Payment Trends" },
  { value: "comparison", label: "Monthly Comparison" },
  { value: "methods", label: "Payment Methods" },
  { value: "cumulative", label: "Cumulative Revenue" },
] as const;

type ChartType = (typeof CHART_TYPES)[number]["value"];

/**
 * PaymentAnalytics Component
 *
 * Enhanced dashboard with multiple charts and insights
 * Now with responsive tabs and mobile optimization
 */
export default function PaymentAnalytics() {
  const { isPending, data, isError } = usePaymentAnalytics();
  const [activeChart, setActiveChart] = useState<ChartType>("trends");

  // Handler for both Select and Tabs value changes
  const handleChartChange = (value: string) => {
    // Type guard to ensure value is a valid ChartType
    if (isValidChartType(value)) {
      setActiveChart(value);
    }
  };

  // Type guard function
  const isValidChartType = (value: string): value is ChartType => {
    return CHART_TYPES.map((type) => type.value).includes(value as ChartType);
  };

  if (isPending) {
    return <PaymentSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-red-500">Error loading payment analytics.</p>
      </div>
    );
  }

  const { summary, chartData } = data;

  return (
    <div className="space-y-8">
      {/* Summary Cards section remains the same */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Payments Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
            <BangladeshiTakaSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                ৳{summary.totalPayments.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-green-500">
                <ArrowUp className="h-4 w-4" />
                <span className="text-xs">12.5%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        {/* Total Refunds Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <BangladeshiTakaSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                ৳{summary.totalRefunds.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <ArrowDown className="h-4 w-4" />
                <span className="text-xs">0.8%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              -0.3% from last month
            </p>
          </CardContent>
        </Card>

        {/* Net Amount Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
            <BangladeshiTakaSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                ৳{summary.netAmount.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-blue-500">
                <ArrowUp className="h-4 w-4" />
                <span className="text-xs">10.2%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              +1.8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Responsive Charts Section */}
      <div className="space-y-4">
        {/* Mobile Select Dropdown */}
        <div className="md:hidden">
          <Select value={activeChart} onValueChange={handleChartChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              {CHART_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Tabs */}
        <Tabs
          value={activeChart}
          onValueChange={handleChartChange}
          className="hidden space-y-4 md:block"
        >
          <div className="relative">
            <div className="absolute inset-0 left-0 right-0 h-[2px] bg-muted" />
            <TabsList className="relative w-full justify-start rounded-none border-b bg-transparent p-0">
              {CHART_TYPES.map((type) => (
                <TabsTrigger key={type.value} value={type.value}>
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        {/* Chart Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {CHART_TYPES.find((type) => type.value === activeChart)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeChart === "trends" && <PaymentTrendChart data={chartData} />}
            {activeChart === "comparison" && (
              <MonthlyComparisonChart data={chartData} />
            )}
            {activeChart === "methods" && <PaymentMethodChart />}
            {activeChart === "cumulative" && (
              <CumulativeRevenueChart data={chartData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
