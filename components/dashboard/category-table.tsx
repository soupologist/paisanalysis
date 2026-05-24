import { formatCurrency } from "@/lib/format";

type CategoryData = {
  category: string;
  amount: number;
};

export function CategoryTable({ data }: { data: CategoryData[] }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 bg-white/5">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Category</th>

            <th className="px-4 py-3 text-right font-medium">Amount</th>

            <th className="px-4 py-3 text-right font-medium">%</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            const percentage = (item.amount / total) * 100;

            return (
              <tr key={item.category} className="border-b border-white/5">
                <td className="px-4 py-3">{item.category}</td>

                <td className="px-4 py-3 text-right">
                  {formatCurrency(item.amount)}
                </td>

                <td className="px-4 py-3 text-right text-white/60">
                  {percentage.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
