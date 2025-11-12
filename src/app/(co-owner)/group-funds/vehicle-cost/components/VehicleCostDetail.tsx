'use client';
import { VehicleCost } from '@/types/vehiclecost.type';
import { format } from 'date-fns';
import Link from 'next/link';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { useRouter } from 'next/navigation';

interface Props {
  cost: VehicleCost;
  groupId: string;
}

export default function VehicleCostDetail({ cost, groupId }: Props) {
  const router = useRouter();
  // CHỈ DÙNG updateStatus & payWithMomo → KHÔNG GỌI fetchAll
  const { updateStatus, payWithMomo } = useVehicleCost(groupId);

  const handlePayWithFund = async () => {
    if (!cost.fundId) return alert('Không có quỹ để thanh toán');
    if (!confirm(`Thanh toán ${Number(cost.amount).toLocaleString('vi-VN')}đ từ quỹ?`)) return;

    try {
      await updateStatus(cost.costId, 'paid');
      alert('Thanh toán từ quỹ thành công!');
      router.refresh();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Không đủ tiền trong quỹ');
    }
  };

  const handlePayWithMomo = async () => {
    if (!confirm(`Thanh toán ${Number(cost.amount).toLocaleString('vi-VN')}đ bằng MoMo?`)) return;

    try {
      const res = await payWithMomo(cost.costId, 'MOMO');
      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        alert('Thanh toán thành công!');
        router.refresh();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Thanh toán MoMo thất bại');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Chi tiết: {cost.costName}</h1>

      <div className="space-y-5 text-lg">
        <div className="flex justify-between py-3 border-b border-gray-200">
          <span className="font-medium text-gray-600">ID</span>
          <span className="font-mono">#{cost.costId}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-gray-200">
          <span className="font-medium text-gray-600">Quỹ</span>
          <span>{cost.fundId ? `ID ${cost.fundId}` : 'Không dùng quỹ'}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-gray-200">
          <span className="font-medium text-gray-600">Xe</span>
          <span>{cost.vehicleId || '—'}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-gray-200">
          <span className="font-medium text-gray-600">Số tiền</span>
          <span className="text-3xl font-bold text-red-600">
            {Number(cost.amount).toLocaleString('vi-VN')}đ
          </span>
        </div>
        <div className="flex justify-between py-3 border-b border-gray-200">
          <span className="font-medium text-gray-600">Trạng thái</span>
          <span className={`px-4 py-1 rounded-full text-sm font-medium ${
            cost.status === 'paid' ? 'bg-green-100 text-green-700' :
            cost.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {cost.status === 'pending' ? 'Chờ duyệt' : cost.status === 'paid' ? 'Đã thanh toán' : 'Đã hủy'}
          </span>
        </div>
        <div className="flex justify-between py-3">
          <span className="font-medium text-gray-600">Tạo lúc</span>
          <span>{format(new Date(cost.createdAt), 'HH:mm, dd/MM/yyyy')}</span>
        </div>
      </div>

      {cost.status === 'pending' && (
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          {cost.fundId ? (
            <>
              <button
                onClick={handlePayWithFund}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                Thanh toán từ quỹ
              </button>
              <button
                onClick={handlePayWithMomo}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                Thanh toán MoMo
              </button>
            </>
          ) : (
            <button
              onClick={handlePayWithMomo}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
                Thanh toán MoMo
            </button>
          )}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href={`/group-funds/vehicle-cost?groupId=${groupId}`}
          className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
        >
          Quay lại danh sách
        </Link>
      </div>
    </div>
  );
}