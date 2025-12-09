"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateNews } from "@/lib/api-hooks-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const newsSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
    image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type NewsFormData = z.infer<typeof newsSchema>;

export default function CreateNewsPage() {
    const router = useRouter();
    const createMutation = useCreateNews();
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<NewsFormData>({
        resolver: zodResolver(newsSchema),
    });



    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setValue("slug", generateSlug(newTitle));
    };

    const onSubmit = async (data: NewsFormData) => {
        try {
            await createMutation.mutateAsync({
                ...data,
                content,
                published,
            });
            router.push("/admin/news");
        } catch (error) {
            console.error("Failed to create news:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin/news">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Create News Post</h1>
                    <p className="text-muted-foreground">Write a new article or blog post</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Post Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                {...register("title")}
                                onChange={(e) => {
                                    register("title").onChange(e);
                                    onTitleChange(e);
                                }}
                                placeholder="Exciting News from BuruujTech"
                            />
                            {errors.title && (
                                <p className="text-sm text-destructive">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                {...register("slug")}
                                placeholder="exciting-news-from-buruujtech"
                            />
                            {errors.slug && (
                                <p className="text-sm text-destructive">{errors.slug.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt *</Label>
                            <Textarea
                                id="excerpt"
                                {...register("excerpt")}
                                placeholder="A brief summary of the post..."
                                rows={3}
                            />
                            {errors.excerpt && (
                                <p className="text-sm text-destructive">{errors.excerpt.message}</p>
                            )}
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
                            {errors.image && (
                                <p className="text-sm text-destructive">{errors.image.message}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="published"
                                checked={published}
                                onCheckedChange={setPublished}
                            />
                            <Label htmlFor="published" className="cursor-pointer">
                                Publish immediately
                            </Label>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Link href="/admin/news">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={createMutation.isPending}>
                                {createMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    published ? "Publish Post" : "Save Draft"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
