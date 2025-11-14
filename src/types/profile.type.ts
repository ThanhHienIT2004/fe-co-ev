// profile.type.ts
export interface ProfileDTO {
  profiles_id?: string;           // UUID của profile
  user_id?: string;               // UUID của user
  full_name?: string;
  phone_number?: string;
  address?: string;
  driver_license_number?: string;
  driver_license_expiry?: string; // YYYY-MM-DD
  license_image_url?: string;
}

// Dùng cho form React / UI
export interface UserProfile {
  id?: string;                     // user id
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  driverLicenseNumber?: string;
  driverLicenseExpiry?: string;
  licenseImageUrl?: string;
}

// Kiểu trả về từ useProfile hook
export interface UseProfileReturn {
  profile: ProfileDTO | null;
  isLoading: boolean;
  error: string;
  updateProfile: (dataToUpdate: Partial<ProfileDTO>) => Promise<ProfileDTO>;
  reloadProfile: () => void;
}
