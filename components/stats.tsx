"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Students Enrolled", value: "500+" },
    { label: "Expert Instructors", value: "30+" },
    { label: "Programs Offered", value: "15+" },
    { label: "Success Rate", value: "98%" },
];

export function Stats() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">
                            {stat.value}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground md:text-base">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
