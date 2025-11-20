// src/types/adminProfile.ts
export interface AdminProfileResponse {
  profileId: number;
  userId: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  driverLicenseNumber: string;
  driverLicenseExpiry: string; // YYYY-MM-DD
  licenseImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}