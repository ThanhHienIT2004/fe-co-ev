// src/app/admin/_component/EmptyStateProfile.tsx
import { Users } from 'lucide-react';

export default function EmptyStateProfile() {
  return (
    <div className="text-center py-24 px-8">
      <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full mb-8">
        <Users className="w-14 h-14 text-teal-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">Chưa có hồ sơ nào</h3>
      <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
        Người dùng sẽ tự động tạo hồ sơ khi đăng nhập và cập nhật thông tin cá nhân lần đầu tiên.
      </p>
    </div>
  );
}