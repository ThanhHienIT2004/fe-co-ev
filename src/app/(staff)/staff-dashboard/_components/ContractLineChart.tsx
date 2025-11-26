// components/admin/ContractLineChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const contractStats = [
  { month: "Th1", signed: 89, pending: 15, rejected: 3 },
  { month: "Th2", signed: 112, pending: 18, rejected: 5 },
  { month: "Th3", signed: 138, pending: 22, rejected: 4 },
  { month: "Th4", signed: 165, pending: 28, rejected: 6 },
  { month: "Th5", signed: 198, pending: 25, rejected: 7 },
  { month: "Th6", signed: 232, pending: 30, rejected: 8 },
  { month: "Th7", signed: 278, pending: 35, rejected: 9 },
];

export function ContractLineChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Hợp đồng điện tử theo tháng
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={contractStats}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #14b8a6",
              borderRadius: "12px",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="signed" stroke="#14b8a6" strokeWidth={5} dot={{ fill: "#14b8a6", r: 8 }} name="Đã ký" />
          <Line type="monotone" dataKey="pending" stroke="#06b6d4" strokeWidth={4} dot={{ fill: "#06b6d4", r: 6 }} name="Chờ ký" />
          <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="Từ chối" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}