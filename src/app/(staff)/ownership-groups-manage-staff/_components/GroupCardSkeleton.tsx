// app/admin/ownership-groups/components/GroupCardSkeleton.tsx
export default function GroupCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl overflow-hidden animate-pulse">
      <div className="h-64 bg-linear-to-br from-gray-200 to-gray-300"></div>
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded-xl w-4/5"></div>
        <div className="h-5 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
      </div>
    </div>
  );
}