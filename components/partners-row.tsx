"use client";

import { usePartners } from "@/lib/api-hooks";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Partner {
    id: number;
    name: string;
    logoUrl: string;
}

export function PartnersRow() {
    const { data: partners, isLoading } = usePartners();

    if (isLoading) {
        return (
            <section className="py-12 md:py-16 border-t">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                        Trusted by Industry Leaders
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-12 w-32" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!partners || partners.length === 0) {
        return null;
    }

    return (
        <section className="py-12 md:py-16 border-t">
            <div className="container mx-auto px-4 text-center">
                <ScrollReveal>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                        Our Partners
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {partners.map((partner: Partner) => (
                            <div key={partner.id} className="relative h-24 w-48">
                                {partner.logoUrl ? (
                                    <Image
                                        src={partner.logoUrl}
                                        alt={partner.name}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-muted-foreground font-semibold">
                                        {partner.name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
