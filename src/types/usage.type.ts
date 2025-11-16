// types/usage.type.ts

// types/usage.type.ts

export interface UsageRecord {
  usage_id: number;
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  start_date: string;       // ISO date string
  end_date: string;         // ISO date string
  check_in_time?: string | null;
  check_out_time?: string | null;
  vehicle_condition?: string | null;
  distance?: number | null;
  record_time?: string;     // ISO datetime string
}

export interface CreateUsageDto {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  start_date: string;
  end_date: string;
  check_in_time?: string;
  check_out_time?: string;
  vehicle_condition?: string;
  distance?: number;
}

export interface UpdateUsageDto {
  start_date?: string;
  end_date?: string;
  check_in_time?: string;
  check_out_time?: string;
  vehicle_condition?: string;
  distance?: number;
}
