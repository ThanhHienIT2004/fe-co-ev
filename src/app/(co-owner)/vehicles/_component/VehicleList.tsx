import VehicleCard from './VehicleCard';

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((v) => (
        <VehicleCard key={v.vehicle_id} vehicle={v} />
      ))}
    </div>
  );
}