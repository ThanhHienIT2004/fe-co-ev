'use client';

import { useState, useEffect } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { GroupFund } from '@/types/groupfund.type';

export default function FundDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const groupId = searchParams.get('groupId') || '1';

  const { getById } = useGroupFund(groupId);

  const [fund, setFund] = useState<GroupFund | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState('');

  const loadFund = async () => {
    if (!id || isNaN(Number(id))) {
      router.replace(`/group-funds/fund?groupId=${groupId}`);
      return;
    }
    setIsLoading(true);
    try {
      const data = await getById(Number(id));
      if (!data) throw new Error('Không tìm thấy quỹ');
      setFund(data);
    } catch (err) {
      console.error('Load fund error:', err);
      router.replace(`/group-funds/fund?groupId=${groupId}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadFund(); }, [id, groupId]);

  const handleDepositRedirect = () => {
    if (!depositAmount || Number(depositAmount) < 10000) {
      alert('Tối thiểu 10.000đ');
      return;
    }

    // Redirect sang DepositPage với groupId
    router.push(
      `/group-funds/fund/${id}/deposit?amount=${depositAmount}&gateway=VNPAY&groupId=${groupId}`
    );
  };

  if (isLoading) return <div className="text-center py-20">Đang tải chi tiết quỹ...</div>;
  if (!fund) return <div className="text-center py-20">Không tìm thấy quỹ</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{fund.fundName}</h1>
            <p className="text-gray-600 mt-1">
              ID: <strong>{fund.fundId}</strong> • Nhóm: <strong>{groupId}</strong>
            </p>
          </div>
          <Link href={`/group-funds/fund?groupId=${groupId}`} className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
            Đóng
          </Link>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl mb-8">
          <p className="text-blue-100 text-sm font-medium">Số dư hiện tại</p>
          <p className="text-5xl font-bold mt-2">{Number(fund.balance).toLocaleString('vi-VN')}đ</p>
          <p className="text-blue-100 text-sm mt-3">
            Tạo: {format(new Date(fund.createdAt), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>

        {/* Deposit Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nạp tiền vào quỹ</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nhập số tiền"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
            />
            <button
              onClick={handleDepositRedirect}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg"
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

        {/* Fund Info */}
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
          Cập nhật lúc: <strong>{format(new Date(), "HH:mm, 'ngày' dd/MM/yyyy")}</strong>
        </div>
      </div>
    </div>
  );
}
