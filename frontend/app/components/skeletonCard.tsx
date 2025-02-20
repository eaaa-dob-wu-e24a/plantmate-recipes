import { Skeleton } from "../components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="w-full h-48 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}
