'use client';
import { useState, useEffect } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function DepositPage() {
  const { deposit, getById } = useGroupFund();
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [fund, setFund] = useState<any>(null);

  const gateway: "VNPAY" = "VNPAY";

  useEffect(() => {
    if (id) {
      getById(Number(id))
        .then(setFund)
        .catch(() => router.push('/group-funds/fund'));
    }
  }, [id, getById, router]);

  const handleDeposit = async () => {
    if (!amount || Number(amount) < 10000)
      return alert('Tối thiểu 10,000đ');

    setLoading(true);
    try {
      const fakeUrl = `/payment/success?fundId=${id}&amount=${amount}&gateway=VNPAY`;
      return router.push(fakeUrl);

    } catch (err: any) {
      alert(err.response?.data?.message || "Nạp thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!fund) return <div className="text-center py-20">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nạp Tiền Vào Quỹ</h1>
            <Link href={`/group-funds/fund/${id}`} className="text-blue-600 hover:underline">
              ← Quay lại
            </Link>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-purple-700 font-medium">Quỹ: {fund.fundName}</p>
            <p className="text-2xl font-bold text-purple-900">
              {Number(fund.balance).toLocaleString('vi-VN')}đ
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tiền nạp *
              </label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="100000"
                min="10000"
                step="1000"
              />
            </div>

            {/* Chỉ hiển thị cổng VNPAY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cổng thanh toán
              </label>
              <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 text-blue-700 flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <span className="font-medium">VNPAY</span>
              </div>
            </div>

            <button
              onClick={handleDeposit}
              disabled={loading || !amount}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Đang chuyển hướng...' : 'Thanh toán với VNPAY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
