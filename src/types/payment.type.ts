// src/types/payment.type.ts
export type PaymentStatus = 'pending' | 'completed' | 'failed';
export type PaymentGateway = 'MOMO' | 'VNPAY';

export interface Payment {
  paymentId: number;
  groupId: string;
  userId: string;
  fundId: number;
  amount: string;
  gateway: PaymentGateway;
  gatewayOrderId: string;
  status: PaymentStatus;
  gatewayResponse?: string;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
}