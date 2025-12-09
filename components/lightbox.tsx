"use client";

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    images: { src: string; alt: string }[];
    initialIndex: number;
}

export function Lightbox({ isOpen, onClose, images, initialIndex }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    // Visually hidden title for accessibility
    const title = images[currentIndex]?.alt || "Gallery Image";

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 overflow-hidden flex items-center justify-center">
                <DialogTitle className='sr-only'>{title}</DialogTitle>
                <div className="relative w-full h-[80vh] flex items-center justify-center">

                    <Button variant="ghost" size="icon" className="absolute right-0 top-0 text-white hover:bg-white/20 z-50 rounded-full" onClick={onClose}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50 rounded-full h-12 w-12" onClick={prevImage}>
                        <ChevronLeft className="h-8 w-8" />
                        <span className="sr-only">Previous</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50 rounded-full h-12 w-12" onClick={nextImage}>
                        <ChevronRight className="h-8 w-8" />
                        <span className="sr-only">Next</span>
                    </Button>

                    {images[currentIndex] && (
                        <div className="relative w-full h-full">
                            <Image
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
