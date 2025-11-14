"use client";
import { Profile } from '@/types/profile';

interface ProfileTableProps {
  profiles: Profile[];
}

export default function ProfileTable({ profiles }: ProfileTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">User ID</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Full Name</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Phone</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Address</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">License Number</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Expiry</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">Image URL</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.profiles_id} className="border-t">
              <td className="px-4 py-2 font-medium text-gray-900">{profile.profiles_id}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{profile.user_id}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{profile.full_name}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{profile.phone_number}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{profile.address}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{profile.driver_license_number}</td>
              <td className="px-4 py-2 font-medium text-gray-900">{profile.driver_license_expiry}</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                <a href={profile.license_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Image
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}