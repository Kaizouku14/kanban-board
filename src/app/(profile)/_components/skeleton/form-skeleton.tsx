import { Skeleton } from "@/components/ui/skeleton";

const AccountFormSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-x-4">
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-10 w-40" />
    </div>
  );
};

export default AccountFormSkeleton;
