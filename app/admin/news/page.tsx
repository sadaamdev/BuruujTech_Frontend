"use client";

import { useNews } from "@/lib/api-hooks";
import { useDeleteNews } from "@/lib/api-hooks-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function NewsListPage() {
    const { data: news, isLoading } = useNews();
    const deleteMutation = useDeleteNews();
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

    const filteredNews = news?.filter((post: any) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = async () => {
        if (deleteSlug) {
            await deleteMutation.mutateAsync(deleteSlug);
            setDeleteSlug(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">News & Blog</h1>
                    <p className="text-muted-foreground">Manage your news posts and articles</p>
                </div>
                <Link href="/admin/news/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Post
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {isLoading ? (
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-2/3" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredNews.map((post: any) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CardTitle>{post.title}</CardTitle>
                                            <Badge variant={post.published ? "default" : "secondary"}>
                                                {post.published ? "Published" : "Draft"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {post.excerpt}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link href={`/admin/news/${post.slug}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDeleteSlug(post.slug)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}

                    {filteredNews.length === 0 && (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground">
                                No posts found
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            <AlertDialog open={!!deleteSlug} onOpenChange={() => setDeleteSlug(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
