"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGallery } from "@/lib/api-hooks";
import { Skeleton } from "@/components/ui/skeleton";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface GalleryItem {
    id: number;
    imageUrl: string;
    title?: string;
}

export function GalleryPreview() {
    const { data: galleryItems, isLoading } = useGallery();

    if (isLoading) {
        return (
            <section className="py-12 md:py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Life at BuruujTech</h2>
                        <Skeleton className="h-4 w-64 mx-auto" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Skeleton className="col-span-2 row-span-2 h-[400px] rounded-lg" />
                        <Skeleton className="h-[196px] rounded-lg" />
                        <Skeleton className="h-[196px] rounded-lg" />
                        <Skeleton className="h-[196px] rounded-lg" />
                        <Skeleton className="h-[196px] rounded-lg" />
                    </div>
                </div>
            </section>
        );
    }

    const displayImages = galleryItems?.slice(0, 5) || [];

    if (displayImages.length === 0) return null;

    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Life at BuruujTech</h2>
                        <p className="text-muted-foreground">A glimpse into our vibrant community and facilities.</p>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {displayImages.map((item: GalleryItem, i: number) => (
                            <div
                                key={item.id}
                                className={`relative overflow-hidden rounded-lg ${i === 0 ? 'col-span-2 row-span-2 h-[400px]' : 'col-span-1 row-span-1 h-[196px]'} hover:opacity-90 transition-opacity`}
                            >
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title || "Gallery image"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                                        <span className="font-medium">No Image</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={0.4}>
                    <div className="text-center">
                        <Button variant="outline" asChild>
                            <Link href="/gallery">View Full Gallery</Link>
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
