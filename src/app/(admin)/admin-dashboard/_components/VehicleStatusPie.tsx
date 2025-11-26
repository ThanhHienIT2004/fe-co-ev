// components/admin/VehicleStatusPie.tsx
"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface VehicleStatusSummary {
  total: number;
  available: number;
  used: number;
}

export function VehicleStatusPie() {
  const [data, setData] = useState<VehicleStatusSummary>({
    total: 0,
    available: 0,
    used: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, "0");
        const d = String(today.getDate()).padStart(2, "0");
        const dateString = `${y}-${m}-${d}`;

        const res = await fetch(
          `http://localhost:8085/booking/vehicles/status/today?date=${dateString}`
        );
        if (!res.ok) throw new Error("Không thể tải dữ liệu xe");

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu xe. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const pieData = [
    { status: "Xe đang trống", value: data.available, color: "#14b8a6" },
    { status: "Xe đang sử dụng", value: data.used, color: "#f97316" },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { status, value, color } = payload[0].payload;
      return (
        <div
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-3"
          style={{ color }}
        >
          <p className="font-semibold">{status}: {value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Tình trạng xe hôm nay
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={130}
            paddingAngle={5}
            dataKey="value"
            nameKey="status"
          >
            {pieData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
