"use client";

import { useNewsPost } from "@/lib/api-hooks";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function NewsDetailClient({ slug }: { slug: string }) {
    const { data: post, isLoading, isError } = useNewsPost(slug);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                <p className="text-muted-foreground mb-8">The news post you&apos;re looking for doesn&apos;t exist.</p>
                <Button asChild>
                    <Link href="/news">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to News
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <article className="min-h-screen pb-20">
            <div className="bg-muted py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={[
                        { label: "News", href: "/news" },
                        { label: post.title }
                    ]} />
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4" /> Admin
                        </div>
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" /> {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        {post.published && (
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Tag className="h-3 w-3" /> Published
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                {post.image && (
                    <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-12">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                    {post.excerpt && (
                        <p className="lead text-xl text-muted-foreground mb-8">
                            {post.excerpt}
                        </p>
                    )}
                    <div className="whitespace-pre-line">
                        {post.content}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto mt-12 pt-8 border-t">
                    <div className="flex justify-between items-center">
                        <Link href="/news" className="text-primary hover:underline">
                            ← Back to all news
                        </Link>
                        <Link href="/contact" className="text-primary hover:underline">
                            Contact us →
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
