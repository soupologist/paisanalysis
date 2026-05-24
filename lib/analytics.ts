import { Transaction } from "./types";

export function getTotalExpenses(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.signedAmount < 0)
    .reduce((sum, t) => sum + Math.abs(t.signedAmount), 0);
}

export function getTotalIncome(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.signedAmount > 0)
    .reduce((sum, t) => sum + t.signedAmount, 0);
}

export function getMonthlyTotals(transactions: Transaction[]) {
  const grouped: Record<
    string,
    { month: string; expenses: number; income: number }
  > = {};

  for (const tx of transactions) {
    const key = `${tx.month} ${tx.year}`;

    if (!grouped[key]) {
      grouped[key] = {
        month: key,
        expenses: 0,
        income: 0,
      };
    }

    if (tx.signedAmount < 0) {
      grouped[key].expenses += Math.abs(tx.signedAmount);
    } else {
      grouped[key].income += tx.signedAmount;
    }
  }

  return Object.values(grouped);
}

export function getCategoryBreakdown(transactions: Transaction[]) {
  const grouped: Record<string, number> = {};

  for (const tx of transactions) {
    if (tx.signedAmount >= 0) continue;

    if (!grouped[tx.category]) {
      grouped[tx.category] = 0;
    }

    grouped[tx.category] += Math.abs(tx.signedAmount);
  }

  return Object.entries(grouped)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getAvailableMonths(transactions: Transaction[]) {
  const months = new Set<string>();

  transactions.forEach((tx) => {
    const date = new Date(tx.finalDate);

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}`;

    months.add(key);
  });

  return Array.from(months).sort().reverse();
}

export function filterTransactionsByMonth(
  transactions: Transaction[],
  month: string,
) {
  return transactions.filter((tx) => {
    const date = new Date(tx.finalDate);

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}`;

    return key === month;
  });
}
