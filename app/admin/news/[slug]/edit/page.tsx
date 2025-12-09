"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNewsPost } from "@/lib/api-hooks";
import { useUpdateNews, useDeleteNews } from "@/lib/api-hooks-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const newsSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    excerpt: z.string().min(10),
    image: z.string().url().optional().or(z.literal("")),
});

type NewsFormData = z.infer<typeof newsSchema>;

export default function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = useState<string>("");
    const router = useRouter();
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);

    useEffect(() => {
        params.then(p => setSlug(p.slug));
    }, [params]);

    const { data: post, isLoading } = useNewsPost(slug);
    const updateMutation = useUpdateNews(slug);
    const deleteMutation = useDeleteNews();

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<NewsFormData>({
        resolver: zodResolver(newsSchema),
    });

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt || "",
                image: post.image || "",
            });
            setContent(post.content || "");
            setPublished(post.published || false);
        }
    }, [post, reset]);

    const onSubmit = async (data: NewsFormData) => {
        try {
            await updateMutation.mutateAsync({
                ...data,
                content,
                published,
            });
            router.push("/admin/news");
        } catch (error) {
            console.error("Failed to update news:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(slug);
            router.push("/admin/news");
        } catch (error) {
            console.error("Failed to delete news:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-64" />
                <Card>
                    <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-full" />)}
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/news">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Edit News Post</h1>
                        <p className="text-muted-foreground">{post.title}</p>
                    </div>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Post Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input id="title" {...register("title")} />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input id="slug" {...register("slug")} disabled />
                            {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt *</Label>
                            <Textarea id="excerpt" {...register("excerpt")} rows={3} />
                            {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Content *</Label>
                            <RichTextEditor content={content} onChange={setContent} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Featured Image</Label>
                            <ImageUpload
                                value={watch("image") || ""}
                                onChange={(url) => setValue("image", url)}
                            />
                            <input type="hidden" {...register("image")} />
                            {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="published"
                                checked={published}
                                onCheckedChange={setPublished}
                            />
                            <Label htmlFor="published" className="cursor-pointer">
                                Published
                            </Label>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Link href="/admin/news">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Post"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
