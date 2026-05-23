export type Transaction = {
  timestamp: string;
  type: "Expense" | "Income";
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  date: string;
  remarks?: string;
  finalDate: string;
  signedAmount: number;
  month: string;
  year: number;
  account: string;
};
