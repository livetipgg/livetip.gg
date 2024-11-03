import { Skeleton } from "@/components/ui/skeleton";

export const MessageSkeleton = () => {
  return (
    <div
      className={
        "flex flex-col md:flex-row w-full items-start md:items-center justify-between border p-4 rounded-lg mt-4 relative bg-card-custom"
      }
    >
      <Skeleton className="h-4 w-4 mb-5 md:mb-0" />
      <div className="flex-1 ml-0 md:ml-5">
        <Skeleton className="w-24 h-4  rounded-full animate-pulse" />
        <Skeleton className="w-36 h-4 mt-2 rounded-full animate-pulse" />
      </div>
      <div className="flex w-full my-10 md:mx-10 md:my-0">
        <Skeleton className="h-4 w-60 mr-2" />
      </div>{" "}
      <Skeleton className="w-24 h-4 rounded-full animate-pulse" />
    </div>
  );
};
