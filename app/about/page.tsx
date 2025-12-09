import { PageHeader } from "@/components/page-header";
import { Timeline } from "@/components/timeline";
import { TeamCard } from "@/components/team-card";
import NextImage from "next/image";

const teamMembers = [
    { name: "Ahmed Ali", role: "CEO & Founder", bio: "Tech visionary with 15+ years of experience." },
    { name: "Sarah Johnson", role: "Head of Education", bio: "Passionate educator dedicated to student success." },
    { name: "Michael Chen", role: "Lead Instructor", bio: "Expert full-stack developer and mentor." },
    { name: "Fatima Hassan", role: "Operations Manager", bio: "Ensuring smooth campus operations effectively." },
];

export default function AboutPage() {
    return (
        <>
            <PageHeader
                title="About BuruujTech"
                description="We are pioneering the future of technology education in the region."
            />

            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                To bridge the digital skills gap by providing world-class, practical technology education that empowers individuals to innovate and succeed in the global economy.
                            </p>
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-lg text-muted-foreground">
                                To be the leading center of excellence for technology education and innovation, fostering a generation of creators and problem-solvers.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <NextImage
                                src="/hero.png"
                                alt="About BuruujTech"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="mb-24">
                        <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
                        <div className="max-w-3xl mx-auto">
                            <Timeline />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member) => (
                                <TeamCard key={member.name} {...member} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
