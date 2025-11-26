'use client';

import React, { useState } from "react";
import { useConflictAdmin } from "@/libs/hooks/useConflictAdmin";
import { ResolutionStatus } from "@/types/conflict.type";

export default function ConflictsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { conflicts = [], isLoading, createConflict, updateConflictStatus } = useConflictAdmin();

  // Luôn đảm bảo conflicts là mảng trước khi filter
  const filteredConflicts = Array.isArray(conflicts)
  ? conflicts.filter(c => c.booking_id.toString().includes(searchTerm))
  : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Quản lý xung đột đặt xe</h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Filter */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Danh sách xung đột</h2>
          <input
            type="text"
            placeholder="Tìm kiếm theo Booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-center py-6 text-gray-500">Đang tải dữ liệu...</p>
          ) : (
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
                {filteredConflicts.length > 0 ? (
                  filteredConflicts.map((c) => (
                    <tr key={c.conflict_id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm text-gray-700">{c.conflict_id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{c.booking_id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{c.resolved_by || "-"}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            c.resolution_status === ResolutionStatus.RESOLVED
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {c.resolution_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-[250px] truncate">{c.description || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{new Date(c.created_at).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{c.resolved_at ? new Date(c.resolved_at).toLocaleString() : "-"}</td>
                      <td className="px-4 py-3 text-center flex justify-center gap-2">
                        <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600">
                          Chi tiết
                        </button>
                        {/* Xóa tạm comment nếu API chưa có */}
                        {/* <button className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600">
                          Xoá
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-6 text-sm">Không có dữ liệu phù hợp</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
