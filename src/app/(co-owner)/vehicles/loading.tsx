export default function Loading() {
  return (
    <main className="mx-auto mt-[64px] px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Danh sách xe đồng sở hữu
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white shadow-md rounded-xl overflow-hidden animate-pulse">
            <div className="h-52 bg-gray-200" />
            <div className="p-5">
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}