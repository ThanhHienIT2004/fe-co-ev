"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ConflictStatsChart() {
  const [monthlyData, setMonthlyData] = useState<{ month: string; value: number }[]>([]);
  const [total, setTotal] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const year = new Date().getFullYear();

        // Monthly
        const resMonth = await fetch(`http://localhost:8085/booking/conflict-log/stats/by-month?year=${year}`);
        let monthlyArray: number[] = [];
        if (resMonth.ok) {
          const json = await resMonth.json();
          monthlyArray = Array.isArray(json.data) ? json.data : [];
        }

        setMonthlyData(Array.from({ length: 12 }, (_, i) => ({
          month: `Th ${i + 1}`,
          value: monthlyArray[i] ?? 0,
        })));

        // Total
        const resTotal = await fetch("http://localhost:8085/booking/conflict-log/stats/total");
        if (resTotal.ok) {
          const json = await resTotal.json();
          const totalNumber = typeof json === "number" ? json : Number(json.total) || 0;
          setTotal(Intl.NumberFormat("vi-VN").format(totalNumber));
        } else setTotal("Lỗi");

      } catch (e) {
        console.error("ConflictStatsChart error:", e);
        setTotal("Lỗi");
        setMonthlyData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
        Xung đột đặt xe • {new Date().getFullYear()}
      </h3>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">Tổng cộng</p>
        <p className="text-4xl font-extrabold">{loading ? "..." : total}</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v: number) => [Intl.NumberFormat("vi-VN").format(v), "Số lượng"]} />
          <Bar dataKey="value" fill="#ef4444" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
