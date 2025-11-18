// app/history/components/EmptyState.tsx
"use client";
import { Car } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
      <Car className="w-20 h-20 text-gray-400 mx-auto mb-4" />
      <p className="text-xl text-gray-600">Chưa có lịch sử sử dụng xe</p>
      <p className="text-gray-500 mt-2">Hãy đặt xe và trải nghiệm ngay!</p>
    </div>
  );
}