// app/service-tasks/_components/LoadingSkeleton.tsx
export default function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/30 animate-pulse"
        >
          {/* Header (icon + title) */}
          <div className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-300 rounded-xl w-24" />
              <div className="h-4 bg-gray-200 rounded-lg w-16" />
            </div>
            <div className="w-20 h-6 bg-gray-200 rounded-full" />
          </div>

          {/* Body */}
          <div className="px-6 pb-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
            <div className="h-4 bg-gray-200 rounded-lg w-4/6" />
          </div>

          {/* Footer buttons */}
          <div className="flex gap-2 p-6 pt-0">
            <div className="flex-1 h-10 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-xl" />
            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}