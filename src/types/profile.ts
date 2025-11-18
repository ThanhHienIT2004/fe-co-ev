// src/types/profile.ts
export interface Profile {
  userId: number;
  email: string;
  role: "Admin" | "User";
  full_name: string | null;
  phone_number: string | null;
  address: string | null;
  driver_license_number: string | null;
  driver_license_expiry: string | null;
  license_image_url: string | null;
  createdAt: string;
}

// Dùng riêng cho trang cá nhân (user tự sửa profile)
export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  driverLicenseNumber?: string;
  driverLicenseExpiry?: string;
  licenseImageUrl?: string;
}
// types/profile.ts
export type ProfileDTO = {
  userId: number;
  full_name: string;
  phone_number: string;
  address: string;
  driver_license_number: string;
  driver_license_expiry: string; // format: YYYY-MM-DD
  license_image_url: string;     // URL ảnh GPLX (có thể là 1 hoặc 2 ảnh, phân cách bằng dấu phẩy)
};