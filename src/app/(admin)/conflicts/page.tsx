"use client";

import React from "react";

export default function ConflictsPage() {
  const conflicts = [
    {
      conflict_id: "CF001",
      booking_id: "BK102",
      resolve_by: "STF001",
      resolution_status: "Pending",
      description: "Xe bị đặt trùng khung giờ với BK098",
      created_at: "2025-11-01 08:30",
      resolved_at: "-",
    },
    {
      conflict_id: "CF002",
      booking_id: "BK110",
      resolve_by: "STF003",
      resolution_status: "Resolved",
      description: "Đã huỷ đặt lịch trùng và hoàn tiền khách.",
      created_at: "2025-10-28 14:00",
      resolved_at: "2025-10-29 09:20",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">

      {/* Nội dung chính bên phải */}
      <main className="flex-1 ml-64 pt-20 px-6">
        <h1 className="text-2xl font-semibold mb-6">Quản lý xung đột đặt xe</h1>

        <div className="bg-white shadow-md rounded-xl p-6">

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Conflict ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Booking ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Resolve By</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mô tả</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngày tạo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngày xử lý</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {conflicts.map((c) => (
                  <tr key={c.conflict_id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-700">{c.conflict_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.booking_id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.resolve_by}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          c.resolution_status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {c.resolution_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-[250px] truncate">{c.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.created_at}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.resolved_at}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 mr-2">
                        Chi tiết
                      </button>
                      <button className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600">
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
