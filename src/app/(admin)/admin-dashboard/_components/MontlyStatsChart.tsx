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

interface MonthlyStatChartProps {
  title: string;           // ví dụ: "Tổng lượt đặt xe"
  apiMonthly: string;      // ví dụ: "/booking/stats/by-month"
  apiTotal: string;        // ví dụ: "/booking/stats/total"
  color?: string;          // màu cho chart
}

export function MonthlyStatChart({
  title,
  apiMonthly,
  apiTotal,
  color = "#14b8a6",
}: MonthlyStatChartProps) {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [total, setTotal] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const year = new Date().getFullYear();

        const resMonth = await fetch(`${apiMonthly}?year=${year}`);
        const arr: number[] = resMonth.ok ? await resMonth.json() : [];

        setMonthlyData(
          arr.map((val, i) => ({
            month: `Th ${i + 1}`,
            value: val,
          }))
        );

        const resTotal = await fetch(apiTotal);
        const totalVal = resTotal.ok ? await resTotal.json() : 0;

        setTotal(
          Intl.NumberFormat("vi-VN").format(totalVal)
        );
      } catch (e) {
        console.error(e);
        setTotal("Lỗi");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        {title} • {new Date().getFullYear()}
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
          <Tooltip formatter={(v: number) => [`${v}`, "Số lượng"]} />
          <Bar dataKey="value" fill={color} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
