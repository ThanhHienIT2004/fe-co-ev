'use client';
import Link from 'next/link';
import VehicleCostForm from '../components/VehicleCostForm';
import { useParams } from 'next/navigation';

export default function CreateVehicleCostPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const GROUP_ID = groupId ?? '1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/group-funds/vehicle-cost" className="text-blue-600 hover:underline mb-6 inline-block">
          Quay lại
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Thêm Chi Phí Xe</h1>
          <VehicleCostForm groupId={GROUP_ID} />
        </div>
      </div>
    </div>
  );
}
