export interface User {
  userId: number;
  role_id: number;
  email: string;
  password: string;
  is_verified: boolean;
  isDeleted: boolean;
  createdAt: string;
}