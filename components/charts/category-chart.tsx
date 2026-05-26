"use client";

import { formatCurrency } from "@/lib/format";

export function CategoryChart({
  data,
}: {
  data: {
    category: string;
    amount: number;
  }[];
}) {
  const max = Math.max(...data.map((d) => d.amount));

  return (
    <div className="space-y-5">
      {data.map((item) => {
        const width = (item.amount / max) * 100;

        return (
          <div key={item.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <p
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-white/50
                "
              >
                {item.category}
              </p>

              <p className="font-chakra text-sm text-[#8BFF6A]">
                {formatCurrency(item.amount)}
              </p>
            </div>

            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-[#8BFF6A]"
                style={{
                  width: `${width}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
