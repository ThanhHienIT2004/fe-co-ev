import Link from 'next/link';
import { format } from 'date-fns';
import { VehicleCost } from '@/types/vehiclecost.type';

interface Props {
  costs: VehicleCost[];
  groupId: string;
}

export default function VehicleCostList({ costs, groupId }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {costs.map((cost) => (
        <Link
          key={cost.costId}
          href={`/group-funds/vehicle-cost/${cost.costId}?groupId=${groupId}`}
          className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-900 truncate pr-2">
                {cost.costName}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                cost.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                cost.status === 'paid' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {cost.status === 'pending' ? 'Chờ' : cost.status === 'paid' ? 'Đã trả' : 'Hủy'}
              </span>
            </div>

            <p className="text-2xl font-bold text-red-600">
              {Number(cost.amount).toLocaleString('vi-VN')}đ
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {format(new Date(cost.createdAt), 'dd/MM/yyyy')}
            </p>

            {cost.fundId && (
              <p className="text-xs text-blue-600 mt-2">
                Quỹ: {cost.fundId}
              </p>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              ID: {cost.costId} • {cost.vehicleId ? `Xe: ${cost.vehicleId}` : 'Không có xe'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}