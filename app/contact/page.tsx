import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <>
            <PageHeader
                title="Contact Us"
                description="Have questions? We're here to help. Reach out to us today."
            />

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-muted-foreground mb-8">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>
                            <ContactForm />
                        </div>

                        <div className="space-y-8 lg:pl-12">
                            <div className="bg-muted/30 p-8 rounded-2xl">
                                <h3 className="font-bold text-xl mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <MapPin className="h-6 w-6 text-primary mt-1 mr-4" />
                                        <div>
                                            <h4 className="font-semibold">Visit Us</h4>
                                            <p className="text-muted-foreground mt-1">
                                                123 Tech Street, Digital District<br />
                                                Mogadishu, Somalia
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Phone className="h-6 w-6 text-primary mt-1 mr-4" />
                                        <div>
                                            <h4 className="font-semibold">Call Us</h4>
                                            <p className="text-muted-foreground mt-1">
                                                +252 61 123 4567<br />
                                                +252 61 987 6543
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="h-6 w-6 text-primary mt-1 mr-4" />
                                        <div>
                                            <h4 className="font-semibold">Email Us</h4>
                                            <p className="text-muted-foreground mt-1">
                                                info@buruujtech.com<br />
                                                admissions@buruujtech.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Clock className="h-6 w-6 text-primary mt-1 mr-4" />
                                        <div>
                                            <h4 className="font-semibold">Working Hours</h4>
                                            <p className="text-muted-foreground mt-1">
                                                Sat - Thu: 8:00 AM - 5:00 PM<br />
                                                Friday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="h-[300px] bg-muted rounded-2xl relative overflow-hidden flex items-center justify-center">
                                <span className="text-muted-foreground font-bold">Google Map Embed</span>
                                {/* Replace with actual iframe later */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
