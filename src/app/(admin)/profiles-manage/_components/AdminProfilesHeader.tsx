// components/admin-profiles/AdminProfilesHeader.tsx

"use client";

import { Shield } from "lucide-react";

export default function AdminProfilesHeader({ total }: { total: number }) {
  return (
    <div className="bg-teal-50/80 backdrop-blur-sm border-b border-teal-100 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Quản lý hồ sơ người dùng
            </h1>
            <p className="text-teal-700 mt-1">Xem và quản lý toàn bộ thành viên hệ thống</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Tổng thành viên</p>
              <p className="text-3xl font-bold text-teal-600">{total}</p>
            </div>
            <Shield className="w-12 h-12 text-teal-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
