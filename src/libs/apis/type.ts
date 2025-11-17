// src/lib/apis/type.ts
export interface User {
  userId: number;
  email: string;
  role_id: number;         
  password?: string;         
  isVerified: boolean;     
  isDeleted: boolean;      
  createdAt: string;         
}

export interface ProfileDTO {
  profiles_id?: string;
  user_id?: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
  driver_license_number?: string;
  driver_license_expiry?: string;
  license_image_url?: string;
}