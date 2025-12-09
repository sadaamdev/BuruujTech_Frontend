"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLogin } from "@/lib/api-hooks";
import { auth } from "@/lib/auth";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const result = await loginMutation.mutateAsync({ email, password });

            // Store token
            auth.setToken(result.access_token);

            // Check if user is admin
            if (!auth.isAdmin()) {
                setError("Access denied. Admin privileges required.");
                auth.removeToken();
                return;
            }

            // Redirect to admin dashboard
            router.push("/admin");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="py-20 min-h-[80vh] flex items-center justify-center bg-transparent p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the admin dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@buruujtech.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loginMutation.isPending}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loginMutation.isPending}
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>


                </CardContent>
            </Card>
        </div>
    );
}
