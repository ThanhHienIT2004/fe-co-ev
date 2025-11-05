type Vehicle = {
  vehicle_id: string;
  vehicle_name: string;
  license_plate: string;
  description: string;
  image_url: string | null;
  spec_image_urls: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};