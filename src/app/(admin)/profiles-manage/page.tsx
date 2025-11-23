"use client";

import React, { useState } from "react";
import { useAdminProfiles } from "@/libs/hooks/useProfile";
import AdminProfilesHeader from "./_components/AdminProfilesHeader";
import AdminProfilesSearchBar from "./_components/AdminProfilesSearchBar";
import AdminProfilesTable from "./_components/AdminProfilesTable";
import PaginationControls from "./_components/PaginationControls";
import ProfileDetailModal from "./_components/ProfileDetailModal";

export default function AdminProfilesPage() {
  const { profiles, loading, error, searchTerm, setSearchTerm, refetch } = useAdminProfiles();

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  const paginatedProfiles = profiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-white">
      <AdminProfilesHeader total={profiles.length} />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <AdminProfilesSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          refetch={refetch}
        />

        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <AdminProfilesTable 
            profiles={paginatedProfiles} 
            onSelect={setSelectedProfile} />

            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={profiles.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}
      </div>  

      <ProfileDetailModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
    </div>
  );
}
