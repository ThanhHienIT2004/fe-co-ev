'use client';

import { useEffect, useState } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { GroupFund } from '@/types/groupfund.type';

export default function FundDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const groupIdFromQuery = searchParams.get('groupId');
  const GROUP_ID = groupIdFromQuery ?? 'group_001';

  const { getById, deposit, loading: hookLoading } = useGroupFund(GROUP_ID);

  const [fund, setFund] = useState<GroupFund | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState('');

  const loadFund = async () => {
    if (!id || isNaN(Number(id))) {
      router.replace('/group-funds/fund');
      return;
    }

    setIsLoading(true);
    try {
      const data = await getById(Number(id));
      setFund(data);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Không tìm thấy quỹ!');
      router.replace('/group-funds/fund');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFund();
  }, [id, GROUP_ID]);

  const handleDeposit = async () => {
  const amount = depositAmount.replace(/\D/g, '');
  if (!amount || Number(amount) < 10000) {
    return alert('Tối thiểu 10.000đ');
  }

  try {
    const res = await deposit(Number(id), { 
      amount,
      gateway: "VNPAY",
      fake: false
    });

    if (res.paymentUrl) {
      window.location.href = res.paymentUrl;
    } else {
      alert('Nạp tiền thành công!');
      loadFund();
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Nạp tiền thất bại!');
  }
};


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải chi tiết quỹ...</p>
        </div>
      </div>
    );
  }

  if (!fund) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{fund.fundName}</h1>
            <p className="text-gray-600 mt-1">
              ID: <strong>{fund.fundId}</strong> • Nhóm: <strong>{GROUP_ID}</strong>
            </p>
          </div>

          <Link href="/group-funds/fund" className="text-gray-600 hover:text-gray-900 transition flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Đóng
          </Link>
        </div>

        {/* Balance */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl mb-8">
          <p className="text-blue-100 text-sm font-medium">Số dư hiện tại</p>
          <p className="text-5xl font-bold mt-2">
            {Number(fund.balance).toLocaleString('vi-VN')}đ
          </p>
          <p className="text-blue-100 text-sm mt-3">
            Tạo: {format(new Date(fund.createdAt), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>

        {/* Deposit */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nạp tiền vào quỹ</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nhập số tiền (VD: 500000)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
            />

            {/* Chỉ còn nút VNPAY */}
            <button
              onClick={handleDeposit}
              disabled={hookLoading || !depositAmount}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              VNPAY
            </button>
          </div>

          {depositAmount && Number(depositAmount) >= 10000 && (
            <p className="text-sm text-gray-600 mt-2">
              Sẽ nạp: <strong>{Number(depositAmount).toLocaleString('vi-VN')}đ</strong>
            </p>
          )}
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Thông tin quỹ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Người tạo</p>
              <p className="font-medium text-gray-900">{fund.createdBy}</p>
            </div>
            <div>
              <p className="text-gray-600">Cập nhật lần cuối</p>
              <p className="font-medium text-gray-900">
                {format(new Date(fund.updatedAt), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-500">
          Cập nhật lúc: <strong>{format(new Date(), 'HH:mm, dd/MM/yyyy')}</strong>
        </div>

      </div>
    </div>
  );
}
