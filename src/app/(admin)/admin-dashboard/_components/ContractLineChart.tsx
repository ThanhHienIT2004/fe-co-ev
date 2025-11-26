// components/admin/ContractLineChart.tsx
import { useContractStats } from "@/libs/hooks/useEContracts";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export function ContractLineChart() {
  const { stats, isLoading } = useContractStats();

  if (isLoading) return <p className="text-center py-10">Đang tải dữ liệu...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Hợp đồng điện tử theo tháng
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={stats}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="signed" stroke="#14b8a6" strokeWidth={5} name="Đã ký" />
          <Line type="monotone" dataKey="pending" stroke="#06b6d4" strokeWidth={4} name="Chờ ký" />
          <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={3} name="Từ chối" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
