// Thêm 2 import này
import { ProfileDTO, UserProfile } from "@/types/profile.type"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// === HÀM MAPPER MỚI ===
// Chuyển đổi dữ liệu từ API (snake_case) sang UI (camelCase)
const mapDtoToProfile = (dto: ProfileDTO, email?: string): UserProfile => {
  return {
    id: dto.user_id,
    name: dto.full_name,
    email: email, // Email sẽ được lấy từ session ở hook
    phone: dto.phone_number,
    address: dto.address,
    driverLicenseNumber: dto.driver_license_number,
    driverLicenseExpiry: dto.driver_license_expiry,
    licenseImageUrl: dto.license_image_url,
  };
};

// Chuyển đổi dữ liệu từ UI (camelCase) sang API (snake_case)
const mapProfileToDto = (profile: Partial<UserProfile>): Partial<ProfileDTO> => {
  return {
    full_name: profile.name,
    phone_number: profile.phone,
    address: profile.address,
    driver_license_number: profile.driverLicenseNumber,
    driver_license_expiry: profile.driverLicenseExpiry,
    license_image_url: profile.licenseImageUrl,
  };
};
// === KẾT THÚC HÀM MAPPER ===

// Cập nhật hàm fetchProfileApi
export const fetchProfileApi = async (userId: string, email?: string): Promise<UserProfile> => { // Sửa type
  const res = await fetch(`${API_URL}/user/users/${userId}/profile`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData || "Không thể tải thông tin hồ sơ.");
  }
  const data: ProfileDTO = await res.json(); // Nhận DTO
  return mapDtoToProfile(data, email); // Trả về UserProfile
};

// Cập nhật hàm updateProfileApi
export const updateProfileApi = async (userId: string, dataToUpdate: Partial<UserProfile>): Promise<UserProfile> => { // Sửa type
  
  const dtoData = mapProfileToDto(dataToUpdate); // Chuyển sang DTO
  
  const res = await fetch(`${API_URL}/user/users/${userId}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dtoData), // Gửi DTO
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData || "Cập nhật thất bại.");
  }

  const data: ProfileDTO = await res.json(); // Nhận DTO
  return mapDtoToProfile(data); // Trả về UserProfile
};