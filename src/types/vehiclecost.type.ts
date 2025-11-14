// src/types/vehiclecost.type.ts
export interface VehicleCost {
  costId: number;
  groupId: string;
  fundId?: number;
  vehicleId?: string;
  costName: string;
  amount: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCostRequest {
  groupId: string;
  fundId?: number;
  vehicleId?: string;
  costName: string;
  amount: string;
}

export interface UpdateStatusRequest {
  status: 'pending' | 'paid' | 'cancelled';
}

export interface MomoPaymentResponse {
  requiresMomoPayment: boolean;
  paymentUrl: string;
}