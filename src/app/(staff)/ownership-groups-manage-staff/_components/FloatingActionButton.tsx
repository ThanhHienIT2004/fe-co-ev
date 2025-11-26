// app/admin/ownership-groups/components/FloatingActionButton.tsx
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function FloatingActionButton() {
  return (
    <Link
      href="/ownership-groups-manage/create"
      className="fixed bottom-8 right-8 bg-teal-600 text-white p-5 rounded-full shadow-2xl hover:shadow-teal-600/50 transition-all hover:scale-110 z-50 lg:hidden"
    >
      ooooooo
      <Plus className="w-8 h-8" />
    </Link>
  );
} 