import LoadingSpinner from "../LoadingSpinner";

export default function StatsCardSkeleton() {
  return (
    <div className="flex-1 bg-gradient-to-b from-accent-dark to-accent-subtle py-4 px-4 rounded-xl h-[120px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
