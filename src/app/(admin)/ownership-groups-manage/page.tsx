// app/admin/ownership-groups/page.tsx
"use client";
import { useOwnershipGroups, useDeleteOwnershipGroup } from '@/libs/hooks/useOwnershipGroups';
import EmptyState from './_components/EmptyState';
import ErrorState from './_components/ErrorState';
import FloatingActionButton from './_components/FloatingActionButton';
import GroupCard from './_components/GroupCard';
import GroupCardSkeleton from './_components/GroupCardSkeleton';
import OwnershipGroupsHero from './_components/OwnershipGroupsHero';
import { useGroupMemberCount } from '@/libs/hooks/useGroupMembers';
import { useParams } from 'next/navigation';

export default function OwnershipGroupsPage() {
  const { groups, isLoading, error } = useOwnershipGroups();
  const { deleteGroup, isPending } = useDeleteOwnershipGroup();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-teal-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <GroupCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error.message} />;

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-cyan-50">
      <OwnershipGroupsHero groups={groups} />

      <div className="max-w-7xl mx-auto px-6 -mt-10 pb-24">
        {groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <GroupCard
                key={group.group_id}
                group={group}
                onDelete={deleteGroup}
                isPending={isPending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}