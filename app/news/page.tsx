"use client";

import { PageHeader } from "@/components/page-header";
import { BlogCard } from "@/components/blog-card";

import { useNews } from "@/lib/api-hooks";
import { BlogCardSkeleton } from "@/components/skeletons";

interface NewsItem {
    title: string;
    slug: string;
    excerpt: string;
    published: boolean;
    createdAt: string;
    image?: string;
}

export default function NewsPage() {
    const { data: news, isLoading, isError } = useNews();

    return (
        <>
            <PageHeader
                title="News & Insights"
                description="Stay updated with the latest happenings and tech trends from BuruujTech."
            />

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    {isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <BlogCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {isError && (
                        <div className="text-center py-12 text-destructive">
                            Failed to load news. Please try again later.
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {news?.filter((post: NewsItem) => post.published).map((newsItem: NewsItem) => (
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

                            {(!news || news.length === 0) && (
                                <div className="text-center py-12 text-muted-foreground">
                                    No news posts available yet.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
