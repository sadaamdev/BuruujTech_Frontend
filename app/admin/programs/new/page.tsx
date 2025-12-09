"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProgram } from "@/lib/api-hooks-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";

const programSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
    fullDescription: z.string().min(20, "Full description must be at least 20 characters"),
    image: z.string().optional().or(z.literal("")),
});

type ProgramFormData = z.infer<typeof programSchema>;

export default function CreateProgramPage() {
    const router = useRouter();
    const createMutation = useCreateProgram();
    const [requirements, setRequirements] = useState<string[]>([""]);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProgramFormData>({
        resolver: zodResolver(programSchema),
    });

    const imageUrl = watch("image");

    // Auto-generate slug from title
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

    const addRequirement = () => {
        setRequirements([...requirements, ""]);
    };

    const removeRequirement = (index: number) => {
        setRequirements(requirements.filter((_, i) => i !== index));
    };

    const updateRequirement = (index: number, value: string) => {
        const newReqs = [...requirements];
        newReqs[index] = value;
        setRequirements(newReqs);
    };

    const onSubmit = async (data: ProgramFormData) => {
        try {
            const filteredRequirements = requirements.filter(r => r.trim() !== "");
            await createMutation.mutateAsync({
                ...data,
                requirements: filteredRequirements,
            });
            router.push("/admin/programs");
        } catch (error) {
            console.error("Failed to create program:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/admin/programs">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Create Program</h1>
                    <p className="text-muted-foreground">Add a new educational program</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Program Details</CardTitle>
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
                                placeholder="Full Stack Web Development"
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
                                placeholder="full-stack-web-development"
                            />
                            {errors.slug && (
                                <p className="text-sm text-destructive">{errors.slug.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="shortDescription">Short Description *</Label>
                            <Textarea
                                id="shortDescription"
                                {...register("shortDescription")}
                                placeholder="A brief overview of the program..."
                                rows={3}
                            />
                            {errors.shortDescription && (
                                <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullDescription">Full Description *</Label>
                            <Textarea
                                id="fullDescription"
                                {...register("fullDescription")}
                                placeholder="Detailed description of the program..."
                                rows={6}
                            />
                            {errors.fullDescription && (
                                <p className="text-sm text-destructive">{errors.fullDescription.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Program Image</Label>
                            <ImageUpload
                                value={imageUrl || ''}
                                onChange={(url) => setValue('image', url)}
                            />
                            <input type="hidden" {...register("image")} />
                            {errors.image && (
                                <p className="text-sm text-destructive">{errors.image.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Requirements</Label>
                            {requirements.map((req, index) => (
                                <div key={index} className="flex space-x-2">
                                    <Input
                                        value={req}
                                        onChange={(e) => updateRequirement(index, e.target.value)}
                                        placeholder="e.g., Basic computer skills"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => removeRequirement(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addRequirement}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Requirement
                            </Button>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Link href="/admin/programs">
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
                                    "Create Program"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
