'use client';
import { VehicleCost } from '@/types/vehiclecost.type';
import Link from 'next/link';
import { format } from 'date-fns';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';

interface Props {
  cost: VehicleCost;
  groupId: string;
  userId?: number;
  onUpdate?: () => void; // callback để reload parent
}

export default function VehicleCostCard({ cost, groupId, userId = 1, onUpdate }: Props) {
  const { updateStatus, deleteCost, payWithMomo } = useVehicleCost(groupId, userId);

  const handlePaid = async () => {
    try {
      if (!cost.fundId) {
        if (!confirm('Không dùng quỹ → Thanh toán bằng MoMo?')) return;
        await payWithMomo(cost.costId, 'MOMO');
        alert('Thanh toán MoMo thành công!');
      } else {
        const useFund = confirm('Dùng quỹ để thanh toán? (Hủy → MoMo)');
        if (useFund) {
          await updateStatus(cost.costId, 'paid');
          alert('Thanh toán từ quỹ thành công!');
        } else {
          await payWithMomo(cost.costId, 'MOMO');
          alert('Thanh toán MoMo thành công!');
        }
      }
      onUpdate?.(); // reload parent list
    } catch (err: any) {
      alert(err.message || 'Thanh toán thất bại');
    }
  };

  const handleCancel = async () => {
    if (!confirm('Hủy chi phí này?')) return;
    try {
      await updateStatus(cost.costId, 'cancelled');
      alert('Hủy chi phí thành công!');
      onUpdate?.();
    } catch (err: any) {
      alert(err.message || 'Hủy thất bại');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Xóa vĩnh viễn?')) return;
    try {
      await deleteCost(cost.costId);
      alert('Xóa chi phí thành công!');
      onUpdate?.();
    } catch (err: any) {
      alert(err.message || 'Xóa thất bại');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{cost.costName}</h3>
          {cost.vehicleId && <p className="text-sm text-gray-600">Xe: {cost.vehicleId}</p>}
          <p className="text-xs text-gray-500 mt-1">{format(new Date(cost.createdAt), 'HH:mm, dd/MM/yyyy')}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-red-600">{Number(cost.amount).toLocaleString('vi-VN')}đ</p>
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
            <button onClick={handlePaid} className="text-green-600 hover:underline font-medium">Thanh toán</button>
            <button onClick={handleCancel} className="text-orange-600 hover:underline font-medium">Hủy</button>
          </>
        )}
        <Link href={`/group-funds/vehicle-cost/${cost.costId}?groupId=${groupId}`} className="text-blue-600 hover:underline font-medium">Chi tiết</Link>
        <button onClick={handleDelete} className="text-red-600 hover:underline font-medium ml-auto">Xóa</button>
      </div>
    </div>
  );
}
