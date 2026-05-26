"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function formatMoney(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function MonthlyChart({
  data,
}: {
  data: {
    month: string;
    expenses: number;
    income: number;
  }[];
}) {
  return (
    <div className="w-full h-[520px] border border-[var(--line)] bg-[#050505] p-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="rgba(139,255,106,0.08)"
            vertical={true}
            horizontal={true}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={{
              stroke: "rgba(139,255,106,0.15)",
            }}
            tick={{
              fill: "rgba(255,255,255,0.45)",
              fontSize: 11,
              fontFamily: "var(--font-geist-mono)",
            }}
          />

          <YAxis
            tickFormatter={(value) => `₹${value / 1000}k`}
            tickLine={false}
            axisLine={{
              stroke: "rgba(139,255,106,0.15)",
            }}
            tick={{
              fill: "rgba(255,255,255,0.45)",
              fontSize: 11,
              fontFamily: "var(--font-geist-mono)",
            }}
          />

          <Tooltip
            cursor={{
              stroke: "#8BFF6A",
              strokeOpacity: 0.2,
              strokeWidth: 1,
            }}
            contentStyle={{
              background: "#050505",
              border: "1px solid rgba(139,255,106,0.15)",
              borderRadius: "0px",
              padding: "14px",
              boxShadow: "0 0 30px rgba(139,255,106,0.08)",
            }}
            labelStyle={{
              color: "#8BFF6A",
              fontFamily: "var(--font-chakra)",
              fontSize: 18,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              marginBottom: "10px",
            }}
            itemStyle={{
              color: "#ffffff",
              fontFamily: "var(--font-chakra)",
              fontSize: 14,
            }}
            formatter={(value: number, name: string) => [
              formatMoney(value),
              name.toUpperCase(),
            ]}
          />

          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#8BFF6A"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: "#8BFF6A",
              stroke: "#050505",
              strokeWidth: 2,
            }}
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 5,
              fill: "#ffffff",
              stroke: "#050505",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
