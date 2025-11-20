// src/app/(co-owner)/group-funds/fund/components/FundList.tsx
'use client';
import { GroupFund } from '@/types/groupfund.type';
import FundCard from './FundCard';

interface Props {
  funds: GroupFund[];
  loading: boolean;
}

export default function FundList({ funds, loading }: Props) {
  if (loading) return <p className="text-center py-8">Đang tải...</p>;
  if (funds.length === 0) return <p className="text-center py-8 text-gray-500">Chưa có quỹ nào</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {funds.map(fund => (
        <FundCard key={fund.fundId} fund={fund} />
      ))}
    </div>
  );
}