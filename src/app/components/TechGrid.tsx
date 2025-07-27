"use client";

export default function TechGrid({
    frameworks,
    languages,
}: {
    frameworks: { name: string }[];
    languages: { name: string }[];
}) {
    const tech = [...frameworks, ...languages];
    return (
        <section className="py-16 bg-gray-800 text-center">
            <h2 className="text-3xl font-semibold text-accent font-poppins mb-6">
                Tech Stack
            </h2>

            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {tech.map((item) => (
                    <div
                        key={item.name}
                        className="relative group inline-flex items-center justify-center rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-600 transition"
                    >

                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 z-0 transition" />


                        <span className="relative z-10 text-white text-sm font-medium">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
