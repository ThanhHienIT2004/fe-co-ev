// src/types/transaction.type.ts
export interface FundTransaction {
  transactionId: number;
  fundId: number;
  paymentId?: number;     // MỚI
  costId?: number;        // MỚI
  transactionType: 'deposit' | 'withdraw' | 'cost';
  amount: string;
  description: string;
  performedBy: string;
  gatewayOrderId?: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: string;
}