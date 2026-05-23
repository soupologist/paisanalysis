import { getTransactions } from "@/lib/sheets";
import { getTotalExpenses, getTotalIncome } from "@/lib/analytics";

import { getMonthlyTotals, getCategoryBreakdown } from "@/lib/analytics";

import { MonthlyChart } from "@/components/charts/monthly-chart";
import { CategoryChart } from "@/components/charts/category-chart";

export default async function HomePage() {
  const transactions = await getTransactions();

  const expenses = getTotalExpenses(transactions);
  const income = getTotalIncome(transactions);

  const monthlyData = getMonthlyTotals(transactions);

  const categoryData = getCategoryBreakdown(transactions);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">paisa analysis</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-white/50">Total Expenses</p>

          <h2 className="text-3xl mt-2">₹{expenses.toLocaleString()}</h2>
        </div>

        <div className="border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-white/50">Total Income</p>

          <h2 className="text-3xl mt-2">₹{income.toLocaleString()}</h2>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl mb-6">Monthly Flow</h2>

          <MonthlyChart data={monthlyData} />
        </div>

        <div className="border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl mb-6">Category Breakdown</h2>

          <CategoryChart data={categoryData} />
        </div>
      </div>
    </main>
  );
}
