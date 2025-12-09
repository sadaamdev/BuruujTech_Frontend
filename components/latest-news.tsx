"use client";

import { BlogCard } from "./blog-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useNews } from "@/lib/api-hooks";
import { Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface NewsItem {
    slug: string;
    title: string;
    excerpt: string;
    createdAt: string;
    image?: string;
    published: boolean;
}

export function LatestNews() {
    const { data: news, isLoading } = useNews();
    const latestNews = news?.filter((post: NewsItem) => post.published).slice(0, 3) || [];

    return (
        <section className="bg-muted/30 py-12 md:py-16">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h2 className="text-3xl font-bold tracking-tight mb-2">Latest News & Updates</h2>
                            <p className="text-muted-foreground">Stay informed about what&apos;s happening at BuruujTech</p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/news">View All News</Link>
                        </Button>
                    </div>
                </ScrollReveal>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <ScrollReveal delay={0.2}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {latestNews.map((newsItem: NewsItem) => (
                                <BlogCard
                                    key={newsItem.slug}
                                    title={newsItem.title}
                                    slug={newsItem.slug}
                                    excerpt={newsItem.excerpt}
                                    date={new Date(newsItem.createdAt).toLocaleDateString()}
                                    image={newsItem.image}
                                />
                            ))}
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </section>
    );
}
