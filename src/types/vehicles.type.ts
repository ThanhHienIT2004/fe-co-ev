export interface Vehicle {
  vehicle_id: number;
  vehicle_name: string;
  license_plate: string;
  description: string;
  image_url: string | null;
  spec_image_urls: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleFormData {
  vehicle_name: string;
  license_plate: string;
  description: string;
  image?: File | null;
  spec_images?: File[] | null;
}

export interface UpdateVehicleFormData extends CreateVehicleFormData {
  spec_image_urls?: string[];
}