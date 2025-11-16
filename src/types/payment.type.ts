// src/types/payment.type.ts
export interface Payment {
  paymentId: number;
  groupId: string;
  userId: string;
  fundId: number;
  amount: string;
  gateway: 'MOMO' | 'VNPAY';
  gatewayOrderId: string;
  status: 'pending' | 'completed' | 'failed';
  gatewayResponse?: string;
  paymentDate?: string;
}