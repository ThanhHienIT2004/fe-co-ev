// src/libs/types/user.ts
export interface User {
  userId: number;
  role_id: number;
  email: string;
  password: string;
  isVerified: boolean;
  deleted: boolean;
  createdAt: string;
}