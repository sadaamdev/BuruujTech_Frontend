"use client";

import { PageHeader } from "@/components/page-header";
import { Lightbox } from "@/components/lightbox";
import { useState } from "react";
import Image from "next/image";
import { useGallery } from "@/lib/api-hooks";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { data: galleryItems, isLoading, isError } = useGallery();

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    // Transform gallery items to lightbox format
    const lightboxImages = galleryItems?.map((item: { imageUrl: string; title?: string }) => ({
        src: item.imageUrl,
        alt: item.title || 'Gallery Image'
    })) || [];

    return (
        <>
            <PageHeader
                title="Our Gallery"
                description="Capturing moments from our vibrant community events, workshops, and campus life."
            />

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    {isLoading && (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {isError && (
                        <div className="text-center py-12 text-destructive">
                            Failed to load gallery. Please try again later.
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <>
                            {galleryItems && galleryItems.length > 0 ? (
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                                    {galleryItems.map((item: { id: number; imageUrl: string; title?: string; category?: string }, index: number) => (
                                        <div
                                            key={item.id}
                                            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl"
                                            onClick={() => openLightbox(index)}
                                        >
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title || `Gallery Image ${index + 1}`}
                                                width={600}
                                                height={400}
                                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                                                {item.title || 'View Image'}
                                            </div>
                                            {item.category && (
                                                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                                                    {item.category}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    No gallery items available yet.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {lightboxImages.length > 0 && (
                <Lightbox
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                    images={lightboxImages}
                    initialIndex={currentImageIndex}
                />
            )}
        </>
    );
}
