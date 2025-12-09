"use client";

import { PageHeader } from "@/components/page-header";
import { ProgramCard } from "@/components/program-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import { usePrograms } from "@/lib/api-hooks";
import { ProgramCardSkeleton } from "@/components/skeletons";

export default function ProgramsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: programs, isLoading, isError } = usePrograms();

    const filteredPrograms = programs?.filter((prog: any) =>
        prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <>
            <PageHeader
                title="Our Programs"
                description="Launch your career with our industry-aligned technology courses."
            />

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto mb-12 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search programs..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <ProgramCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {isError && (
                        <div className="text-center py-12 text-destructive">
                            Failed to load programs. Please try again later.
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPrograms.map((program: any) => (
                                    <ProgramCard key={program.slug} {...program} />
                                ))}
                            </div>

                            {filteredPrograms.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground">
                                    No programs found matching your search.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
