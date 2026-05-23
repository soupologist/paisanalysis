"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
    <div className="h-100 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeOpacity={0.1} />

          <XAxis dataKey="month" />

          <Tooltip />

          <Line type="monotone" dataKey="expenses" strokeWidth={2} />

          <Line type="monotone" dataKey="income" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
