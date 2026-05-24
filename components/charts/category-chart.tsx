"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  amount: {
    label: "Amount",
  },
};

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function CategoryChart({
  data,
}: {
  data: {
    category: string;
    amount: number;
  }[];
}) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full h-100">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
          <Pie data={chartData} dataKey="amount" nameKey="category" />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
