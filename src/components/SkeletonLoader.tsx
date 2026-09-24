export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-[#E0E0E0] rounded-none mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-[#E0E0E0] rounded w-3/4" />
        <div className="h-2 bg-[#E0E0E0] rounded w-1/2" />
        <div className="h-3 bg-[#E0E0E0] rounded w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="h-screen bg-[#E0E0E0] animate-pulse" />
  );
}
