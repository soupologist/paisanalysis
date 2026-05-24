import { notFound } from "next/navigation";

import { getTransactions } from "@/lib/sheets";

import {
  filterTransactionsByMonth,
  getCategoryBreakdown,
  getTotalExpenses,
  getTotalIncome,
} from "@/lib/analytics";

import { CategoryChart } from "@/components/charts/category-chart";

import { CategoryTable } from "@/components/dashboard/category-table";

export default async function MonthPage({
  params,
}: {
  params: Promise<{
    month: string;
  }>;
}) {
  const { month } = await params;

  const transactions = await getTransactions();

  const filtered = filterTransactionsByMonth(transactions, month);

  if (!filtered.length) {
    notFound();
  }

  const expenses = getTotalExpenses(filtered);

  const income = getTotalIncome(filtered);

  const categories = getCategoryBreakdown(filtered);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl mb-12">{month}</h1>

      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-white/50">Income</p>

          <h2 className="text-3xl mt-2">₹{income.toLocaleString()}</h2>
        </div>

        <div className="border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-white/50">Expenses</p>

          <h2 className="text-3xl mt-2">₹{expenses.toLocaleString()}</h2>
        </div>

        <div className="border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-white/50">Net</p>

          <h2 className="text-3xl mt-2">
            ₹{(income - expenses).toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl mb-6">Category Breakdown</h2>

          <CategoryChart data={categories} />
        </div>

        <div className="border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl mb-6">Spending Breakdown</h2>

          <CategoryTable data={categories} />
        </div>
      </div>
    </main>
  );
}
