import { notFound } from 'next/navigation';
import VehicleDetail from '../_component/VehicleDetail';


export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <div className="bg-white shadow-xl overflow-hidden">
        <VehicleDetail/>
      </div>
    </main>
  );
}