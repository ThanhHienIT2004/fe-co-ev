'use client';

import React, { useState, useEffect } from "react";
import { useConflictAdmin } from "@/libs/hooks/useConflictAdmin";
import { ResolutionStatus } from "@/types/conflict.type";

export default function ConflictsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedConflict, setSelectedConflict] = useState<number | null>(null);
  const [status, setStatus] = useState<ResolutionStatus>(ResolutionStatus.RESOLVED);

  // Tự động lấy userId từ localStorage
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
    }
  }, []);

  const { conflicts = [], isLoading, updateConflictStatus } = useConflictAdmin();

  const filteredConflicts = Array.isArray(conflicts)
    ? conflicts.filter(c => c.booking_id.toString().includes(searchTerm))
    : [];

  const handleUpdate = async () => {
    if (!selectedConflict || !currentUserId) return;

    await updateConflictStatus(
      selectedConflict,
      status,
      Number(currentUserId) // tự động dùng ID người đang đăng nhập
    );

    setShowForm(false);
    setSelectedConflict(null);
  };

  const openUpdateForm = (conflictId: number, currentStatus: ResolutionStatus) => {
    setSelectedConflict(conflictId);
    setStatus(currentStatus);
    setShowForm(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">Quản lý xung đột đặt xe</h1>
          <p className="text-slate-500 mt-2">Giám sát và xử lý các booking bị xung đột</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-700">Danh sách xung đột</h2>
            <input
              type="text"
              placeholder="Tìm kiếm theo Booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:max-w-md px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition placeholder-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-4 text-slate-500">Đang tải dữ liệu...</p>
              </div>
            ) : filteredConflicts.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <p className="text-lg font-medium">Không có xung đột nào</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Booking</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Xử lý bởi</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Mô tả</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Tạo lúc</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Xử lý lúc</th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredConflicts.map((c) => (
                    <tr key={c.conflict_id} className="hover:bg-indigo-50/50 transition">
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-indigo-700">{c.conflict_id}</td>
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-indigo-700">{c.booking_id}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{c.resolved_by || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-bold ${
                          c.resolution_status === ResolutionStatus.RESOLVED
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {c.resolution_status === ResolutionStatus.RESOLVED && "Đã xử lý"}
                          {c.resolution_status === ResolutionStatus.UNRESOLVED && "Đang chờ"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate" title={c.description || ""}>
                        {c.description || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(c.created_at).toLocaleString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {c.resolved_at ? new Date(c.resolved_at).toLocaleString("vi-VN") : "—"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          {/* Nút Chi tiết vẫn giữ modal nếu muốn xem thông tin */}
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-sm">
                            Chi tiết
                          </button>

                          {/* Nút đánh dấu đã xử lý trực tiếp */}
                          <button
                            onClick={() =>
                              currentUserId &&
                              updateConflictStatus(c.conflict_id, ResolutionStatus.RESOLVED, Number(currentUserId))
                            }
                            disabled={c.resolution_status === ResolutionStatus.RESOLVED || !currentUserId}
                            className={`px-4 py-2 text-white text-xs font-semibold rounded-lg transition shadow-sm ${
                              c.resolution_status === ResolutionStatus.RESOLVED || !currentUserId
                                ? "bg-gray-400 cursor-not-allowed opacity-60"
                                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                            }`}
                          >
                            {c.resolution_status === ResolutionStatus.RESOLVED ? "Đã xử lý" : "Xử lý"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>


      </div>
    </main>
  );
}