"use client";


import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.jpg"
                    alt="BuruujTech Campus"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        <span className="text-primary">Innovating</span> Education for a <br className="hidden sm:inline" />
                        Brighter <span className="text-primary">Future</span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
                        BuruujTech is dedicated to providing top-tier technology education and vocational training. Join us to build the skills of tomorrow.
                    </p>
                    <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6" asChild>
                            <Link href="/programs">
                                Explore Programs
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white/10 hover:text-white" asChild>
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
