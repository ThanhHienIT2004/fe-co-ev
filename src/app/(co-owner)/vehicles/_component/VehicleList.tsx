// components/VehicleList.tsx
import { Vehicle } from '@/types/vehicles.type';
import VehicleCard from './VehicleCard';

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((v) => (
        <VehicleCard key={v.vehicle_id} vehicle={v} />
      ))}
    </div>
  );
}