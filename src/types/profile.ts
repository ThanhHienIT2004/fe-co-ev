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
export interface ProfileDTO {
  userId: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  driverLicenseNumber: string;
  driverLicenseExpiry: string; // format YYYY-MM-DD
  licenseImageUrl: string | null;
}

export interface ProfileResponse extends ProfileDTO {
  id: number;
  createdAt: string;
  updatedAt: string;
}