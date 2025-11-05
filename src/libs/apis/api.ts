import { Vehicle } from "@/types/vehicles.type";

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch('http://localhost:3001/vehicles', {
    next: { revalidate: 60 }, // cache 60 giây
  });

  if (!res.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  return res.json();
}