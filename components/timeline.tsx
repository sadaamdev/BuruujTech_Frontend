const timelineEvents = [
    { year: "2018", title: "Foundation", description: "BuruujTech established with a mission to bridge the tech skills gap." },
    { year: "2020", title: "First Campus", description: "Opened our main campus accommodating 500+ students." },
    { year: "2022", title: "Global Partnerships", description: "Partnered with leading tech companies for internship programs." },
    { year: "2024", title: "Innovation Hub", description: "Launched our dedicated R&D center for advanced technologies." },
];

export function Timeline() {
    return (
        <div className="relative border-l border-muted ml-4 md:ml-0 md:border-l-0">
            <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                    <div key={index} className="md:flex md:space-x-8 relative">
                        <div className="hidden md:block w-32 font-bold text-right text-3xl text-primary/20 pt-1">
                            {event.year}
                        </div>
                        <div className="pl-8 md:pl-0 md:border-l md:border-muted md:pb-8 md:relative">
                            {/* Mobile Year */}
                            <div className="md:hidden absolute -left-[2.3rem] top-1 bg-background border px-2 py-1 rounded-full text-sm font-bold shadow-sm">
                                {event.year}
                            </div>
                            {/* Desktop Dot */}
                            <div className="hidden md:block absolute -left-[0.4rem] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />

                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <p className="text-muted-foreground">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
