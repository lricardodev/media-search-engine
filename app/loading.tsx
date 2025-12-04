export default function Loading() {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Hero Skeleton */}
      <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse mb-12"></div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[2/3] bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
