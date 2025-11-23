// src/app/(co-owner)/history/page.tsx
"use client"; // ← QUAN TRỌNG: Chuyển thành Client Component

import { useState, useEffect } from "react";
import HistoryCard from "./components/HistoryCard";

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      // Lấy userId từ localStorage
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("Vui lòng đăng nhập để xem lịch sử");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8085/past/history/get/${userId}`, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            // Nếu backend cần token thì thêm:
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Không thể tải lịch sử");

        const data = await res.json();
        const list = data?.data || data || [];
        setHistoryList(list);
      } catch (err) {
        setError("Lỗi kết nối server. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Lịch sử sử dụng xe
        </h1>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Đang tải lịch sử...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            {!localStorage.getItem("userId") && (
              <a href="/login" className="mt-4 inline-block text-teal-600 underline">
                Đăng nhập ngay
              </a>
            )}
          </div>
        )}

        {!loading && !error && historyList.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-lg bg-white rounded-xl shadow">
            Chưa có lịch sử sử dụng xe
          </div>
        )}

        {!loading && !error && historyList.length > 0 && (
          <div className="space-y-8">
            {historyList.map((item: any) => (
              <HistoryCard
                key={item._id?.$oid || item._id || item.booking_id || Math.random()}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}