
import { getVehicles } from '@/libs/apis/api';
import { notFound } from 'next/navigation';
import VehicleDetail from '../_component/VehicleDetail';

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((v) => ({ id: v.vehicle_id }));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const vehicles = await getVehicles();
  const vehicle = vehicles.find((v) => v.vehicle_id === params.id);

  if (!vehicle) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <VehicleDetail vehicle={vehicle} />
      </div>
    </main>
  );
}