"use client";

import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFE66D",
  "#5DA9E9",
  "#C77DFF",
  "#F4A261",
  "#2A9D8F",
  "#E76F51",
  "#90BE6D",
  "#577590",
];

export function CategoryChart({
  data,
}: {
  data: {
    category: string;
    amount: number;
  }[];
}) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={140}
            label={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number) => [
              `₹${value.toLocaleString()}`,
              "Spent",
            ]}
            labelFormatter={(label) => label}
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
