'use client';

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MonthlyDistance {
  month: string;
  distance: number;
}

export function YearDistanceChart() {
  const [monthlyData, setMonthlyData] = useState<MonthlyDistance[]>([]);
  const [totalDistance, setTotalDistance] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = new Date().getFullYear();

        const monthRes = await fetch(`http://localhost:8085/past/history/getDistanceByMonth?year=${year}`);
        const monthData: number[] = monthRes.ok ? await monthRes.json() : [];

        const formattedMonthly = monthData.map((dist, i) => ({
          month: `Th ${i + 1}`,
          distance: Number(dist.toFixed(1)),
        }));
        setMonthlyData(formattedMonthly);

        const totalRes = await fetch("http://localhost:8085/past/history/getDistance");
        const totalKm: number = totalRes.ok ? await totalRes.json() : 0;

        const formattedTotal = new Intl.NumberFormat("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        }).format(totalKm);

        setTotalDistance(`${formattedTotal} km`);
      } catch (err) {
        console.error(err);
        setTotalDistance("Lỗi kết nối");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      {/* Tiêu đề chính */}
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Quãng đường xe chạy • {new Date().getFullYear()}
      </h3>

      {/* TỔNG QUÃNG ĐƯỜNG NỔI BẬT */}
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng quãng đường toàn hệ thống</p>
        <p className="text-5xl font-extrabold bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
          {loading ? "..." : totalDistance}
        </p>
        <p className="text-xs text-gray-400 mt-1">Cập nhật tự động</p>
      </div>

      {/* Biểu đồ */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "12px", color: "white" }}
            formatter={(value: number) => [`${value} km`, "Quãng đường"]}
          />
          <Bar dataKey="distance" fill="#14b8a6" radius={[12, 12, 0, 0]} name="Km" />
        </BarChart>
      </ResponsiveContainer>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
        Cập nhật mỗi 5 phút
      </p>
    </div>
  );
}