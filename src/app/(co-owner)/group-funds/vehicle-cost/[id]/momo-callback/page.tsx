'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';

export default function MomoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId') ?? 'group_001';
  const { updateStatus } = useVehicleCost(groupId);

  useEffect(() => {
    const resultCode = searchParams.get('resultCode');
    const orderId = searchParams.get('orderId');

    if (resultCode === '0' && orderId) {
      const costId = orderId.split('_')[1];
      if (costId && !isNaN(Number(costId))) {
        updateStatus(Number(costId), 'paid');
        alert('Thanh toán MoMo thành công!');
      }
    } else {
      alert('Thanh toán thất bại hoặc bị hủy.');
    }
    router.push(`/group-funds/vehicle-cost?groupId=${groupId}`);
  }, [searchParams, router, updateStatus, groupId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <p className="text-lg">Đang xử lý thanh toán...</p>
    </div>
  );
}