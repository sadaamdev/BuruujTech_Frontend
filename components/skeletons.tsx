import { Skeleton } from "@/components/ui/skeleton";

export function ProgramCardSkeleton() {
    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex items-center justify-between pt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>
        </div>
    );
}

export function BlogCardSkeleton() {
    return (
        <div className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-24 mt-4" />
            </div>
        </div>
    );
}

export function GalleryItemSkeleton() {
    return <Skeleton className="w-full h-64 rounded-xl" />;
}
