'use client';

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface GroupCost {
  group: string;
  cost: number;
}

export function VehicleCostChart() {
  const [data, setData] = useState<GroupCost[]>([]);
  const [totalCost, setTotalCost] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleCost = async () => {
      try {
        const res = await fetch("http://localhost:xxxx/api/vehicle-cost-by-group");
        const list: { groupName: string; total: number }[] = res.ok ? await res.json() : [];

        const formatted = list.map((item) => ({
          group: item.groupName,
          cost: Number(item.total.toFixed(1)),
        }));

        setData(formatted);

        const total = formatted.reduce((sum, i) => sum + i.cost, 0);
        setTotalCost(
          new Intl.NumberFormat("vi-VN").format(total) + " VND"
        );
      } catch (err) {
        console.error(err);
        setTotalCost("Lỗi kết nối");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleCost();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
        Tổng chi phí VehicleCost theo nhóm
      </h3>

      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng chi phí</p>
        <p className="text-5xl font-extrabold bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          {loading ? "..." : totalCost}
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
            formatter={(value: number) => [`${value} VND`, "Chi phí"]}
          />
          <Bar dataKey="cost" fill="#f43f5e" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
