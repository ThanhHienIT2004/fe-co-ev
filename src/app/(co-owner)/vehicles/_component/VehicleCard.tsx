import Image from 'next/image';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
      {vehicle.image_url ? (
        <Image
          src={vehicle.image_url}
          alt={vehicle.vehicle_name}
          width={400}
          height={200}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-md w-full h-48" />
      )}

      <h3 className="mt-4 text-xl font-bold">{vehicle.vehicle_name}</h3>
      <p className="text-2xl font-mono text-blue-600">
        {vehicle.license_plate}
      </p>
      <p className="text-gray-600 mt-2">{vehicle.description}</p>

      <div className="mt-4 flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          vehicle.is_active
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {vehicle.is_active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
        </span>
      </div>
    </div>
  );
}