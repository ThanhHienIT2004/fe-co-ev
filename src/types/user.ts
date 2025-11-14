export interface User {
  user_id: string;
  email: string;
  role_id: number;
  password: string;
  is_verified: boolean;
  isDeleted: boolean;
  created_at: string;
}