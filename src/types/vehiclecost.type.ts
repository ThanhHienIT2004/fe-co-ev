export interface VehicleCost {
  costId: number;
  groupId: number;
  userId? :number;
  vehicleId?: number;
  fundId?: number;
  costName: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

interface CreateCostRequest {
  title: string;        // ← BACKEND YÊU CẦU title
  amount: number;
  vehicleId?: number | string;
  description: string;
  costDate: string;
  groupId: number;
  status: 'pending' | 'paid' | 'cancelled';
}

export interface UpdateStatusRequest {
  status: 'pending' | 'paid' | 'cancelled';
}

export interface MomoPaymentResponse {
  requiresMomoPayment: boolean;
  paymentUrl: string;
}
