"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUploadImage } from "@/lib/api-hooks-admin";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [isHovered, setIsHovered] = useState(false);
    const uploadMutation = useUploadImage();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append("file", file);

                const result = await uploadMutation.mutateAsync(formData);
                onChange(result.url);
            } catch (error) {
                console.error("Upload failed", error);
            }
        },
        [uploadMutation, onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
        },
        maxFiles: 1,
        multiple: false,
        disabled: disabled || uploadMutation.isPending,
    });

    if (value) {
        return (
            <div
                className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border bg-muted"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image
                    src={value}
                    alt="Upload"
                    fill
                    className="object-cover"
                />
                {isHovered && !disabled && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => onChange("")}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Remove
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors max-w-sm",
                isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary",
                (disabled || uploadMutation.isPending) && "opacity-50 cursor-not-allowed"
            )}
        >
            <input {...getInputProps()} />
            {uploadMutation.isPending ? (
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Uploading...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="p-4 bg-muted rounded-full">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Click or drag image to upload</p>
                        <p className="text-xs text-muted-foreground">
                            SVG, PNG, JPG or WEBP (max 5MB)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
