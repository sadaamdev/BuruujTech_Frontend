"use client";

import { usePrograms } from "@/lib/api-hooks";
import { useDeleteProgram } from "@/lib/api-hooks-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface ProgramItem {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
}

export default function ProgramsListPage() {
    const { data: programs, isLoading } = usePrograms();
    const deleteMutation = useDeleteProgram();
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

    const filteredPrograms = programs?.filter((prog: ProgramItem) =>
        prog.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h1 className="text-3xl font-bold">Programs</h1>
                    <p className="text-muted-foreground">Manage your educational programs</p>
                </div>
                <Link href="/admin/programs/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Program
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search programs..."
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
                    {filteredPrograms.map((program: ProgramItem) => (
                        <Card key={program.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{program.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {program.shortDescription}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link href={`/admin/programs/${program.slug}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDeleteSlug(program.slug)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}

                    {filteredPrograms.length === 0 && (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground">
                                No programs found
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            <AlertDialog open={!!deleteSlug} onOpenChange={() => setDeleteSlug(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Program</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this program? This action cannot be undone.
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
