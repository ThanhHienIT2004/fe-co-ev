// src/types/groupfund.type.ts
export interface GroupFund {
  fundId: number;
  groupId: string;
  fundName: string;
  balance: string; // BigDecimal → string
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFundRequest {
  groupId: string;
  fundName: string;
  initialBalance?: string;
}

export interface DepositRequest {
  amount: string;
  gateway: 'MOMO' | 'VNPAY';
}

export interface MomoPaymentResponse {
  requiresMomoPayment: boolean;
  paymentUrl: string;
  cost?: never; // Không dùng ở đây
}