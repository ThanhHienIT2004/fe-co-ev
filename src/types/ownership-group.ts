// types/ownership-group.ts
export interface CreateOwnershipGroupDto {
  group_name: string;
  vehicle_id: string;
  created_by: string;
}

export interface OwnershipGroupResponseDto {
  group_id: string;
  group_name: string;
  vehicle_id: string;
  created_by: string;
  created_at: string; // ISO string
  updated_at: string;
  // Dữ liệu mở rộng (nếu API trả thêm)
  member_count?: number;
  vehicle_name?: string;
  created_by_name?: string;
}