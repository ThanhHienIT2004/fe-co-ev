"use client";

import React, { useState } from "react";

export default function UsageHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const usageHistory = [
    {
      usage_id: "U001",
      booking_id: "BK1001",
      checkin_time: "2025-10-21 08:00",
      checkout_time: "2025-10-21 18:30",
      vehicle_condition: "Tốt, không hư hại",
      distance: "125 km",
      record_time: "2025-10-21 19:00",
    },
    {
      usage_id: "U002",
      booking_id: "BK1008",
      checkin_time: "2025-10-25 07:45",
      checkout_time: "2025-10-25 17:10",
      vehicle_condition: "Trầy nhẹ phần cản sau",
      distance: "98 km",
      record_time: "2025-10-25 17:30",
    },
    {
      usage_id: "U003",
      booking_id: "BK1010",
      checkin_time: "2025-11-01 09:15",
      checkout_time: "2025-11-01 20:00",
      vehicle_condition: "Bình thường",
      distance: "154 km",
      record_time: "2025-11-01 20:15",
    },
  ];

  // Lọc dữ liệu
  const filteredHistory = usageHistory.filter((u) => {
    const matchesSearch = u.booking_id.toLowerCase().includes(searchTerm.toLowerCase());
    const recordDate = new Date(u.record_time);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesDate =
      (!from || recordDate >= from) && (!to || recordDate <= to);
    return matchesSearch && matchesDate;
  });

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Lịch sử sử dụng xe
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Bộ lọc */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Từ ngày
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Đến ngày
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tìm kiếm Booking ID
            </label>
            <input
              type="text"
              placeholder="Nhập Booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Bảng hiển thị */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usage ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Booking ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Check-in Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Check-out Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tình trạng xe</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Quãng đường</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Thời điểm ghi nhận</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((u) => (
                  <tr key={u.usage_id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-700">{u.usage_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{u.booking_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{u.checkin_time}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{u.checkout_time}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{u.vehicle_condition}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{u.distance}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{u.record_time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    Không có dữ liệu phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
