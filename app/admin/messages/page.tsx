"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar } from "lucide-react";

// This is a placeholder - you would fetch messages from an API
const messages = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        subject: "Inquiry about programs",
        message: "I'm interested in learning more about your web development program...",
        createdAt: new Date().toISOString(),
        read: false,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Partnership opportunity",
        message: "We would like to discuss a potential partnership...",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        read: true,
    },
];

export default function MessagesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Contact Messages</h1>
                <p className="text-muted-foreground">View messages from your contact form</p>
            </div>

            <div className="grid gap-4">
                {messages.map((message) => (
                    <Card key={message.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CardTitle className="text-lg">{message.subject}</CardTitle>
                                        {!message.read && <Badge>New</Badge>}
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
                            <p className="text-sm">{message.message}</p>
                        </CardContent>
                    </Card>
                ))}

                {messages.length === 0 && (
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
