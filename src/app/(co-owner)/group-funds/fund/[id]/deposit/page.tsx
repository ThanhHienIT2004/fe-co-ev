'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGroupFund } from '@/libs/hooks/useGroupFund';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { deposit } = useGroupFund();

  const fundId = Number(searchParams.get('fundId'));
  const amount = String(searchParams.get('amount') || '0');
  const gateway: 'VNPAY' = 'VNPAY';
  const groupId = searchParams.get('groupId') || '1';

  const [seconds, setSeconds] = useState(8);

  useEffect(() => {
    const processPayment = async () => {
      if (!fundId || Number(amount) < 10000) return;

      try {
        await deposit(fundId, {
          amount,
          gateway,
          fake: true,
        });
      } catch (err) {
        console.error(err);
        alert('Lỗi xử lý thanh toán');
      }
    };

    processPayment();
  }, [fundId, amount, deposit]);

  // Đếm ngược 8 giây
  useEffect(() => {
    if (seconds <= 0) {
      router.push(`/group-funds/fund/${fundId}?groupId=${groupId}`);
      return;
    }
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router, fundId, groupId]); // thêm groupId vào dependency

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-3">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-700 text-lg mb-2">
          Bạn đã nạp{' '}
          <strong className="text-green-600">
            {parseInt(amount).toLocaleString('vi-VN')}đ
          </strong>
        </p>
        <p className="text-gray-500 mt-3">
          Chuyển về trang quỹ trong <strong>{seconds}</strong> giây...
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => router.push(`/group-funds/fund/${fundId}?groupId=${groupId}`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Quay lại ngay
          </button>
          <button
            onClick={() => router.push(`/group-funds/fund?groupId=${groupId}`)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Quay về danh sách quỹ
          </button>
        </div>
      </div>
    </div>
  );
}
