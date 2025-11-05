export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-6 animate-pulse">
          <div className="bg-gray-300 h-48 rounded-md" />
          <div className="mt-4 h-6 bg-gray-300 rounded w-3/4" />
          <div className="mt-2 h-8 bg-gray-300 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}