"use client";

import { ProgramCard } from "./program-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePrograms } from "@/lib/api-hooks";
import { Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Program {
    slug: string;
    title: string;
    shortDescription: string;
    image?: string;
}

export function ProgramsGrid() {
    const { data: programs, isLoading } = usePrograms();
    const featuredPrograms = programs?.slice(0, 3) || [];

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Programs</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover our industry-aligned courses designed to launch your tech career.
                        </p>
                    </div>
                </ScrollReveal>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <ScrollReveal delay={0.2}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                {featuredPrograms.map((program: Program) => (
                                    <ProgramCard key={program.slug} {...program} />
                                ))}
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.4}>
                            <div className="text-center">
                                <Button size="lg" asChild>
                                    <Link href="/programs">View All Programs</Link>
                                </Button>
                            </div>
                        </ScrollReveal>
                    </>
                )}
            </div>
        </section>
    );
}
