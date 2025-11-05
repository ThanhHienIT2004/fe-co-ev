
import { getVehicles } from '@/libs/apis/api';
import { Suspense } from 'react';
import VehicleList from './_component/VehicleList';

export const metadata = {
  title: 'Danh sách xe VinFast',
};

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">Danh sách xe</h1>
      <p className="text-gray-600 mb-8">
        Tổng cộng: <strong>{vehicles.length}</strong> xe
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <VehicleList vehicles={vehicles} />
      </Suspense>
    </main>
  );
}