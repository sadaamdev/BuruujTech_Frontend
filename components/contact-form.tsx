"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useContactMutation } from "@/lib/api-hooks";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    subject: z.string().min(5, "Subject must be at least 5 characters."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
    const contactMutation = useContactMutation();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(data: ContactFormValues) {
        try {
            await contactMutation.mutateAsync(data);
            form.reset();
        } catch (error) {
            console.error('Contact form error:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="What is this regarding?" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type your message here..." className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {contactMutation.isSuccess && (
                    <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Message sent successfully! We&apos;ll get back to you soon.
                    </div>
                )}

                {contactMutation.isError && (
                    <div className="flex items-center text-destructive bg-destructive/10 p-3 rounded-md">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Something went wrong. Please try again later.
                    </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={contactMutation.isPending}>
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </Form>
    );
}
