import { Skeleton } from "@/components/ui/skeleton";

const TabsSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-1.5">
      <div className={`grid grid-cols-4 gap-2 w-full`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="px-12 flex items-center justify-start relative">
            <Skeleton className="h-6 w-full rounded-md bg-gray-300" />
            <Skeleton
              className="h-6 w-6 absolute right-1.5 rounded-full bg-gray-300"
              style={{ display: "inline-block" }}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <Skeleton className="h-96 w-full rounded-md bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsSkeleton;
