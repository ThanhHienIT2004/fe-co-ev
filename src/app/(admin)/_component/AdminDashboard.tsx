'use client';

import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dữ liệu thực tế phù hợp với EVSharing
const contractStats = [
  { month: "Th1", signed: 89, pending: 15, rejected: 3 },
  { month: "Th2", signed: 112, pending: 18, rejected: 5 },
  { month: "Th3", signed: 138, pending: 22, rejected: 4 },
  { month: "Th4", signed: 165, pending: 28, rejected: 6 },
  { month: "Th5", signed: 198, pending: 25, rejected: 7 },
  { month: "Th6", signed: 232, pending: 30, rejected: 8 },
  { month: "Th7", signed: 278, pending: 35, rejected: 9 },
];

const vehicleUsage = [
  { status: "Đang sử dụng", value: 68, color: "#14b8a6" },
  { status: "Đặt trước", value: 24, color: "#06b6d4" },
  { status: "Bảo trì", value: 8, color: "#f59e0b" },
];

const groupActivity = [
  { group: "GreenRide HN", members: 48, bookings: 312 },
  { group: "EcoDrive SG", members: 62, bookings: 428 },
  { group: "EVFamily DN", members: 35, bookings: 256 },
  { group: "ZeroCarbon", members: 29, bookings: 189 },
];

const weeklyTasks = [
  { day: "T2", completed: 42, pending: 8 },
  { day: "T3", completed: 58, pending: 12 },
  { day: "T4", completed: 71, pending: 15 },
  { day: "T5", completed: 65, pending: 10 },
  { day: "T6", completed: 88, pending: 14 },
  { day: "T7", completed: 52, pending: 18 },
  { day: "CN", completed: 31, pending: 22 },
];

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Nút Dark Mode - đồng bộ với header */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-20 right-6 z-40 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-teal-200 dark:border-cyan-800 hover:shadow-xl transition-all"
      >
        {darkMode ? "Sun" : "Moon"}
      </button>

      <div className="pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards - Màu teal/cyan chủ đạo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Tổng hợp đồng đã ký", value: "1,512", change: "+278 tháng này", color: "from-teal-500 to-teal-600" },
              { label: "Xe đang hoạt động", value: "68", change: "92% khả dụng", color: "from-cyan-500 to-cyan-600" },
              { label: "Nhóm đồng sở hữu", value: "24", change: "+3 nhóm mới", color: "from-emerald-500 to-emerald-600" },
              { label: "Lượt đặt xe hôm nay", value: "189", change: "+42% so với hôm qua", color: "from-sky-500 to-sky-600" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-10`} />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-4xl font-black mt-3 bg-linear-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold mt-4 text-teal-600 dark:text-cyan-400">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Hợp đồng theo thời gian */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
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

            {/* Trạng thái xe */}
            <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Tình trạng xe hiện tại
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={vehicleUsage}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vehicleUsage.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top nhóm hoạt động */}
            <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Top nhóm đồng sở hữu
              </h3>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={groupActivity} layout="horizontal">
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis type="number" />
                  <YAxis dataKey="group" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#06b6d4" radius={[0, 12, 12, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Hoạt động tuần */}
            <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
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
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 EVSharing • Hệ thống xe điện chia sẻ thông minh • Cập nhật: {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}