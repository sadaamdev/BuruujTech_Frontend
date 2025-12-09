"use client";

import { usePartners } from "@/lib/api-hooks";
import { useCreatePartner, useDeletePartner } from "@/lib/api-hooks-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
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
} from "@/components/ui/alert-dialog";

export default function PartnersPage() {
    const { data: partners, isLoading } = usePartners();
    const createMutation = useCreatePartner();
    const deleteMutation = useDeletePartner();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        logoUrl: "",
        website: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMutation.mutateAsync(formData);
            setFormData({ name: "", logoUrl: "", website: "" });
            setShowForm(false);
            setEditingItem(null);
        } catch (error) {
            console.error("Failed to create partner:", error);
        }
    };

    const handleEdit = (partner: any) => {
        setEditingItem(partner);
        setFormData({
            name: partner.name,
            logoUrl: partner.logoUrl,
            website: partner.website || "",
        });
        setShowForm(true);
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteMutation.mutateAsync(deleteId);
            setDeleteId(null);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", logoUrl: "", website: "" });
        setShowForm(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Partners</h1>
                    <p className="text-muted-foreground">Manage your partner organizations</p>
                </div>
                <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Partner
                </Button>
            </div>

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingItem ? "Edit Partner" : "Add New Partner"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Partner Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo">Logo</Label>
                                <ImageUpload
                                    value={formData.logoUrl}
                                    onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                                    disabled={createMutation.isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website (optional)</Label>
                                <Input
                                    id="website"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    placeholder="https://partner.com"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={createMutation.isPending}>
                                    {createMutation.isPending ? "Saving..." : editingItem ? "Update Partner" : "Add Partner"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {partners?.map((partner: any) => (
                        <Card key={partner.id}>
                            <CardContent className="p-4">
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="relative h-20 w-full">
                                        {partner.logoUrl ? (
                                            <Image
                                                src={partner.logoUrl}
                                                alt={partner.name}
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground">
                                                <span className="text-xs">No Logo</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-center">{partner.name}</h3>
                                    <div className="flex space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(partner)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDeleteId(partner.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Partner</AlertDialogTitle>
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
    );
}
