import { Vehicle } from "./vehicles.type";

// types/ownership-group.ts
export interface CreateOwnershipGroupDto {
  group_name: number;
  vehicle_id: number;
  created_by: number;
}

export interface OwnershipGroupResponseDto {
  group_id: number;
  group_name: string;
  vehicle_id: number;
  created_by: number;
  created_at: string; // ISO string
  updated_at: string;
  // Dữ liệu mở rộng (nếu API trả thêm)
  member_count?: number;
  vehicle_name?: string;
  created_by_name?: string;
  vehicle?: Vehicle;

}

export type OwnershipGroup = {
  group_id: number;
  group_name: string;
  created_at: string;
  created_by: number;
  vehicle?: Vehicle;
};