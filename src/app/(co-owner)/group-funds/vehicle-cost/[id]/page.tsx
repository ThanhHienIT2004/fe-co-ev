// src/app/(co-owner)/group-funds/vehicle-cost/[id]/page.tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import VehicleCostDetail from '../components/VehicleCostDetail';
import api from '@/libs/apis/api';
export default function VehicleCostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const costId = Number(id);
  const groupIdRef = useRef<string>(searchParams.get('groupId') ?? 'group_001');

  const [cost, setCost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!costId || isNaN(costId)) {
      router.replace('/group-funds/vehicle-cost');
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/costs/${costId}`, {
        params: { groupId: groupIdRef.current }
      });
      setCost(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Không tìm thấy chi phí');
      router.replace('/group-funds/vehicle-cost');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    loadData();

    return () => {
      isMounted = false;
    };
  }, [costId, router]);

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

  return <VehicleCostDetail cost={cost} groupId={groupIdRef.current} />;
}