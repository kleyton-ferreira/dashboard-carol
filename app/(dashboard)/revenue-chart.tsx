"use client";

import { ChartConfig, ChartContainer } from "@/app/_components/ui/chart";
import { DayTotalRevenue } from "@/app/_data-access/dashboard/get-dashboard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const chartConfig = {
  totalRevenue: {
    label: "",
    color: "#b124e9",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <ChartContainer
        config={chartConfig}
        className="h-full min-h-[410px] w-full flex-1 md:min-h-[350px] lg:min-h-[474px]"
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: -8, left: -9, bottom: 60 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b124e9" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#b124e9" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
            tickFormatter={(value) =>
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              }).format(value)
            }
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(154, 43, 177, 0.95)",
              border: "1px solid #b124e9",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff", fontSize: "12px" }}
            formatter={(value) => [
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(value as number),
              "Faturamentos",
            ]}
            cursor={{ fill: "rgba(251, 249, 252, 0.1)" }}
          />

          <Bar
            dataKey="totalRevenue"
            fill="url(#colorRevenue)"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default RevenueChart;
