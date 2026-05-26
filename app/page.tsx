import { getTransactions } from "@/lib/sheets";

import {
  getTotalExpenses,
  getTotalIncome,
  getMonthlyTotals,
  getCategoryBreakdown,
} from "@/lib/analytics";

import { formatCurrency } from "@/lib/format";

import { MonthlyChart } from "@/components/charts/monthly-chart";
import { CategoryChart } from "@/components/charts/category-chart";

export default async function HomePage() {
  const transactions = await getTransactions();

  const expenses = getTotalExpenses(transactions);
  const income = getTotalIncome(transactions);

  const monthlyData = getMonthlyTotals(transactions);

  const categoryData = getCategoryBreakdown(transactions);

  const topCategory = categoryData[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-8 lg:px-10 lg:py-10">
      {/* HEADER */}

      <header className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.28em]
              text-[#8BFF6A]/70
              mb-4
            "
          >
            personal finance telemetry
          </p>

          <h1
            className="
              font-chakra
              text-6xl
              leading-none
              tracking-tight
              uppercase
              text-[#8BFF6A]
              lg:text-8xl
            "
          >
            paisanalysis
          </h1>
        </div>

        <div className="text-left lg:text-right">
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.22em]
              text-white/35
            "
          >
            current period
          </p>

          <p className="mt-2 font-chakra text-2xl uppercase">May 2026</p>
        </div>
      </header>

      {/* DIVIDER */}

      <div className="mt-10 h-px bg-[var(--line)]" />

      {/* TOTALS */}

      <section className="mt-16 grid gap-16 lg:grid-cols-2">
        <div>
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.22em]
              text-white/40
              mb-4
            "
          >
            total expenses
          </p>

          <h2
            className="
              font-chakra
              text-6xl
              leading-none
              tracking-tight
              text-[#8BFF6A]
              lg:text-8xl
            "
          >
            {formatCurrency(expenses)}
          </h2>
        </div>

        <div>
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.22em]
              text-white/40
              mb-4
            "
          >
            total income
          </p>

          <h2
            className="
              font-chakra
              text-5xl
              leading-none
              tracking-tight
              text-white
              lg:text-7xl
            "
          >
            {formatCurrency(income)}
          </h2>
        </div>
      </section>

      {/* MONTHLY FLOW */}

      <section className="mt-28">
        <div className="mb-10 flex items-end justify-between border-b border-[var(--line)] pb-5">
          <div>
            <p
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-[#8BFF6A]/60
                mb-3
              "
            >
              financial telemetry
            </p>

            <h2
              className="
                font-chakra
                text-5xl
                uppercase
                tracking-tight
                leading-none
              "
            >
              Monthly Flow
            </h2>
          </div>

          <div className="text-right">
            <p
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.2em]
                text-white/35
              "
            >
              last 12 months
            </p>

            <div className="mt-3 h-[2px] w-24 bg-[#8BFF6A]" />
          </div>
        </div>

        <MonthlyChart data={monthlyData} />
      </section>

      {/* CATEGORY BREAKDOWN */}

      <section className="mt-32 grid gap-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-10">
            <p
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-[#8BFF6A]/60
                mb-3
              "
            >
              expense distribution
            </p>

            <h2
              className="
                font-chakra
                text-5xl
                uppercase
                tracking-tight
                leading-none
              "
            >
              Categories
            </h2>
          </div>

          <CategoryChart data={categoryData.slice(0, 8)} />
        </div>

        {/* TOP SPEND */}

        <div className="border-l border-[var(--line)] pl-8 lg:pl-12">
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-[#8BFF6A]/60
              mb-5
            "
          >
            dominant expense
          </p>

          <h2
            className="
              font-chakra
              text-5xl
              uppercase
              tracking-tight
              leading-none
            "
          >
            {topCategory?.category}
          </h2>

          <p
            className="
              mt-8
              font-chakra
              text-6xl
              leading-none
              tracking-tight
              text-[#8BFF6A]
            "
          >
            {formatCurrency(topCategory?.amount || 0)}
          </p>

          <div className="mt-10 h-px bg-[var(--line)]" />

          <div className="mt-10 space-y-6">
            {categoryData.slice(0, 5).map((item, index) => (
              <div
                key={item.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <p
                    className="
                      font-mono
                      text-[11px]
                      text-white/30
                    "
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </p>

                  <p
                    className="
                      font-mono
                      text-xs
                      uppercase
                      tracking-[0.16em]
                      text-white/65
                    "
                  >
                    {item.category}
                  </p>
                </div>

                <p className="font-chakra text-xl tracking-tight">
                  {formatCurrency(item.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
