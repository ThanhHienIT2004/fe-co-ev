export interface VehicleCost {
  costId: number;
  groupId: number;
  vehicleId?: number | string;
  fundId?: number;
  costName: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCostRequest {
  groupId: number;
  fundId?: number;
  vehicleId?: number;
  costName: string;
  amount: number;
}

export interface UpdateStatusRequest {
  status: 'pending' | 'paid' | 'cancelled';
}

export interface MomoPaymentResponse {
  requiresMomoPayment: boolean;
  paymentUrl: string;
}
