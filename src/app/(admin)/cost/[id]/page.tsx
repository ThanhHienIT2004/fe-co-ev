// src/app/admin/cost/[id]/page.tsx
'use client';

import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getById, loading } = useVehicleCost('all');
  const [cost, setCost] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getById(Number(id)).then(setCost).catch(() => alert('Không tìm thấy chi phí'));
    }
  }, [id]);

  if (loading || !cost) {
    return <div className="p-20 text-center">Đang tải...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/cost" className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{cost.costName}</h1>
            <p className="text-gray-600 mt-2">ID: #{cost.costId} • Nhóm: {cost.groupId}</p>
          </div>
          <Link href={`/cost/${cost.costId}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Chỉnh sửa
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600">Số tiền</p>
            <p className="text-3xl font-bold text-red-600">{Number(cost.amount).toLocaleString('vi-VN')}đ</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Trạng thái</p>
            <p className="text-xl font-semibold">
              <span className={`px-4 py-2 rounded-full text-sm ${
                cost.status === 'paid' ? 'bg-green-100 text-green-800' :
                cost.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {cost.status === 'paid' ? 'Đã thanh toán' : cost.status === 'pending' ? 'Chờ thanh toán' : 'Đã hủy'}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-gray-600">Ngày tạo</p>
          <p className="text-lg">{format(new Date(cost.createdAt), 'PPpp', { locale: vi })}</p>
        </div>
      </div>
    </div>
  );
}