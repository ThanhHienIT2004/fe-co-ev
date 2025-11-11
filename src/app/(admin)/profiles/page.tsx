"use client";

import { useEffect, useState } from "react";
import { fetchProfiles } from "@/app/utils/api";
import ProfileTable from "../_component/ProfileTable";
import { Profile } from "@/types/profile";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfiles() {
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, []);

  if (loading) return <p className="p-4 font-medium text-gray-700">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Quản lý Profile</h1>
      {profiles.length > 0 ? (
         <ProfileTable profiles={profiles} />
      ) : (
        <p className="p-4 font-medium text-gray-700">Không tìm thấy profile nào.</p>
      )}
    </div>
  );
}