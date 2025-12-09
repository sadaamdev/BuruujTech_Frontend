"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, Loader2, AlertCircle } from "lucide-react";
import { useContactMessages, ContactMessage } from "@/lib/api-hooks-admin";

export default function MessagesPage() {
    const { data: messages, isLoading, isError } = useContactMessages();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-destructive space-y-2">
                <AlertCircle className="h-8 w-8" />
                <p>Failed to load messages. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Contact Messages</h1>
                <p className="text-muted-foreground">View messages from your contact form</p>
            </div>

            <div className="grid gap-4">
                {messages?.map((message: ContactMessage) => (
                    <Card key={message.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                                        {/* Assuming 'read' logic might be added later, currently mostly unread */}
                                        {/* {!message.read && <Badge>New</Badge>} */}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Mail className="h-4 w-4" />
                                            {message.name} ({message.email})
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(message.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm border-t pt-4 mt-2">{message.message}</p>
                        </CardContent>
                    </Card>
                ))}

                {messages?.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No messages yet
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
