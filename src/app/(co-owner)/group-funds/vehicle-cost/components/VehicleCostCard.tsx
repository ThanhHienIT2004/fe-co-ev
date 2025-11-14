'use client';
import { VehicleCost } from '@/types/vehiclecost.type';
import Link from 'next/link';
import { format } from 'date-fns';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';

interface Props {
  cost: VehicleCost;
}

export default function VehicleCostCard({ cost }: Props) {
  const { updateStatus, deleteCost } = useVehicleCost();

  const handlePaid = async () => {
    if (!cost.fundId) {
      if (!confirm('Không dùng quỹ → Thanh toán bằng MoMo?')) return;
      try {
        await updateStatus(cost.costId, 'paid', 'momo');
      } catch {}
      return;
    }
    const useFund = confirm('Dùng quỹ để thanh toán? (Hủy → MoMo)');
    try {
      await updateStatus(cost.costId, 'paid', useFund ? 'fund' : 'momo');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Hủy chi phí này?')) return;
    try {
      await updateStatus(cost.costId, 'cancelled', 'fund');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Xóa vĩnh viễn?')) return;
    try {
      await deleteCost(cost.costId);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{cost.costName}</h3>
          {cost.vehicleId && <p className="text-sm text-gray-600">Xe: {cost.vehicleId}</p>}
          <p className="text-xs text-gray-500 mt-1">
            {format(new Date(cost.createdAt), 'HH:mm, dd/MM/yyyy')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-red-600">
            {parseFloat(cost.amount).toLocaleString('vi-VN')}đ
          </p>
          <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
            cost.status === 'paid' ? 'bg-green-100 text-green-700' :
            cost.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {cost.status === 'pending' ? 'Chờ duyệt' : cost.status === 'paid' ? 'Đã thanh toán' : 'Đã hủy'}
          </span>
        </div>
      </div>

      <div className="flex gap-3 text-sm border-t pt-3">
        {cost.status === 'pending' && (
          <>
            <button onClick={handlePaid} className="text-green-600 hover:underline font-medium">
              Thanh toán
            </button>
            <button onClick={handleCancel} className="text-orange-600 hover:underline font-medium">
              Hủy
            </button>
          </>
        )}
        <Link href={`/group-funds/vehicle-cost/${cost.costId}`} className="text-blue-600 hover:underline font-medium">
          Chi tiết
        </Link>
        <button onClick={handleDelete} className="text-red-600 hover:underline font-medium ml-auto">
          Xóa
        </button>
      </div>
    </div>
  );
}