'use client';
import { GroupFund } from '@/types/groupfund.type';
import Link from 'next/link';
import { format } from 'date-fns';

interface FundCardProps {
  fund: GroupFund;
  onDelete: (id: number) => void;
  groupId: number;
}

export default function FundCard({ fund, onDelete, groupId }: FundCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 truncate pr-2">
              {fund.fundName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              ID: {fund.fundId} • {format(new Date(fund.createdAt), 'dd/MM/yyyy')}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-green-600">
            {Number(fund.balance).toLocaleString('vi-VN')}đ
          </p>
          <p className="text-xs text-gray-500">Số dư hiện tại</p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/group-funds/fund/${fund.fundId}?groupId=${groupId}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Xem chi tiết
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(fund.fundId);
            }}
            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}