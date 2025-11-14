// lib/types/booking.type.ts
export enum BookingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export type Booking = {
  booking_id: string;
  user_id: string;
  vehicle_id: string;
  start_date: string; // ISO string
  end_date: string;
  check_in_time: string;
  check_out_time: string;
  booking_status: BookingStatus;
  cancel_reason?: string;
  created_at?: string;
  updated_at?: string;
};

export type CreateBookingDto = {
  user_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  check_in_time: string;
  check_out_time: string;
};

export type UpdateBookingDto = Partial<{
  start_date: string;
  end_date: string;
  check_in_time: string;
  check_out_time: string;
  booking_status: BookingStatus ;
  cancel_reason: string;
}>;