"use client";

import { ChartConfig, ChartContainer } from "@/app/_components/ui/chart";
import { DayTotalRevenue } from "@/app/_data-access/dashboard/get-dashboard";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";

const chartConfig = {
  totalRevenue: {
    label: "Receitas",
    color: "#b124e9",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <ChartContainer
        config={chartConfig}
        className="h-full min-h-[200px] w-full flex-1 sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]"
      >
        <BarChart
          accessibilityLayer
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 60,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#666" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid #b124e9",
              borderRadius: "4px",
              padding: "8px",
            }}
            labelStyle={{ color: "#fff" }}
            formatter={(value) => [
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(value as number),
              "Receita",
            ]}
          />
          <Bar
            dataKey="totalRevenue"
            fill="#b124e9"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default RevenueChart;
