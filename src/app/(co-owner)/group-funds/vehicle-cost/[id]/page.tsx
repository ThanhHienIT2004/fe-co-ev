'use client';
import { useEffect, useState } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import VehicleCostDetail from '../components/VehicleCostDetail';

export default function VehicleCostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const groupIdFromQuery = searchParams.get('groupId');
  const GROUP_ID = groupIdFromQuery ?? 'group_001';
  const costId = Number(id);

  // CHỈ DÙNG getById → KHÔNG GỌI fetchAll → KHÔNG RE-RENDER
  const { getById } = useVehicleCost(GROUP_ID);
  const [cost, setCost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!costId || isNaN(costId)) {
      router.replace('/group-funds/vehicle-cost');
      return;
    }

    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const c = await getById(costId);
        if (isMounted) setCost(c);
      } catch (err: any) {
        if (isMounted) {
          alert(err.response?.data?.message || 'Không tìm thấy chi phí');
          router.replace('/group-funds/vehicle-cost');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [costId, getById, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải chi tiết...</p>
        </div>
      </div>
    );
  }

  if (!cost) return null;

  return <VehicleCostDetail cost={cost} groupId={GROUP_ID} />;
}