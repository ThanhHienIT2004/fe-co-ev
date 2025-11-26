'use client';

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FundData {
  group: string;
  fund: number;
}

export function GroupFundChart() {
  const [data, setData] = useState<FundData[]>([]);
  const [totalFund, setTotalFund] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFund = async () => {
      try {

        const res = await fetch("http://localhost:xxxx/api/group-fund-total");
        const list: { groupName: string; totalFund: number }[] = res.ok ? await res.json() : [];

        const formatted = list.map((item) => ({
          group: item.groupName,
          fund: Number(item.totalFund.toFixed(1)),
        }));

        setData(formatted);

        const total = formatted.reduce((sum, i) => sum + i.fund, 0);
        setTotalFund(
          new Intl.NumberFormat("vi-VN").format(total) + " VND"
        );
      } catch (err) {
        console.error(err);
        setTotalFund("Lỗi kết nối");
      } finally {
        setLoading(false);
      }
    };

    fetchFund();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
        Tổng GroupFund theo nhóm
      </h3>

      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng quỹ</p>
        <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
          {loading ? "..." : totalFund}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
          <XAxis dataKey="group" tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "12px",
              color: "white"
            }}
            formatter={(value: number) => [`${value} VND`, "Quỹ nhóm"]}
          />
          <Bar dataKey="fund" fill="#3b82f6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
