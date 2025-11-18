// app/admin/ownership-groups/components/OwnershipGroupsHero.tsx
import Link from 'next/link';
import { Plus, Users } from 'lucide-react';
import { OwnershipGroup } from '@/types/ownership-group';

type Props = {
  groups: OwnershipGroup[];
};

export default function OwnershipGroupsHero({ groups }: Props) {
  const totalMembers = groups.reduce((acc, g) => acc + (g.member_count || 4), 0);

  return (
    <div className="bg-linear-to-r from-teal-600 to-cyan-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight flex items-center gap-4">
              <Users className="w-14 h-14" />
              Quản lý nhóm đồng sở hữu
            </h1>
            <p className="text-xl mt-4 opacity-95">
              {groups.length} nhóm • {totalMembers} thành viên
            </p>
          </div>
          <Link
            href="/ownership-groups/create"
            className="group flex items-center gap-3 bg-white text-teal-600 font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-cyan-300 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
            Tạo nhóm mới
          </Link>
        </div>
      </div>
    </div>
  );
}