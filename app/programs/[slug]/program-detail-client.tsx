"use client";

import { useProgram } from "@/lib/api-hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, Clock, Calendar, BarChart, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function ProgramDetailClient({ slug }: { slug: string }) {
    const { data: program, isLoading, isError } = useProgram(slug);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !program) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
                <p className="text-muted-foreground mb-8">The program you're looking for doesn't exist.</p>
                <Button asChild>
                    <Link href="/programs">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Programs
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="relative bg-muted/30 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Breadcrumbs items={[
                            { label: "Programs", href: "/programs" },
                            { label: program.title }
                        ]} />
                        <Badge className="mb-4">Featured Program</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{program.title}</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {program.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-6 mb-8 text-sm font-medium">
                            <div className="flex items-center"><Clock className="mr-2 h-5 w-5 text-primary" /> 6 Months Duration</div>
                            <div className="flex items-center"><Calendar className="mr-2 h-5 w-5 text-primary" /> Next Intake: Feb 2025</div>
                            <div className="flex items-center"><BarChart className="mr-2 h-5 w-5 text-primary" /> Certificate Included</div>
                        </div>
                        <Button size="lg">Apply for This Program</Button>
                    </div>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {program.image && (
                            <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div>
                            <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {program.fullDescription}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <CheckCircle2 className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Master advanced techniques and best practices</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle2 className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Build real-world projects for your portfolio</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle2 className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Work with industry-standard tools and frameworks</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle2 className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Gain hands-on experience through practical exercises</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
                            <div className="space-y-4">
                                <div className="border rounded-lg p-4 bg-muted/10">
                                    <h3 className="font-semibold mb-2">Module 1: Foundations</h3>
                                    <p className="text-sm text-muted-foreground">Introduction to core concepts and setting up your environment.</p>
                                </div>
                                <div className="border rounded-lg p-4 bg-muted/10">
                                    <h3 className="font-semibold mb-2">Module 2: Advanced Topics</h3>
                                    <p className="text-sm text-muted-foreground">Deep dive into complex architectures and patterns.</p>
                                </div>
                                <div className="border rounded-lg p-4 bg-muted/10">
                                    <h3 className="font-semibold mb-2">Module 3: Capstone Project</h3>
                                    <p className="text-sm text-muted-foreground">Build a real-world application to showcase your skills.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-muted p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-4">Program Requirements</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                {program.requirements && program.requirements.length > 0 ? (
                                    program.requirements.map((req: string, index: number) => (
                                        <li key={index}>{req}</li>
                                    ))
                                ) : (
                                    <>
                                        <li>Basic understanding of computer operations</li>
                                        <li>High school diploma or equivalent</li>
                                        <li>Personal laptop (Core i5, 8GB RAM recommended)</li>
                                        <li>Commitment of 15 hours/week</li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl text-center">
                            <h3 className="font-bold text-lg mb-2">Need Guidance?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Talk to our admissions team to find the right path for you.
                            </p>
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
