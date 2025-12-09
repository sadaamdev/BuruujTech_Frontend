"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProgram } from "@/lib/api-hooks";
import { useUpdateProgram, useDeleteProgram } from "@/lib/api-hooks-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Loader2, Plus, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";
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

const programSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    shortDescription: z.string().min(10),
    fullDescription: z.string().min(20),
    image: z.string().optional().or(z.literal("")),
});

type ProgramFormData = z.infer<typeof programSchema>;

export default function EditProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = useState<string>("");
    const router = useRouter();
    const [requirements, setRequirements] = useState<string[]>([""]);

    useEffect(() => {
        params.then(p => setSlug(p.slug));
    }, [params]);

    const { data: program, isLoading } = useProgram(slug);
    const updateMutation = useUpdateProgram(slug);
    const deleteMutation = useDeleteProgram();

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ProgramFormData>({
        resolver: zodResolver(programSchema),
    });

    useEffect(() => {
        if (program) {
            reset({
                title: program.title,
                slug: program.slug,
                shortDescription: program.shortDescription,
                fullDescription: program.fullDescription,
                image: program.image || "",
            });
            setRequirements(program.requirements || [""]);
        }
    }, [program, reset]);

    const addRequirement = () => setRequirements([...requirements, ""]);
    const removeRequirement = (index: number) => setRequirements(requirements.filter((_, i) => i !== index));
    const updateRequirement = (index: number, value: string) => {
        const newReqs = [...requirements];
        newReqs[index] = value;
        setRequirements(newReqs);
    };

    const onSubmit = async (data: ProgramFormData) => {
        try {
            const filteredRequirements = requirements.filter(r => r.trim() !== "");
            await updateMutation.mutateAsync({
                ...data,
                requirements: filteredRequirements,
            });
            router.push("/admin/programs");
        } catch (error) {
            console.error("Failed to update program:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(slug);
            router.push("/admin/programs");
        } catch (error) {
            console.error("Failed to delete program:", error);
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

    if (!program) {
        return <div>Program not found</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/programs">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Edit Program</h1>
                        <p className="text-muted-foreground">{program.title}</p>
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
                            <AlertDialogTitle>Delete Program</AlertDialogTitle>
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
                        <CardTitle>Program Details</CardTitle>
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
                            <Label htmlFor="shortDescription">Short Description *</Label>
                            <Textarea id="shortDescription" {...register("shortDescription")} rows={3} />
                            {errors.shortDescription && <p className="text-sm text-destructive">{errors.shortDescription.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullDescription">Full Description *</Label>
                            <Textarea id="fullDescription" {...register("fullDescription")} rows={6} />
                            {errors.fullDescription && <p className="text-sm text-destructive">{errors.fullDescription.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Program Image</Label>
                            <ImageUpload
                                value={watch('image') || ''}
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
                                    />
                                    <Button type="button" variant="outline" size="icon" onClick={() => removeRequirement(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Requirement
                            </Button>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Link href="/admin/programs">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Program"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
