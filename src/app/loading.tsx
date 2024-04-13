import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[80%] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="w-[60%] h-[150px]" />
                <Skeleton className="h-4 w-[60%]" />
            </div>
        </div>
        )
}