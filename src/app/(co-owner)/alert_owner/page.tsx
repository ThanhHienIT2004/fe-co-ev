"use client";

import React from "react";
import { useAlerts } from "@/libs/hooks/useAlert";
import { Loader2 } from "lucide-react";

export default function AlertOwnerPage() {
  const user_id = 101; // TODO: thay bằng data thật từ auth hoặc context
  const { data: alerts, isLoading, error } = useAlerts(user_id);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Thông báo của bạn</h1>

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" size={24} />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center py-6">
          Lỗi tải dữ liệu: {(error as unknown as Error).message}
        </p>
      )}

      {!isLoading && !error && alerts?.length === 0 && (
        <p className="text-gray-500 text-center py-6">Không có cảnh báo nào</p>
      )}

      {!isLoading && !error && alerts?.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Loại</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Nội dung</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.alert_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{alert.alert_type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{alert.message}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {alert.status === "unread" ? (
                      <span className="text-red-500 font-semibold">Chưa đọc</span>
                    ) : (
                      <span className="text-green-600 font-medium">Đã đọc</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(alert.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
