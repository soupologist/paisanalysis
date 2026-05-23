import Papa from "papaparse";
import { Transaction } from "./types";

const SHEET_URL = process.env.GOOGLE_SHEET_CSV!;

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(SHEET_URL, {
    cache: "no-store",
  });

  const csv = await res.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data.map((row: any) => ({
    timestamp: row["Timestamp"],
    type: row["Expense / Income"],
    category: row["Expense Category"],
    description: row["Description"],
    amount: Number(row["Amount (in ₹)"]),
    paymentMethod: row["Payment Method"],
    date: row["Date"],
    remarks: row["Remarks"],
    finalDate: row["Final Date"],
    signedAmount: Number(row["Signed Amount"]),
    month: row["Month"],
    year: Number(row["Year"]),
    account: row["Account"],
  }));
}
