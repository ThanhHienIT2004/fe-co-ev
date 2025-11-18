// app/ownership-groups/[groupId]/add-member/page.tsx
"use client";

import { useParams, usePathname } from 'next/navigation';
import { ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AddMemberForm from '../../_component/AddMemberForm';

export default function AddMemberPage() {
  const params = useParams();
  const pathname = usePathname();

  // Parse groupId thành number
  const groupId = (() => {
    const idStr = (params?.groupId as string) || 
                  pathname.match(/\/([^/]+)\/add-member/)?.[1] || '';
    const id = parseInt(idStr, 10);
    return isNaN(id) ? null : id;
  })();

  if (groupId === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <Link href="/ownership-groups" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-4">
            <ArrowLeft className="w-5 h-5" /> Quay lại
          </Link>
          <h1 className="text-4xl font-black text-gray-900 flex items-center gap-4">
            <UserPlus className="w-12 h-12 text-teal-600" /> Thêm thành viên mới
          </h1>
          <p className="text-gray-600 mt-2">
            Nhóm ID: <code className="bg-gray-200 px-3 py-1 rounded font-mono">{groupId}</code>
          </p>
        </div>

        <AddMemberForm groupId={groupId} />
      </div>
    </div>
  );
}