import Link from "next/link";

import { getTransactions } from "@/lib/sheets";

import { getAvailableMonths } from "@/lib/analytics";

export default async function MonthsPage() {
  const transactions = await getTransactions();

  const months = getAvailableMonths(transactions);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl mb-8">Monthly Analytics</h1>

      <div className="grid gap-4">
        {months.map((month) => (
          <Link
            key={month}
            href={`/months/${month}`}
            className="border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition"
          >
            {month}
          </Link>
        ))}
      </div>
    </main>
  );
}
