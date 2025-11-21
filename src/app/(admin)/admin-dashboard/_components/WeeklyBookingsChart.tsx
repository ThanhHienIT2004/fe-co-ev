// components/admin/WeeklyBookingsChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const weeklyTasks = [
  { day: "T2", completed: 42, pending: 8 },
  { day: "T3", completed: 58, pending: 12 },
  { day: "T4", completed: 71, pending: 15 },
  { day: "T5", completed: 65, pending: 10 },
  { day: "T6", completed: 88, pending: 14 },
  { day: "T7", completed: 52, pending: 18 },
  { day: "CN", completed: 31, pending: 22 },
];

export function WeeklyBookingsChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Đặt xe trong tuần
      </h3>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={weeklyTasks}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#14b8a6" radius={[12, 12, 0, 0]} name="Hoàn thành" />
          <Bar dataKey="pending" fill="#94a3b8" radius={[12, 12, 0, 0]} name="Đang chờ" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}