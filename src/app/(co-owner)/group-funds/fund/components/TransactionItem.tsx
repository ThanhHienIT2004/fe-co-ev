// src/app/(co-owner)/group-funds/fund/components/TransactionItem.tsx
import { FundTransaction } from '@/types/transaction.type';
import { format } from 'date-fns';

interface Props {
  tx: FundTransaction;
}

export default function TransactionItem({ tx }: Props) {
  const isDeposit = tx.transactionType === 'deposit';
  const isCost = tx.transactionType === 'cost';
  const statusColor = 
    tx.status === 'success' ? 'text-green-600' : 
    tx.status === 'pending' ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isDeposit ? 'bg-green-100' : isCost ? 'bg-orange-100' : 'bg-red-100'
        }`}>
          <svg className={`w-5 h-5 ${
            isDeposit ? 'text-green-600' : isCost ? 'text-orange-600' : 'text-red-600'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d={isDeposit ? "M12 4v16m8-8H4" : "M20 12H4"} />
          </svg>
        </div>
        <div>
          <p className="font-medium text-black">{tx.description}</p>
          <p className="text-sm text-black">
            {format(new Date(tx.createdAt), 'dd/MM/yyyy HH:mm')}
            {tx.paymentId && ` • Thanh toán #${tx.paymentId}`}
            {tx.costId && ` • Chi phí #${tx.costId}`}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg font-bold ${
          isDeposit ? 'text-green-600' : 'text-red-600'
        }`}>
          {isDeposit ? '+' : '-'}{Number(tx.amount).toLocaleString('vi-VN')}đ
        </p>
        <p className={`text-xs ${statusColor}`}>
          {tx.status === 'success' ? 'Thành công' : 
           tx.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
        </p>
      </div>
    </div>
  );
}