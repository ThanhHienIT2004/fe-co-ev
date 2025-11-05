// app/vehicles/page.tsx

import { getVehicles } from "@/libs/apis/api";
import VehicleList from "./_component/VehicleList";

export default async function Page() {
  const vehicles = await getVehicles();

  return (
    <main className="mx-auto mt-[64px] px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Danh sách xe đồng sở hữu
      </h1>
      <VehicleList vehicles={vehicles} />
    </main>
  );
}