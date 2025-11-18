// FE TYPE — tương ứng với NestJS DTO

export type GroupRole = "admin" | "member";

/* ================================================
   1. Tạo thành viên mới (admin tạo thủ công)
   ================================================ */
export interface CreateGroupMemberDto {
  group_id: number;
  user_id: number;
  group_role?: GroupRole;
  ownership_ratio?: number; // decimal max 2 digits
}

/* ================================================
   2. Thêm thành viên vào nhóm có sẵn
   ================================================ */
export interface AddGroupMemberDto {
  user_id: number;
  group_role?: GroupRole;
  ownership_ratio?: number;
}

/* ================================================
   3. Cập nhật thành viên
   ================================================ */
export interface UpdateGroupMemberDto {
  group_role?: GroupRole;
  ownership_ratio?: number;
}

/* ================================================
   4. Response trả về cho FE (populate user)
   ================================================ */
export interface GroupMemberResponseDto {
  member_id: number;
  group_id: number;
  user_id: number;
  group_role: GroupRole;
  ownership_ratio: number;
  created_at: string; // FE nhận ISO string từ API

  user?: {
    user_id: number;
    name: string;
    email: string;
    phone?: string | null;
    avatar?: string | null;
  };

  group?: {
    group_id: number;
    group_name: string;
  };
}
